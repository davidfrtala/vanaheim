import type { Node, Edge } from 'reactflow';

const position = { x: 0, y: 0 };

const style = {
  backgroundColor: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--card-foreground))',
};

export const initialNodes: Node[] = [
  {
    id: '0',
    type: 'input',
    data: { label: '0) Beginning' },
    position,
    style,
  },
  {
    id: '1',
    data: { label: '1) Departure' },
    position,
    style,
  },
  {
    id: '2',
    data: { label: '2) Stay at home' },
    position,
    style,
  },
  {
    id: '3',
    data: { label: '3) Got lost' },
    position,
    style,
  },
  {
    id: '4',
    data: { label: '4) Get some help' },
    position,
    style,
  },
  {
    id: '5',
    data: { label: '5) Yolo Solo' },
    position,
    style,
  },
  {
    id: '6',
    data: { label: '6) Bittersweet ending' },
    position,
    style,
  },
];

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

export const selectedEdge: Partial<Edge> = {
  animated: true,

  style: {
    color: 'hsl(var(--primary))',
    backgroundColor: 'hsl(var(--accent))',
    borderColor: 'hsl(var(--primary))',
  },
};

export const selectedNode: Partial<Node> = {
  style: {
    backgroundColor: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
    borderColor: 'hsl(var(--primary))',
  },
};
