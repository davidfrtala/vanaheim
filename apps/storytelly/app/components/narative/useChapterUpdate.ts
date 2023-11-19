import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { toEditorState } from './utils';
import { useStoryPath } from './useStoryPath';
import { initialNodes as nodes } from './nodes-edges';

export function useChapterUpdate() {
  const { path } = useStoryPath();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const chapters = path.reduce<object[]>((acc, chapter) => {
      const chapterContent = nodes.find((node) => node.id === chapter)?.data
        .chapter;

      if (chapterContent) {
        return acc.concat(chapterContent);
      }
      return acc;
    }, []);

    editor.setEditorState(editor.parseEditorState(toEditorState(chapters)));
  }, [path]);
}
