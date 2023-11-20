import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  LexicalNode,
  SerializedElementNode,
} from 'lexical';

type SerializedChapterContentNode = SerializedElementNode;

export function convertChapterContentElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const node = $createChapterContentNode();
  return {
    node,
  };
}

export class ChapterContentNode extends ElementNode {
  static getType(): string {
    return 'chapter-content';
  }

  static clone(node: ChapterContentNode): ChapterContentNode {
    return new ChapterContentNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('div');
    dom.classList.add('Chapter__content');
    return dom;
  }

  updateDOM(prevNode: ChapterContentNode, dom: HTMLElement): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-chapter-content')) {
          return null;
        }
        return {
          conversion: convertChapterContentElement,
          priority: 2,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.setAttribute('data-lexical-chapter-content', 'true');
    return { element };
  }

  static importJSON(
    serializedNode: SerializedChapterContentNode
  ): ChapterContentNode {
    return $createChapterContentNode();
  }

  isShadowRoot(): boolean {
    return true;
  }

  exportJSON(): SerializedChapterContentNode {
    return {
      ...super.exportJSON(),
      type: 'chapter-content',
      version: 1,
    };
  }
}

export function $createChapterContentNode(): ChapterContentNode {
  return new ChapterContentNode();
}

export function $isChapterContentNode(
  node: LexicalNode | null | undefined
): node is ChapterContentNode {
  return node instanceof ChapterContentNode;
}
