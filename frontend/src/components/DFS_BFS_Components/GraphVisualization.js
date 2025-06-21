import React from "react";
import { motion } from "framer-motion";

export const GraphVisualization = ({
  graph,
  nodePositions,
  getNodeColor,
  currentStepData,
  children, // For additional elements like queue/stack displays
}) => {
  return (
    <motion.div
      key="visualization"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Graph Visualization
      </h3>

      <div
        className="relative bg-gray-50 rounded-xl p-8"
        style={{ height: "450px" }}
      >
        {/* Draw edges */}
        <svg className="absolute inset-0 w-full h-full">
          {Object.entries(graph).map(([nodeId, neighbors]) =>
            neighbors.map((neighborId) => {
              const from = nodePositions[nodeId];
              const to = nodePositions[neighborId];
              if (from && to && nodeId < neighborId) {
                return (
                  <line
                    key={`${nodeId}-${neighborId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#d1d5db"
                    strokeWidth="2"
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
            </motion.div>
          );
        })}
      </div>

      {children}
    </motion.div>
  );
};
