import { type Node, type Edge } from 'reactflow';

const selectedEdge: Partial<Edge> = {
  animated: true,

  style: {
    color: 'hsl(var(--primary))',
    backgroundColor: 'hsl(var(--accent))',
    borderColor: 'hsl(var(--primary))',
  },
};

const selectedNode: Partial<Node> = {
  style: {
    backgroundColor: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
    borderColor: 'hsl(var(--primary))',
  },
};

const position = { x: 0, y: 0 };

const style = {
  backgroundColor: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--card-foreground))',
};
const edgeType = 'smoothstep';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Beginning' },
    position,
    style: selectedNode.style,
  },
  {
    id: '2',
    data: { label: 'Departure' },
    position,
    style: selectedNode.style,
  },
  {
    id: '2a',
    data: { label: 'Got lost' },
    position,
    style,
  },
  {
    id: '2b',
    data: { label: 'Get some help' },
    position,
    style,
  },
  {
    id: '2c',
    data: { label: 'Yolo Solo' },
    position,
    style: selectedNode.style,
  },
  {
    id: '2d',
    data: { label: 'Bittersweet ending' },
    position,
    style: selectedNode.style,
  },
  {
    id: '3',
    data: { label: 'Stay at home' },
    position,
    style,
  },
];

export const initialEdges: Edge[] = [
  { id: 'e12', source: '1', target: '2', ...selectedEdge },
  { id: 'e13', source: '1', target: '3' },
  { id: 'e22a', source: '2', target: '2a' },
  { id: 'e22b', source: '2', target: '2b' },
  { id: 'e22c', source: '2', target: '2c', ...selectedEdge },
  { id: 'e22d', source: '2b', target: '2d' },
  { id: 'e2c2d', source: '2c', target: '2d', ...selectedEdge },
];
