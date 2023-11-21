import { $getRoot, $getSelection, type EditorState } from 'lexical';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import ChapterPlugin from './plugins/ChapterPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

function Placeholder() {
  return (
    <div className="editor-placeholder">
      <p>Start writing your story</p>
      <p className="text-xs">or type "/" to bring the action menu</p>
    </div>
  );
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    // console.log(root, selection);
  });
}

export default function Editor() {
  return (
    <div className="relative">
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <ChapterPlugin />
      <ComponentPickerPlugin />
      <FloatingTextFormatToolbarPlugin />

      <OnChangePlugin onChange={onChange} />
      {/* <TreeViewPlugin /> */}
    </div>
  );
}
