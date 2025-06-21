import React from "react";
import { motion } from "framer-motion";

export const VisitedDisplay = ({ visited }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50 p-6 rounded-xl"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Visited Nodes
      </h4>
      <div className="flex flex-wrap gap-2">
        {visited.length > 0 ? (
          visited.map((node, index) => (
            <motion.div
              key={`visited-${node}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium"
            >
              {node}
            </motion.div>
          ))
        ) : (
          <span className="text-gray-500">None</span>
        )}
      </div>
    </motion.div>
  );
};
