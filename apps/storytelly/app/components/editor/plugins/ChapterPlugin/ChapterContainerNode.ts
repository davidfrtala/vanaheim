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

type SerializedChapterContainerNode = SerializedElementNode;

export function convertDetailsElement(
  domNode: HTMLDetailsElement
): DOMConversionOutput | null {
  const node = $createChapterContainerNode();
  return {
    node,
  };
}

export class ChapterContainerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return 'chapter-container';
  }

  static clone(node: ChapterContainerNode): ChapterContainerNode {
    return new ChapterContainerNode(node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const dom = document.createElement('section');
    dom.classList.add('Chapter__container');
    return dom;
  }

  updateDOM(prevNode: ChapterContainerNode, dom: HTMLDetailsElement): boolean {
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
    serializedNode: SerializedChapterContainerNode
  ): ChapterContainerNode {
    return $createChapterContainerNode();
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('section');
    return { element };
  }

  exportJSON(): SerializedChapterContainerNode {
    return {
      ...super.exportJSON(),
      type: 'chapter-container',
      version: 1,
    };
  }
}

export function $createChapterContainerNode(): ChapterContainerNode {
  return new ChapterContainerNode();
}

export function $isChapterContainerNode(
  node: LexicalNode | null | undefined
): node is ChapterContainerNode {
  return node instanceof ChapterContainerNode;
}
