import React from "react";
import { motion } from "framer-motion";

export const CurrentStep = ({ currentStepData }) => {
  return (
    <motion.div
      key="current-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-3 h-3 bg-green-500 rounded-full"
        />
        Current Step
      </h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-700 text-lg leading-relaxed"
      >
        {currentStepData.description}
      </motion.p>
    </motion.div>
  );
};
