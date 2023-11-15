import { FC } from 'react';
import {
  LexicalComposer,
  InitialConfigType,
} from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import ExampleTheme from './theme';

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [HeadingNode, QuoteNode],
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
