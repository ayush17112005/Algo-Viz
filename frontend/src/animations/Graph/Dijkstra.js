export const DijkstraAlgorithm = {
  generateSteps: (grid, start, end) => {
    const steps = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distances and visited arrays
    const distances = Array(rows)
      .fill()
      .map(() => Array(cols).fill(Infinity));
    const visited = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
    const previous = Array(rows)
      .fill()
      .map(() => Array(cols).fill(null));

    distances[start.row][start.col] = 0;

    const pq = [{ row: start.row, col: start.col, distance: 0 }];

    steps.push({
      grid: grid.map((row) => [...row]),
      visited: visited.map((row) => [...row]),
      distances: distances.map((row) => [...row]),
      current: start,
      path: [],
      description: `Starting Dijkstra's algorithm from source (${start.row}, ${start.col})`,
    });

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]; // up, down, left, right

    while (pq.length > 0) {
      // Sort priority queue by distance (simple implementation)
      pq.sort((a, b) => a.distance - b.distance);
      const current = pq.shift();

      if (visited[current.row][current.col]) continue;

      visited[current.row][current.col] = true;

      steps.push({
        grid: grid.map((row) => [...row]),
        visited: visited.map((row) => [...row]),
        distances: distances.map((row) => [...row]),
        current: { row: current.row, col: current.col },
        path: [],
        description: `Visiting node (${current.row}, ${current.col}) with distance ${current.distance}`,
      });

      // If we reached the destination
      if (current.row === end.row && current.col === end.col) {
        // Reconstruct path
        const path = [];
        let curr = { row: end.row, col: end.col };
        while (curr) {
          path.unshift(curr);
          curr = previous[curr.row][curr.col];
        }

        steps.push({
          grid: grid.map((row) => [...row]),
          visited: visited.map((row) => [...row]),
          distances: distances.map((row) => [...row]),
          current: { row: current.row, col: current.col },
          path: path,
          description: `Destination reached! Shortest path found with distance ${current.distance}`,
        });
        break;
      }

      // Check all neighbors
      for (const [dr, dc] of directions) {
        const newRow = current.row + dr;
        const newCol = current.col + dc;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !visited[newRow][newCol] &&
          grid[newRow][newCol] !== "wall"
        ) {
          const newDistance = current.distance + 1;

          if (newDistance < distances[newRow][newCol]) {
            distances[newRow][newCol] = newDistance;
            previous[newRow][newCol] = { row: current.row, col: current.col };
            pq.push({ row: newRow, col: newCol, distance: newDistance });

            steps.push({
              grid: grid.map((row) => [...row]),
              visited: visited.map((row) => [...row]),
              distances: distances.map((row) => [...row]),
              current: { row: current.row, col: current.col },
              path: [],
              description: `Updated distance to (${newRow}, ${newCol}): ${newDistance}`,
            });
          }
        }
      }
    }

    return steps;
  },
};
