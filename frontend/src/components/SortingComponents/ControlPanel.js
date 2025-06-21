import React from "react";
import { ControlButton } from "./ControlButton";
import { motion } from "framer-motion";
import { Pause, Code2, Info, Play, RotateCcw } from "lucide-react";
import { SpeedControl } from "./SpeedControl";
import { StepCounter } from "./SpeedCounter";
export const ControlPanel = ({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  showCode,
  showInfo,
  onPlayPause,
  onReset,
  onGenerateArray,
  onToggleCode,
  onToggleInfo,
  onSpeedChange,
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
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
            onClick={onPlayPause}
            icon={isPlaying ? <Pause size={18} /> : <Play size={18} />}
          >
            {isPlaying ? "Pause" : "Start Sorting"}
          </ControlButton>

          <ControlButton
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md"
            onClick={onReset}
            icon={<RotateCcw size={18} />}
          >
            Reset
          </ControlButton>

          <ControlButton
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
            onClick={onGenerateArray}
          >
            Generate New Array
          </ControlButton>

          <ControlButton
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showCode
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
            onClick={onToggleCode}
            icon={<Code2 size={18} />}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>

          <ControlButton
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
              showInfo
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
            onClick={onToggleInfo}
            icon={<Info size={18} />}
          >
            {showInfo ? "Hide Info" : "Algorithm Info"}
          </ControlButton>
        </div>

        <div className="flex items-center gap-6">
          <SpeedControl speed={speed} onSpeedChange={onSpeedChange} />
          <StepCounter currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>
    </motion.div>
  );
};
