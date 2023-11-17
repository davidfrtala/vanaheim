import type { Node, Edge } from 'reactflow';

export const nodeStyle: Partial<Node['style']> = {
  backgroundColor: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--card-foreground))',
};

export const nodeStyleSelected: Partial<Node['style']> = {
  backgroundColor: 'hsl(var(--accent))',
  color: 'hsl(var(--accent-foreground))',
  borderColor: 'hsl(var(--primary))',
};
