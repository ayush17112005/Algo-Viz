export const bfsCode = `vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    vector<int> result;
    
    // Push the start node into the queue
    q.push(start);
    
    while (!q.empty()) {
        // Dequeue node from front of queue
        int currentNode = q.front();
        q.pop();
        
        // If not visited, process it
        if (visited.find(currentNode) == visited.end()) {
            visited.insert(currentNode);
            result.push_back(currentNode);
            
            // Add neighbors to back of queue
            // (maintains level-by-level exploration)
            vector<int> neighbors = graph[currentNode];
            for (int neighbor : neighbors) {
                if (visited.find(neighbor) == visited.end()) {
                    q.push(neighbor);
                }
            }
        }
    }
    
    return result;
}`;
