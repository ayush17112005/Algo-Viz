import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Code2, Info } from "lucide-react";
import { ControlButton } from "../SharedComponents/ControlButton";
import { SpeedControl } from "../SharedComponents/SpeedControl";
import { StepCounter } from "../SharedComponents/StepCounter";

const ControlPanel = ({
  isPlaying,
  speed,
  startTopologicalSort,
  resetAnimation,
  generateNewGraph,
  toggleCode,
  toggleInfo,
  showCode,
  showInfo,
  setSpeed,
  currentStep,
  steps,
  pauseAnimation, // Add this prop
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ControlButton
            onClick={isPlaying ? pauseAnimation : startTopologicalSort}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
            icon={isPlaying ? <Pause size={18} /> : <Play size={18} />}
          >
            {isPlaying ? "Pause" : "Start Topological Sort"}
          </ControlButton>

          <ControlButton
            onClick={resetAnimation}
            icon={<RotateCcw size={18} />}
          >
            Reset
          </ControlButton>

          <ControlButton onClick={generateNewGraph}>
            Generate New DAG
          </ControlButton>

          <ControlButton
            onClick={toggleCode}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showCode
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
            icon={<Code2 size={18} />}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>

          <ControlButton
            onClick={toggleInfo}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showInfo
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
            icon={<Info size={18} />}
          >
            {showInfo ? "Hide Info" : "Algorithm Info"}
          </ControlButton>
        </div>

        <div className="flex items-center gap-6">
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
          <StepCounter currentStep={currentStep} totalSteps={steps.length} />
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
