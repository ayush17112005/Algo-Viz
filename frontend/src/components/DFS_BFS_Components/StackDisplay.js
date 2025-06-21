import React from "react";
import { motion } from "framer-motion";

export const StackDisplay = ({ stack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50 p-6 rounded-xl"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        Stack
        <span className="text-sm text-gray-500 font-normal">
          (LIFO - Last In First Out)
        </span>
      </h4>
      <div className="flex flex-col-reverse gap-2 max-h-40 overflow-y-auto">
        {stack?.length > 0 ? (
          stack.map((node, index) => (
            <motion.div
              key={`${node}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-purple-500 text-white px-3 py-2 rounded-lg font-medium relative ${
                index === stack.length - 1 ? "border-2 border-yellow-400" : ""
              }`}
            >
              {node}
              {index === stack.length - 1 && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  T
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <span className="text-gray-500">Empty</span>
        )}
      </div>
      {stack?.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">T = Top (push/pop)</div>
      )}
    </motion.div>
  );
};
