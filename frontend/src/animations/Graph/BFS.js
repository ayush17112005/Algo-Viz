// Generate BFS steps
export const generateBFSSteps = (graph, start) => {
  const steps = [];
  const visited = new Set();
  const queue = [start];

  steps.push({
    visited: [],
    queue: [start],
    currentNode: null,
    exploring: [],
    description: `Starting BFS from node ${start}. Queue initialized with start node.`,
  });

  while (queue.length > 0) {
    const currentNode = queue.shift(); // Remove from front of queue (FIFO)

    steps.push({
      visited: Array.from(visited),
      queue: [...queue],
      currentNode: currentNode,
      exploring: [currentNode],
      description: `Dequeued node ${currentNode} from front of queue.`,
    });

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      steps.push({
        visited: Array.from(visited),
        queue: [...queue],
        currentNode: currentNode,
        exploring: [],
        description: `Visited node ${currentNode}. Adding to visited set.`,
      });

      // Add neighbors to queue (maintains order for level-by-level exploration)
      const neighbors = graph[currentNode] || [];
      const unvisitedNeighbors = neighbors.filter(
        (neighbor) => !visited.has(neighbor) && !queue.includes(neighbor)
      );

      if (unvisitedNeighbors.length > 0) {
        unvisitedNeighbors.forEach((neighbor) => queue.push(neighbor));

        steps.push({
          visited: Array.from(visited),
          queue: [...queue],
          currentNode: currentNode,
          exploring: unvisitedNeighbors,
          description: `Added unvisited neighbors [${unvisitedNeighbors.join(
            ", "
          )}] to back of queue.`,
        });
      }
    } else {
      steps.push({
        visited: Array.from(visited),
        queue: [...queue],
        currentNode: currentNode,
        exploring: [],
        description: `Node ${currentNode} already visited. Skipping.`,
      });
    }
  }

  steps.push({
    visited: Array.from(visited),
    queue: [],
    currentNode: null,
    exploring: [],
    description:
      "BFS traversal completed! All reachable nodes have been visited level by level.",
  });

  return steps;
};
