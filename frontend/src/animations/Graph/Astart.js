// Heuristic function (Manhattan distance)
const heuristic = (a, b) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};
export const generateAStarSteps = (grid, start, end) => {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Initialize data structures
  const openSet = [
    {
      ...start,
      g: 0,
      h: heuristic(start, end),
      f: heuristic(start, end),
      parent: null,
    },
  ];
  const closedSet = [];
  const allNodes = {};

  // Initialize all nodes
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      allNodes[`${row}-${col}`] = {
        row,
        col,
        g: Infinity,
        h: heuristic({ row, col }, end),
        f: Infinity,
        parent: null,
      };
    }
  }

  allNodes[`${start.row}-${start.col}`].g = 0;
  allNodes[`${start.row}-${start.col}`].f = heuristic(start, end);

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  steps.push({
    grid: grid.map((row) => [...row]),
    openSet: [...openSet],
    closedSet: [...closedSet],
    current: null,
    path: [],
    description: "Starting A* algorithm. Open set contains the start node.",
  });

  while (openSet.length > 0) {
    // Find node with lowest f score
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    closedSet.push(current);

    steps.push({
      grid: grid.map((row) => [...row]),
      openSet: [...openSet],
      closedSet: [...closedSet],
      current: { row: current.row, col: current.col },
      path: [],
      description: `Exploring node (${current.row}, ${
        current.col
      }) with f=${current.f.toFixed(1)} (g=${current.g}, h=${current.h.toFixed(
        1
      )})`,
    });

    // Check if we reached the goal
    if (current.row === end.row && current.col === end.col) {
      const path = [];
      let pathNode = current;
      while (pathNode) {
        path.unshift({ row: pathNode.row, col: pathNode.col });
        pathNode = pathNode.parent;
      }

      steps.push({
        grid: grid.map((row) => [...row]),
        openSet: [...openSet],
        closedSet: [...closedSet],
        current: { row: current.row, col: current.col },
        path: path,
        description: `Path found! Total cost: ${current.g}, Path length: ${path.length}`,
      });

      return steps;
    }

    // Explore neighbors
    for (const [dr, dc] of directions) {
      const newRow = current.row + dr;
      const newCol = current.col + dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== "wall"
      ) {
        const neighbor = allNodes[`${newRow}-${newCol}`];

        // Skip if already in closed set
        if (
          closedSet.some((node) => node.row === newRow && node.col === newCol)
        ) {
          continue;
        }

        const tentativeG = current.g + 1;

        // Check if this path to neighbor is better
        if (tentativeG < neighbor.g) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;

          // Add to open set if not already there
          if (
            !openSet.some((node) => node.row === newRow && node.col === newCol)
          ) {
            openSet.push({ ...neighbor });
          }
        }
      }
    }
  }

  steps.push({
    grid: grid.map((row) => [...row]),
    openSet: [],
    closedSet: [...closedSet],
    current: null,
    path: [],
    description: "No path found! The destination is unreachable.",
  });

  return steps;
};
