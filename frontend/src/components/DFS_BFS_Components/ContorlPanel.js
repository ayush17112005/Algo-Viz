import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Code2, Info } from "lucide-react";

export const ControlPanel = ({
  isPlaying,
  handlePlayPause,
  resetAnimation,
  generateNewGraph,
  toggleCode,
  toggleInfo,
  showCode,
  showInfo,
  startNode,
  handleStartNodeChange,
  graph,
  speed,
  handleSpeedChange,
  currentStep,
  totalSteps,
  algorithmInfo,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying
              ? algorithmInfo.buttonText.pause
              : algorithmInfo.buttonText.start}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetAnimation}
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md"
          >
            <RotateCcw size={18} />
            Reset
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNewGraph}
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
          >
            Generate New Graph
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCode}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showCode
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Code2 size={18} />
            {showCode ? "Hide Code" : "Show Code"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleInfo}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showInfo
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Info size={18} />
            {showInfo ? "Hide Info" : "Algorithm Info"}
          </motion.button>
        </div>

        <div className="flex items-center gap-6">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-medium text-gray-700">
              Start Node:
            </span>
            <select
              value={startNode}
              onChange={(e) => handleStartNodeChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {Object.keys(graph).map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-medium text-gray-700">Speed:</span>
            <input
              type="range"
              min="100"
              max="2000"
              value={speed}
              onChange={(e) => handleSpeedChange(e.target.value)}
              className="w-24 accent-green-600"
            />
            <span className="text-sm text-gray-600 min-w-[60px]">
              {speed}ms
            </span>
          </motion.div>

          <motion.div
            className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            Step: {currentStep + 1} / {totalSteps}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
