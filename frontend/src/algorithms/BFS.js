export const bfsCode = `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    while (queue.length > 0) {
        // Dequeue node from front of queue
        const currentNode = queue.shift();
        
        // If not visited, process it
        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            result.push(currentNode);
            
            // Add neighbors to back of queue
            // (maintains level-by-level exploration)
            const neighbors = graph[currentNode] || [];
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor) && !queue.includes(neighbor)) {
                    queue.push(neighbor);
                }
            });
        }
    }
    
    return result;
}`;
