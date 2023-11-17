import { toEditorState } from './utils';
export const Beginning = [
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
        text: 'Once upon a time',
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

export const Departure = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '1) Departure',
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

export const Stay = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '2) Stay at home',
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
        text: 'Nah... not intersted. Gonna smoke some weed instead',
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

export const YoloSolo = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '5) Yolo Solo',
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
        text: 'Come get some!',
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

export const GetSomeHelp = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '4) Get some help',
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
        text: 'Gandalf! Get over here!',
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

export const GotLost = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '3) Got lost',
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
        text: 'This place I dont recognize',
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

export const Ending = [
  {
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: '6) Bittersweet ending',
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
        text: `I'm back, but I'm not the same person I was before`,
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

export const editorState = toEditorState([
  ...Beginning,
  ...Departure,
  ...Stay,
  ...YoloSolo,
  ...GetSomeHelp,
  ...GotLost,
  ...Ending,
]);
