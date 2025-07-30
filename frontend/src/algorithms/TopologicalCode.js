import React from "react";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";

const TopologicalCode = () => {
  const topologicalSortCode = `// Kahn's Algorithm for Topological Sort in C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

vector<int> topologicalSort(unordered_map<int, vector<int>>& graph, int numNodes) {
    vector<int> inDegree(numNodes, 0);
    queue<int> q;
    vector<int> result;

    // Calculate in-degree for each node
    for (auto& [node, neighbors] : graph) {
        for (int neighbor : neighbors) {
            inDegree[neighbor]++;
        }
    }

    // Add nodes with in-degree 0 to the queue
    for (int i = 0; i < numNodes; ++i) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }

    // Process the queue
    while (!q.empty()) {
        int current = q.front();
        q.pop();
        result.push_back(current);

        for (int neighbor : graph[current]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    // Check for cycle
    if (result.size() != numNodes) {
        throw runtime_error("Graph contains a cycle!");
    }

    return result;
}
`;

  return (
    <motion.div
      key="code"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
        <Code2 className="text-green-600" size={28} />
        Topological Sort Implementation (Kahn's Algorithm)
      </h3>
      <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
        <pre className="text-green-400 text-sm leading-relaxed">
          <code>{topologicalSortCode}</code>
        </pre>
      </div>
    </motion.div>
  );
};

export default TopologicalCode;
