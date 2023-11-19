import type { Node, Edge } from 'reactflow';
import * as chapters from './chapters';

const position = { x: 0, y: 0 };

export const initialNodes: Node[] = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Beginning', chapter: chapters.Beginning },
  },
  {
    id: '1',
    data: { label: 'Departure', chapter: chapters.Departure },
  },
  {
    id: '2',
    data: { label: 'Stay at home', chapter: chapters.Stay },
  },
  {
    id: '3',
    data: { label: 'Got lost', chapter: chapters.GotLost },
  },
  {
    id: '4',
    data: { label: 'Get some help', chapter: chapters.GetSomeHelp },
  },
  {
    id: '5',
    data: { label: 'Yolo Solo', chapter: chapters.YoloSolo },
  },
  {
    id: '6',
    data: { label: 'Bittersweet ending', chapter: chapters.Ending },
  },
].map((node) => ({
  ...node,
  position,
}));

export const initialEdges: Edge[] = [
  { id: 'a', source: '0', target: '1' },
  { id: 'b', source: '0', target: '2' },
  { id: 'c', source: '1', target: '3' },
  { id: 'd', source: '1', target: '4' },
  { id: 'e', source: '1', target: '5' },
  { id: 'f', source: '4', target: '6' },
  { id: 'g', source: '5', target: '4' },
  { id: 'h', source: '5', target: '6' },
  { id: 'i', source: '4', target: '3' },
];
