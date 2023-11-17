import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Node, useNodesState, useEdgesState } from 'reactflow';
import { initialNodes, initialEdges } from './nodes-edges';

// Define a type for the context value
interface StoryPathContextValue {
  addPath: (node: Node) => void;
  path: string[];
  pathSet: Set<string>;
  nodesState: {
    nodes: ReturnType<typeof useNodesState>[0];
    setNodes: ReturnType<typeof useNodesState>[1];
    onNodesChange: ReturnType<typeof useNodesState>[2];
  };
  edgesState: {
    edges: ReturnType<typeof useEdgesState>[0];
    setEdges: ReturnType<typeof useEdgesState>[1];
    onEdgesChange: ReturnType<typeof useEdgesState>[2];
  };
}

// Step 1: Define a new context with the correct type
const StoryPathContext = createContext<StoryPathContextValue | undefined>(
  undefined
);

// Step 2: Create a new function
export function StoryPathProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Find the root node
  const rootNode = nodes.find(
    (node) => !edges.some((edge) => edge.target === node.id)
  );

  // Step 3: Use the useState hook
  // Initialize the path with the root node's id
  const [path, setPath] = useState<string[]>(rootNode ? [rootNode.id] : []);
  const pathSet = useMemo(() => new Set(path), [path]);

  // Step 4: Provide the addPath function and the path state
  const addPath = useCallback(
    (node: Node) => {
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
      if (pathSet.has(node.id)) {
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

  const value = {
    addPath,
    path,
    pathSet,
    nodesState: {
      nodes,
      setNodes,
      onNodesChange,
    },
    edgesState: {
      edges,
      setEdges,
      onEdgesChange,
    },
  };

  return (
    <StoryPathContext.Provider value={value}>
      {children}
    </StoryPathContext.Provider>
  );
}

// Create a custom hook for using the context
export function useStoryPath() {
  const context = useContext(StoryPathContext);
  if (context === undefined) {
    throw new Error('useStoryPath must be used within a StoryPathProvider');
  }
  return context;
}
