import { useCallback, useMemo } from 'react';
import { Node, Edge, NodeMouseHandler } from 'reactflow';

import { useStoryPath } from '../narative/useStoryPath';
import { useFlowLayout } from './useFlowLayout';
import { Flow } from './FlowComponent';
import { nodeStyle, nodeStyleSelected } from './selectedStyle';

enum Orientation {
  horizontal = 'LR',
  vertical = 'TB',
}

const findEdgesInPath = (path: string[], edges: Edge[]): Edge[] => {
  const edgeMap = new Map(
    edges.map((edge) => [`${edge.source}-${edge.target}`, edge])
  );

  const edgesInPath: Edge[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const edge =
      edgeMap.get(`${path[i]}-${path[i + 1]}`) ||
      edgeMap.get(`${path[i + 1]}-${path[i]}`);

    if (edge) {
      edgesInPath.push(edge);
    }
  }

  return edgesInPath;
};

export default function () {
  const { addPath, path, pathSet, nodesState, edgesState } = useStoryPath();
  const { onConnect, onLayout } = useFlowLayout();
  const { nodes, onNodesChange } = nodesState;
  const { edges, onEdgesChange } = edgesState;

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node: Node) => {
      addPath(node);
    },
    [addPath]
  );

  const updatedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        style: pathSet.has(node.id) ? nodeStyleSelected : nodeStyle,
      })),
    [nodes, pathSet]
  );

  const edgesInPath = findEdgesInPath(path, edges);
  const edgesInPathSet = useMemo(
    () => new Set(edgesInPath.map((edge) => edge.id)),
    [edgesInPath]
  );

  const updatedEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        animated: edgesInPathSet.has(edge.id),
      })),
    [edges, edgesInPathSet]
  );

  return (
    <Flow
      nodes={updatedNodes}
      edges={updatedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onVerticalClick={() => onLayout(Orientation.vertical)}
      onHorizontalClick={() => onLayout(Orientation.horizontal)}
    />
  );
}
