import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { toEditorState } from './utils';
import { useStoryPath } from './useStoryPath';
import * as chapters from './chapters';

const chaptersMap: Record<string, object[]> = {
  '0': chapters.Beginning,
  '1': chapters.Departure,
  '2': chapters.Stay,
  '3': chapters.YoloSolo,
  '4': chapters.GetSomeHelp,
  '5': chapters.GotLost,
  '6': chapters.Ending,
};

export function useChapterUpdate() {
  const { path } = useStoryPath();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const chapters = path.reduce<object[]>((acc, chapter) => {
      const chapterContent = chaptersMap.hasOwnProperty(chapter)
        ? chaptersMap[`${chapter}`]
        : null;
      if (chapterContent) {
        return acc.concat(...chapterContent);
      }
      return acc;
    }, []);

    editor.setEditorState(editor.parseEditorState(toEditorState(chapters)));
  }, [path]);
}
