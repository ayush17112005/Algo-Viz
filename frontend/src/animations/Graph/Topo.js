const calculateInDegree = (graph) => {
  const inDegree = {};
  Object.keys(graph).forEach((node) => {
    inDegree[parseInt(node)] = 0;
  });

  Object.entries(graph).forEach(([node, neighbors]) => {
    neighbors.forEach((neighbor) => {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    });
  });

  return inDegree;
};

export const generateTopologicalSteps = (graph) => {
  const steps = [];
  const inDegree = calculateInDegree(graph);
  const queue = [];
  const result = [];

  // Find all nodes with in-degree 0
  Object.keys(inDegree).forEach((node) => {
    if (inDegree[node] === 0) {
      queue.push(parseInt(node));
    }
  });

  steps.push({
    queue: [...queue],
    result: [],
    inDegree: { ...inDegree },
    currentNode: null,
    processing: [],
    description: `Initialized queue with nodes having in-degree 0: [${queue.join(
      ", "
    )}]`,
  });

  while (queue.length > 0) {
    const currentNode = queue.shift();

    steps.push({
      queue: [...queue],
      result: [...result],
      inDegree: { ...inDegree },
      currentNode: currentNode,
      processing: [currentNode],
      description: `Dequeued node ${currentNode} from queue.`,
    });

    result.push(currentNode);

    steps.push({
      queue: [...queue],
      result: [...result],
      inDegree: { ...inDegree },
      currentNode: currentNode,
      processing: [],
      description: `Added node ${currentNode} to topological order.`,
    });

    // Process all neighbors
    const neighbors = graph[currentNode] || [];
    const updatedNodes = [];

    neighbors.forEach((neighbor) => {
      inDegree[neighbor]--;
      updatedNodes.push(neighbor);

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });

    if (updatedNodes.length > 0) {
      const newZeroInDegree = updatedNodes.filter(
        (node) => inDegree[node] === 0
      );

      steps.push({
        queue: [...queue],
        result: [...result],
        inDegree: { ...inDegree },
        currentNode: currentNode,
        processing: updatedNodes,
        description: `Reduced in-degree of neighbors [${updatedNodes.join(
          ", "
        )}]. ${
          newZeroInDegree.length > 0
            ? `Added [${newZeroInDegree.join(", ")}] to queue.`
            : "No new nodes added to queue."
        }`,
      });
    }
  }

  const isValidTopologicalSort = result.length === Object.keys(graph).length;

  steps.push({
    queue: [],
    result: [...result],
    inDegree: { ...inDegree },
    currentNode: null,
    processing: [],
    description: isValidTopologicalSort
      ? "Topological sort completed successfully! All nodes processed in valid order."
      : "Graph contains a cycle! Topological sort not possible.",
  });

  return steps;
};
