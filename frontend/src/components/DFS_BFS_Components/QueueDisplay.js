import React from "react";
import { motion } from "framer-motion";

export const QueueDisplay = ({ queue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50 p-6 rounded-xl"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        Queue
        <span className="text-sm text-gray-500 font-normal">
          (FIFO - First In First Out)
        </span>
      </h4>
      <div className="flex flex-wrap gap-2">
        {queue?.length > 0 ? (
          queue.map((node, index) => (
            <motion.div
              key={`${node}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg font-medium relative"
            >
              {node}
              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  F
                </div>
              )}
              {index === queue.length - 1 && queue.length > 1 && (
                <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  R
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <span className="text-gray-500">Empty</span>
        )}
      </div>
      {queue?.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          F = Front (dequeue), R = Rear (enqueue)
        </div>
      )}
    </motion.div>
  );
};
