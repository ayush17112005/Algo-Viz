export const generateDFSSteps = (graph, start) => {
  const steps = [];
  const visited = new Set();
  const stack = [start];

  steps.push({
    visited: [],
    stack: [start],
    currentNode: null,
    exploring: [],
    description: `Starting DFS from node ${start}. Stack initialized with start node.`,
  });

  while (stack.length > 0) {
    const currentNode = stack.pop();

    steps.push({
      visited: Array.from(visited),
      stack: [...stack],
      currentNode: currentNode,
      exploring: [currentNode],
      description: `Popped node ${currentNode} from stack.`,
    });

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      steps.push({
        visited: Array.from(visited),
        stack: [...stack],
        currentNode: currentNode,
        exploring: [],
        description: `Visited node ${currentNode}. Adding to visited set.`,
      });

      // Add neighbors to stack (in reverse order for left-to-right exploration)
      const neighbors = graph[currentNode] || [];
      const unvisitedNeighbors = neighbors.filter(
        (neighbor) => !visited.has(neighbor)
      );

      if (unvisitedNeighbors.length > 0) {
        for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
          stack.push(unvisitedNeighbors[i]);
        }

        steps.push({
          visited: Array.from(visited),
          stack: [...stack],
          currentNode: currentNode,
          exploring: unvisitedNeighbors,
          description: `Added unvisited neighbors [${unvisitedNeighbors.join(
            ", "
          )}] to stack.`,
        });
      }
    } else {
      steps.push({
        visited: Array.from(visited),
        stack: [...stack],
        currentNode: currentNode,
        exploring: [],
        description: `Node ${currentNode} already visited. Skipping.`,
      });
    }
  }

  steps.push({
    visited: Array.from(visited),
    stack: [],
    currentNode: null,
    exploring: [],
    description:
      "DFS traversal completed! All reachable nodes have been visited.",
  });

  return steps;
};
