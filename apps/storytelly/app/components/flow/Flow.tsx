import Dagre from '@dagrejs/dagre';
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  Controls,
  Position,
  Connection,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  addEdge,
  Node,
  Edge,
} from 'reactflow';

import { Button } from '../ui';

import { initialNodes, initialEdges } from './nodes-edges';

enum Orientation {
  horizontal = 'LR',
  vertical = 'TB',
}

const dagreGraph = new Dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

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

getLayoutedElements(initialNodes, initialEdges);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction: Orientation) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      // remove this after we subscribe to React Flow, once we start making shit tons of money :o)))
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{
        type: 'smoothstep',
      }}
      fitView
      snapToGrid
    >
      <Panel position="top-right">
        <Button
          variant="outline"
          onClick={() => onLayout(Orientation.vertical)}
        >
          vertical layout
        </Button>
        <Button
          variant="outline"
          onClick={() => onLayout(Orientation.horizontal)}
        >
          horizontal layout
        </Button>
      </Panel>

      <Background color="hsl(var(--foreground))" gap={30} />
      <Controls position="top-left" />
    </ReactFlow>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
