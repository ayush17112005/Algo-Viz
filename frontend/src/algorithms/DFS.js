export const dfsCode = `vector<int> dfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    stack<int> stk;
    vector<int> result;
    
    // Push the starting node onto the stack
    stk.push(start);
    
    while (!stk.empty()) {
        // Pop node from top of stack
        int currentNode = stk.top();
        stk.pop();
        
        // If not visited, process it
        if (visited.find(currentNode) == visited.end()) {
            visited.insert(currentNode);
            result.push_back(currentNode);
            
            // Add neighbors to stack
            // (in reverse order for left-to-right exploration)
            vector<int> neighbors = graph[currentNode];
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                if (visited.find(neighbors[i]) == visited.end()) {
                    stk.push(neighbors[i]);
                }
            }
        }
    }
    
    return result;
}`;
