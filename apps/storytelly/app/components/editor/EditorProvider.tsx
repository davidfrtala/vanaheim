import { FC } from 'react';
import {
  LexicalComposer,
  InitialConfigType,
} from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import ExampleTheme from './theme';

import { ChapterContainerNode } from './plugins/ChapterPlugin/ChapterContainerNode';
import { ChapterContentNode } from './plugins/ChapterPlugin/ChapterContentNode';
import { ChapterTitleNode } from './plugins/ChapterPlugin/ChapterTitleNode';

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    QuoteNode,
    ChapterContainerNode,
    ChapterContentNode,
    ChapterTitleNode,
  ],
};

export const EditorProvider: FC<{
  config: Pick<InitialConfigType, 'editable' | 'editorState' | 'namespace'>;
  children: JSX.Element | JSX.Element[];
}> = ({ config, children }) => {
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, ...config }}>
      {children}
    </LexicalComposer>
  );
};
