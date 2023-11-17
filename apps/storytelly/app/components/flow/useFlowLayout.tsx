import Dagre from '@dagrejs/dagre';
import { useCallback, useEffect } from 'react';
import {
  Position,
  Connection,
  ConnectionLineType,
  addEdge,
  Node,
  Edge,
  useReactFlow,
} from 'reactflow';

import { useStoryPath } from '../narative/useStoryPath';

enum Orientation {
  horizontal = 'LR',
  vertical = 'TB',
}

const dagreGraph = new Dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const edgesType: ConnectionLineType = ConnectionLineType.SimpleBezier;
const getLayoutedElements = (
  nodes: Node<any>[],
  edges: Edge<any>[],
  direction = Orientation.vertical
) => {
  const isHorizontal = direction === Orientation.horizontal;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export function useFlowLayout() {
  const {
    nodesState: { nodes, setNodes },
    edgesState: { edges, setEdges },
  } = useStoryPath();

  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: edgesType, animated: true }, eds)
      ),
    []
  );

  const onLayout = useCallback(
    (direction: Orientation) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  useEffect(() => {
    if (nodes.length > 0) {
      onLayout(Orientation.vertical);
    }
  }, [nodes.length, edges.length]);

  return {
    onConnect,
    onLayout,
  };
}
