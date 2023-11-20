/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $findMatchingParent,
  $insertNodeToNearestRoot,
  mergeRegister,
} from '@lexical/utils';
import {
  $createParagraphNode,
  $getPreviousSelection,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $setSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DELETE_CHARACTER_COMMAND,
  ElementNode,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  LexicalNode,
} from 'lexical';

import {
  $createChapterContainerNode,
  $isChapterContainerNode,
  ChapterContainerNode,
} from './ChapterContainerNode';
import {
  $createChapterContentNode,
  $isChapterContentNode,
  ChapterContentNode,
} from './ChapterContentNode';
import {
  $createChapterTitleNode,
  $isChapterTitleNode,
  ChapterTitleNode,
} from './ChapterTitleNode';

import './Chapter.css';

export const INSERT_CHAPTER_COMMAND = createCommand<void>();

export default function ChapterPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (
      !editor.hasNodes([
        ChapterContainerNode,
        ChapterTitleNode,
        ChapterContentNode,
      ])
    ) {
      throw new Error(
        'ChapterPlugin: ChapterContainerNode, ChapterTitleNode, or ChapterContentNode not registered on editor'
      );
    }

    const onEscapeUp = () => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) &&
        selection.isCollapsed() &&
        selection.anchor.offset === 0
      ) {
        const container = $findMatchingParent(
          selection.anchor.getNode(),
          $isChapterContainerNode
        );

        if ($isChapterContainerNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getFirstChild<LexicalNode>() === container &&
            selection.anchor.key ===
              container.getFirstDescendant<LexicalNode>()?.getKey()
          ) {
            container.insertBefore($createParagraphNode());
          }
        }
      }

      return false;
    };

    const onEscapeDown = () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.isCollapsed()) {
        const container = $findMatchingParent(
          selection.anchor.getNode(),
          $isChapterContainerNode
        );

        if ($isChapterContainerNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getLastChild<LexicalNode>() === container
          ) {
            const lastDescendant = container.getLastDescendant<LexicalNode>();
            if (
              lastDescendant !== null &&
              selection.anchor.key === lastDescendant.getKey() &&
              selection.anchor.offset === lastDescendant.getTextContentSize()
            ) {
              container.insertAfter($createParagraphNode());
            }
          }
        }
      }

      return false;
    };

    return mergeRegister(
      // Structure enforcing transformers for each node type. In case nesting structure is not
      // "Container > Title + Content" it'll unwrap nodes and convert it back
      // to regular content.
      editor.registerNodeTransform(ChapterContentNode, (node) => {
        const parent = node.getParent<ElementNode>();
        if (!$isChapterContainerNode(parent)) {
          const children = node.getChildren<LexicalNode>();
          for (const child of children) {
            node.insertBefore(child);
          }
          node.remove();
        }
      }),

      editor.registerNodeTransform(ChapterTitleNode, (node) => {
        const parent = node.getParent<ElementNode>();
        if (!$isChapterContainerNode(parent)) {
          node.replace(
            $createParagraphNode().append(...node.getChildren<LexicalNode>())
          );
          return;
        }
      }),

      editor.registerNodeTransform(ChapterContainerNode, (node) => {
        const children = node.getChildren<LexicalNode>();
        if (
          children.length !== 2 ||
          !$isChapterTitleNode(children[0]) ||
          !$isChapterContentNode(children[1])
        ) {
          for (const child of children) {
            node.insertBefore(child);
          }
          node.remove();
        }
      }),

      // This handles the case when container is collapsed and we delete its previous sibling
      // into it, it would cause collapsed content deleted (since it's display: none, and selection
      // swallows it when deletes single char). Instead we expand container, which is although
      // not perfect, but avoids bigger problem
      editor.registerCommand(
        DELETE_CHARACTER_COMMAND,
        () => {
          const selection = $getSelection();
          if (
            !$isRangeSelection(selection) ||
            !selection.isCollapsed() ||
            selection.anchor.offset !== 0
          ) {
            return false;
          }

          const anchorNode = selection.anchor.getNode();
          const topLevelElement = anchorNode.getTopLevelElement();
          if (topLevelElement === null) {
            return false;
          }

          const container = topLevelElement.getPreviousSibling<LexicalNode>();
          if (!$isChapterContainerNode(container)) {
            return false;
          }

          return true;
        },
        COMMAND_PRIORITY_LOW
      ),

      // When collapsible is the last child pressing down/right arrow will insert paragraph
      // below it to allow adding more content. It's similar what $insertBlockNode
      // (mainly for decorators), except it'll always be possible to continue adding
      // new content even if trailing paragraph is accidentally deleted
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        onEscapeDown,
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(
        KEY_ARROW_RIGHT_COMMAND,
        onEscapeDown,
        COMMAND_PRIORITY_LOW
      ),

      // When collapsible is the first child pressing up/left arrow will insert paragraph
      // above it to allow adding more content. It's similar what $insertBlockNode
      // (mainly for decorators), except it'll always be possible to continue adding
      // new content even if leading paragraph is accidentally deleted
      editor.registerCommand(
        KEY_ARROW_UP_COMMAND,
        onEscapeUp,
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(
        KEY_ARROW_LEFT_COMMAND,
        onEscapeUp,
        COMMAND_PRIORITY_LOW
      ),

      // Handling CMD+Enter to toggle collapsible element collapsed state
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          // @ts-ignore
          const windowEvent: KeyboardEvent | undefined = editor._window?.event;

          if (
            windowEvent &&
            (windowEvent.ctrlKey || windowEvent.metaKey) &&
            windowEvent.key === 'Enter'
          ) {
            const selection = $getPreviousSelection();
            if ($isRangeSelection(selection) && selection.isCollapsed()) {
              const parent = $findMatchingParent(
                selection.anchor.getNode(),
                (node) => $isElementNode(node) && !node.isInline()
              );

              if ($isChapterTitleNode(parent)) {
                const container = parent.getParent<ElementNode>();
                if ($isChapterContainerNode(container)) {
                  $setSelection(selection.clone());
                  return true;
                }
              }
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        INSERT_CHAPTER_COMMAND,
        () => {
          editor.update(() => {
            const title = $createChapterTitleNode();
            $insertNodeToNearestRoot(
              $createChapterContainerNode().append(
                title,
                $createChapterContentNode().append($createParagraphNode())
              )
            );
            title.select();
          });
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
