export const dijkstraCode = `function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Initialize distances and visited arrays
    const distances = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const previous = Array(rows).fill().map(() => Array(cols).fill(null));
    
    distances[start.row][start.col] = 0;
    
    // Priority queue (min-heap)
    const pq = [{row: start.row, col: start.col, distance: 0}];
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (pq.length > 0) {
        // Get node with minimum distance
        pq.sort((a, b) => a.distance - b.distance);
        const current = pq.shift();
        
        if (visited[current.row][current.col]) continue;
        
        visited[current.row][current.col] = true;
        
        // If we reached the destination
        if (current.row === end.row && current.col === end.col) {
            return reconstructPath(previous, start, end);
        }
        
        // Check all neighbors
        for (const [dr, dc] of directions) {
            const newRow = current.row + dr;
            const newCol = current.col + dc;
            
            if (isValidCell(newRow, newCol, rows, cols) &&
                !visited[newRow][newCol] && 
                grid[newRow][newCol] !== 'wall') {
                
                const newDistance = current.distance + 1;
                
                if (newDistance < distances[newRow][newCol]) {
                    distances[newRow][newCol] = newDistance;
                    previous[newRow][newCol] = {row: current.row, col: current.col};
                    pq.push({row: newRow, col: newCol, distance: newDistance});
                }
            }
        }
    }
    
    return []; // No path found
}

function isValidCell(row, col, rows, cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function reconstructPath(previous, start, end) {
    const path = [];
    let current = end;
    
    while (current) {
        path.unshift(current);
        current = previous[current.row][current.col];
    }
    
    return path;
}`;
