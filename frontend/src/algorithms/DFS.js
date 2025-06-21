export const dfsCode = `function dfs(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        // Pop node from stack
        const currentNode = stack.pop();
        
        // If not visited, process it
        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            result.push(currentNode);
            
            // Add neighbors to stack
            // (in reverse order for left-to-right exploration)
            const neighbors = graph[currentNode] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }
    
    return result;
}`;
