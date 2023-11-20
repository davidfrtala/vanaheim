import {
  $createParagraphNode,
  $isElementNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  SerializedElementNode,
} from 'lexical';

import { $isChapterContainerNode } from './ChapterContainerNode';
import { $isChapterContentNode } from './ChapterContentNode';

type SerializedChapterTitleNode = SerializedElementNode;

export function convertSummaryElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const node = $createChapterTitleNode();
  return {
    node,
  };
}

export class ChapterTitleNode extends ElementNode {
  static getType(): string {
    return 'chapter-title';
  }

  static clone(node: ChapterTitleNode): ChapterTitleNode {
    return new ChapterTitleNode(node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const dom = document.createElement('summary');
    dom.classList.add('Chapter__title');
    return dom;
  }

  updateDOM(prevNode: ChapterTitleNode, dom: HTMLElement): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      summary: (domNode: HTMLElement) => {
        return {
          conversion: convertSummaryElement,
          priority: 1,
        };
      },
    };
  }

  static importJSON(
    serializedNode: SerializedChapterTitleNode
  ): ChapterTitleNode {
    return $createChapterTitleNode();
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('summary');
    return { element };
  }

  exportJSON(): SerializedChapterTitleNode {
    return {
      ...super.exportJSON(),
      type: 'chapter-title',
      version: 1,
    };
  }

  collapseAtStart(_selection: RangeSelection): boolean {
    this.getParentOrThrow().insertBefore(this);
    return true;
  }

  insertNewAfter(_: RangeSelection, restoreSelection = true): ElementNode {
    const containerNode = this.getParentOrThrow();

    if (!$isChapterContainerNode(containerNode)) {
      throw new Error(
        'ChapterTitleNode expects to be child of ChapterContainerNode'
      );
    }

    const contentNode = this.getNextSibling();
    if (!$isChapterContentNode(contentNode)) {
      throw new Error(
        'ChapterTitleNode expects to have ChapterContentNode sibling'
      );
    }

    const firstChild = contentNode.getFirstChild();
    if ($isElementNode(firstChild)) {
      return firstChild;
    } else {
      const paragraph = $createParagraphNode();
      contentNode.append(paragraph);
      return paragraph;
    }
  }
}

export function $createChapterTitleNode(): ChapterTitleNode {
  return new ChapterTitleNode();
}

export function $isChapterTitleNode(
  node: LexicalNode | null | undefined
): node is ChapterTitleNode {
  return node instanceof ChapterTitleNode;
}
