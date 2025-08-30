export const aStarCode = `struct Node {
    int row, col;
    int g, h, f;
    Node* parent;
};

// Heuristic function (Manhattan distance)
int heuristic(Node* a, Node* b) {
    return abs(a->row - b->row) + abs(a->col - b->col);
}

// Check if a cell is within grid bounds
bool isValidCell(int row, int col, int rows, int cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

// Check if a node is in the closed set
bool isInClosedSet(int row, int col, vector<Node*>& closedSet) {
    for (auto node : closedSet) {
        if (node->row == row && node->col == col) return true;
    }
    return false;
}

// Reconstruct path from end node to start node
vector<pair<int, int>> reconstructPath(Node* endNode) {
    vector<pair<int, int>> path;
    Node* current = endNode;
    while (current) {
        path.insert(path.begin(), {current->row, current->col});
        current = current->parent;
    }
    return path;
}

// A* algorithm implementation
vector<pair<int, int>> aStar(vector<vector<string>>& grid, Node* start, Node* end) {
    int rows = grid.size();
    int cols = grid[0].size();

    // Initialize open and closed sets
    vector<Node*> openSet;
    vector<Node*> closedSet;

    // Set starting node values
    start->g = 0;
    start->h = heuristic(start, end);
    start->f = start->g + start->h;
    start->parent = nullptr;
    openSet.push_back(start);

    // Define possible movement directions (up, down, left, right)
    vector<pair<int, int>> directions = {{-1,0}, {1,0}, {0,-1}, {0,1}};

    while (!openSet.empty()) {
        // Sort open set to get node with lowest f score
        sort(openSet.begin(), openSet.end(), [](Node* a, Node* b) {
            return a->f < b->f;
        });

        // Pop the node with the lowest f score
        Node* current = openSet.front();
        openSet.erase(openSet.begin());
        closedSet.push_back(current);

        // If we've reached the goal, reconstruct and return path
        if (current->row == end->row && current->col == end->col) {
            return reconstructPath(current);
        }

        // Explore all neighbors
        for (auto [dr, dc] : directions) {
            int newRow = current->row + dr;
            int newCol = current->col + dc;

            if (isValidCell(newRow, newCol, rows, cols) &&
                grid[newRow][newCol] != "wall" &&
                !isInClosedSet(newRow, newCol, closedSet)) {

                int tentativeG = current->g + 1;
                int h = heuristic(new Node{newRow, newCol}, end);
                int f = tentativeG + h;

                // Check if node already exists in openSet
                auto it = find_if(openSet.begin(), openSet.end(), [&](Node* n) {
                    return n->row == newRow && n->col == newCol;
                });

                if (it == openSet.end() || tentativeG < (*it)->g) {
                    Node* neighbor = new Node{newRow, newCol, tentativeG, h, f, current};

                    if (it != openSet.end()) {
                        // Update existing node
                        **it = *neighbor;
                    } else {
                        // Add new node to open set
                        openSet.push_back(neighbor);
                    }
                }
            }
        }
    }

    return {}; // No path found
}`;
