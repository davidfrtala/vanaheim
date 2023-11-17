export const toEditorState = (chapters: Array<object>) =>
  JSON.stringify({
    root: {
      children: chapters,
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  });
