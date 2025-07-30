export const dijkstraCode = `vector<pair<int, int>> dijkstra(vector<vector<string>>& grid, pair<int, int> start, pair<int, int> end) {
    int rows = grid.size();
    int cols = grid[0].size();

    // Initialize distances and visited arrays
    vector<vector<int>> distances(rows, vector<int>(cols, INT_MAX));
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    vector<vector<pair<int, int>>> previous(rows, vector<pair<int, int>>(cols, {-1, -1}));

    distances[start.first][start.second] = 0;

    // Min-heap priority queue: {distance, {row, col}}
    priority_queue<
        pair<int, pair<int, int>>, 
        vector<pair<int, pair<int, int>>>, 
        greater<pair<int, pair<int, int>>>
    > pq;

    pq.push({0, start});

    // Possible directions: up, down, left, right
    vector<pair<int, int>> directions = {{-1,0}, {1,0}, {0,-1}, {0,1}};

    while (!pq.empty()) {
        // Get node with minimum distance
        auto [dist, current] = pq.top();
        pq.pop();

        int row = current.first;
        int col = current.second;

        if (visited[row][col]) continue;

        visited[row][col] = true;

        // If we reached the destination
        if (row == end.first && col == end.second) {
            return reconstructPath(previous, start, end);
        }

        // Explore all 4-directional neighbors
        for (auto [dr, dc] : directions) {
            int newRow = row + dr;
            int newCol = col + dc;

            if (isValidCell(newRow, newCol, rows, cols) &&
                !visited[newRow][newCol] &&
                grid[newRow][newCol] != "wall") {

                int newDistance = dist + 1;

                if (newDistance < distances[newRow][newCol]) {
                    distances[newRow][newCol] = newDistance;
                    previous[newRow][newCol] = {row, col};
                    pq.push({newDistance, {newRow, newCol}});
                }
            }
        }
    }

    return {}; // No path found
}

// Utility to check if cell is inside grid
bool isValidCell(int row, int col, int rows, int cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

// Reconstruct path from 'end' to 'start'
vector<pair<int, int>> reconstructPath(vector<vector<pair<int, int>>>& previous, pair<int, int> start, pair<int, int> end) {
    vector<pair<int, int>> path;
    pair<int, int> current = end;

    while (current.first != -1 && current.second != -1) {
        path.insert(path.begin(), current);
        current = previous[current.first][current.second];
    }

    return path;
}`;
