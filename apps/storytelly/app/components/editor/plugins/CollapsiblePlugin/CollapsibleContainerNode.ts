/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
} from 'lexical';

type SerializedCollapsibleContainerNode = SerializedElementNode;

export function convertDetailsElement(
  domNode: HTMLDetailsElement
): DOMConversionOutput | null {
  const node = $createCollapsibleContainerNode();
  return {
    node,
  };
}

export class CollapsibleContainerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return 'collapsible-container';
  }

  static clone(node: CollapsibleContainerNode): CollapsibleContainerNode {
    return new CollapsibleContainerNode(node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const dom = document.createElement('section');
    dom.classList.add('Collapsible__container');
    return dom;
  }

  updateDOM(
    prevNode: CollapsibleContainerNode,
    dom: HTMLDetailsElement
  ): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap<HTMLDetailsElement> | null {
    return {
      section: (domNode: HTMLDetailsElement) => {
        return {
          conversion: convertDetailsElement,
          priority: 1,
        };
      },
    };
  }

  static importJSON(
    serializedNode: SerializedCollapsibleContainerNode
  ): CollapsibleContainerNode {
    return $createCollapsibleContainerNode();
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('section');
    return { element };
  }

  exportJSON(): SerializedCollapsibleContainerNode {
    return {
      ...super.exportJSON(),
      type: 'collapsible-container',
      version: 1,
    };
  }
}

export function $createCollapsibleContainerNode(): CollapsibleContainerNode {
  return new CollapsibleContainerNode();
}

export function $isCollapsibleContainerNode(
  node: LexicalNode | null | undefined
): node is CollapsibleContainerNode {
  return node instanceof CollapsibleContainerNode;
}
