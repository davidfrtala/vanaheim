import type { Node, Edge } from 'reactflow';

function traverse(nodeId: Node['id'], initialEdges: Edge[]): Edge[] {
  let path: Edge[] = [];
  let visited: { [id: string]: boolean } = {};

  function helper(id: Node['id'], path: Edge[]): Edge[] {
    console.log(`Visiting node ${id}`);
    visited[id] = true;
    const edges = initialEdges.filter(
      (edge) => edge.target === id && !visited[edge.source]
    );
    for (let edge of edges) {
      console.log(`Found edge from ${edge.source} to ${edge.target}`);
      path.push(edge);
      const result = helper(edge.source, path);
      if (result) return result;
      path.pop();
    }
    return path;
  }

  path = helper(nodeId, path) || [];
  return path.reverse();
}

function getNodesFromPath(path: Edge[], initialNodes: Node[]): Node[] {
  let nodes: Node[] = [];

  for (let edge of path) {
    const node = initialNodes.find((node) => node.id === edge.source);
    if (node) {
      nodes.push(node);
    }
  }

  const lastNode = initialNodes.find(
    (node) => node.id === path[path.length - 1].target
  );
  if (lastNode) {
    nodes.push(lastNode);
  }

  return nodes;
}
