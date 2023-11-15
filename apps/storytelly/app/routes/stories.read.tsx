import { LinksFunction } from '@remix-run/node';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { editorState } from '@storytelly/components/editor/chapters';
import ExampleTheme from '@storytelly/components/editor/theme';
import editorStyles from '../components/editor/editor.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: editorStyles },
];

const editorConfig = {
  editorState,
  editable: false,
  namespace: 'reader',
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [HeadingNode, QuoteNode],
};

function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        placeholder={<></>}
        contentEditable={<ContentEditable className="editor-input" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
}

export default function Component() {
  return (
    <div className="flex justify-center ">
      <div className="h-full w-full">
        <Editor />
      </div>
    </div>
  );
}
