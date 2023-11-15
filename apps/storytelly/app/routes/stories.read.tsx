import { LinksFunction } from '@remix-run/node';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { editorState } from '@storytelly/components/editor/chapters';
import { EditorProvider } from '@storytelly/components/editor/EditorProvider';
import editorStyles from '../components/editor/editor.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: editorStyles },
];

const editorConfig = {
  editorState,
  editable: false,
  namespace: 'reader',
};

export default function Component() {
  return (
    <div className="flex justify-center ">
      <div className="h-full w-full">
        <EditorProvider config={editorConfig}>
          <RichTextPlugin
            placeholder={<></>}
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </EditorProvider>
      </div>
    </div>
  );
}
