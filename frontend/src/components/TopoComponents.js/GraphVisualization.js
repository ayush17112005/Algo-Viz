import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Legend } from "../SharedComponents/Legend";
import { useVisualizerConfig } from "../../hooks/useVisualizerConfig";
const GraphVisualization = ({
  graph,
  nodePositions,
  currentStepData,
  getNodeColor,
}) => {
  const configs = useVisualizerConfig("topological");
  return (
    <motion.div
      key="visualization"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Directed Acyclic Graph (DAG) Visualization
      </h3>

      <div
        className="relative bg-gray-50 rounded-xl p-8"
        style={{ height: "400px" }}
      >
        {/* Draw edges with arrows */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
            </marker>
          </defs>
          {Object.entries(graph).map(([nodeId, neighbors]) =>
            neighbors.map((neighborId) => {
              const from = nodePositions[nodeId];
              const to = nodePositions[neighborId];
              if (from && to) {
                // Calculate arrow position
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const unitX = dx / length;
                const unitY = dy / length;

                // Adjust start and end points to not overlap with nodes
                const startX = from.x + unitX * 24;
                const startY = from.y + unitY * 24;
                const endX = to.x - unitX * 24;
                const endY = to.y - unitY * 24;

                return (
                  <line
                    key={`${nodeId}-${neighborId}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#6b7280"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Draw nodes */}
        {Object.keys(graph).map((nodeId) => {
          const position = nodePositions[nodeId];
          if (!position) return null;

          return (
            <motion.div
              key={nodeId}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: getNodeColor(parseInt(nodeId)),
              }}
              whileHover={{ scale: 1.2 }}
              className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer"
              style={{
                left: position.x - 24,
                top: position.y - 24,
                backgroundColor: getNodeColor(parseInt(nodeId)),
              }}
            >
              {nodeId}
              {currentStepData.currentNode === parseInt(nodeId) && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-yellow-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {/* Show in-degree */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                in: {currentStepData.inDegree[parseInt(nodeId)] || 0}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Queue, Result, and In-degrees */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Queue (In-degree = 0)
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentStepData.queue.length > 0 ? (
              currentStepData.queue.map((node, index) => (
                <motion.div
                  key={`queue-${node}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-purple-500 text-white px-3 py-2 rounded-lg font-medium"
                >
                  {node}
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500">Empty</span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Topological Order
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentStepData.result.length > 0 ? (
              currentStepData.result.map((node, index) => (
                <motion.div
                  key={`result-${node}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium flex items-center gap-1"
                >
                  {node}
                  {index < currentStepData.result.length - 1 && (
                    <ArrowRight size={14} />
                  )}
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500">None</span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            In-Degrees
          </h4>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {Object.entries(currentStepData.inDegree).map(([node, degree]) => (
              <div key={`degree-${node}`} className="text-center">
                <div className="text-gray-600">Node {node}</div>
                <div className="font-bold text-gray-900">{degree}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Legend */}
      <Legend legendItems={configs.legendItems} />
    </motion.div>
  );
};

export default GraphVisualization;
