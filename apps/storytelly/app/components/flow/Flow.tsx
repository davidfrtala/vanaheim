import Dagre from '@dagrejs/dagre';
import { useCallback, useMemo, useState } from 'react';
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
  NodeMouseHandler,
} from 'reactflow';

import { Button } from '../ui';

import {
  initialNodes,
  selectedNode,
  initialEdges,
  selectedEdge,
} from './nodes-edges';

enum Orientation {
  horizontal = 'LR',
  vertical = 'TB',
}

const dagreGraph = new Dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const edgesType: ConnectionLineType = ConnectionLineType.Bezier;
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

  // Find the root node
  const rootNode = nodes.find(
    (node) => !edges.some((edge) => edge.target === node.id)
  );

  // Initialize the path with the root node's id
  const [path, setPath] = useState<string[]>(rootNode ? [rootNode.id] : []);
  const pathSet = useMemo(() => new Set(path), [path]);

  const onNodeClick = useCallback<NodeMouseHandler>(
    (event, node: Node) => {
      const lastNodeInPath = path[path.length - 1];

      const isParent = edges.some(
        (edge) => edge.source === node.id && edge.target === lastNodeInPath
      );

      if (isParent) {
        return;
      }

      // If the clicked node is the last node in the path, remove it from the path
      if (node.id === lastNodeInPath) {
        setPath((prevPath) => prevPath.slice(0, -1));
        return;
      }

      // If the clicked node is already in the path, ignore the click
      if (path.includes(node.id)) {
        return;
      }

      const isConnected =
        path.length === 0 ||
        edges.some(
          (edge) =>
            (edge.source === lastNodeInPath && edge.target === node.id) ||
            (edge.source === node.id && edge.target === lastNodeInPath)
        );

      // If the clicked node is connected to the last node in the path, append it to the path
      if (isConnected) {
        setPath((prevPath) => [...prevPath, node.id]);
      }
    },
    [edges, path, pathSet, setPath]
  );
  const findEdgesInPath = useCallback(
    (path: string[], edges: Edge[]): Edge[] => {
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
    },
    []
  );

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
    },
    [nodes, edges]
  );

  const updatedNodes = useMemo(
    () =>
      nodes.map((node) => {
        if (pathSet.has(node.id)) {
          return {
            ...node,
            style: selectedNode.style,
          };
        }
        return node;
      }),
    [nodes, pathSet]
  );

  const edgesInPath = findEdgesInPath(path, edges);
  const edgesInPathSet = useMemo(
    () => new Set(edgesInPath.map((edge) => edge.id)),
    [edgesInPath]
  );

  const updatedEdges = useMemo(
    () =>
      edges.map((edge) => {
        if (edgesInPathSet.has(edge.id)) {
          return {
            ...edge,
            ...selectedEdge,
          };
        }
        return edge;
      }),
    [edges, edgesInPathSet]
  );

  return (
    <ReactFlow
      nodes={updatedNodes}
      edges={updatedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      connectionLineType={edgesType}
      // remove this after we subscribe to React Flow, once we start making shit tons of money :o)))
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{
        type: edgesType,
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
