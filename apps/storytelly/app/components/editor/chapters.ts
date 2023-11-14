const Beginning = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '0) Beginning',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'heading',
    version: 1,
    tag: 'h1',
  },
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: 'kde bolo tam bolo',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'paragraph',
    version: 1,
  },
];

const Stay = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '1) Stay at home',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'heading',
    version: 1,
    tag: 'h1',
  },
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: 'zostan doma',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'paragraph',
    version: 1,
  },
];

const Departure = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '1) Depaarture',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'heading',
    version: 1,
    tag: 'h1',
  },
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: 'Im going on an adventure',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'paragraph',
    version: 1,
  },
];

export const editorState = JSON.stringify({
  root: {
    children: [...Beginning, ...Stay, ...Departure],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
});
