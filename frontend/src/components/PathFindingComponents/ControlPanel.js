import React from "react";
import { Play, Pause, RotateCcw, Code2, Info, Eraser } from "lucide-react";
import { motion } from "framer-motion";
import { ControlButton } from "../SharedComponents/ControlButton";
import { SpeedControl } from "../SharedComponents/SpeedControl";
import { StepCounter } from "../SharedComponents/StepCounter";
import { useVisualizerConfig } from "../../hooks/useVisualizerConfig";

const ControlPanel = ({
  isPlaying,
  startAlgorithm,
  pauseAlgorithm,
  resetAnimation,
  clearGrid,
  generateMaze,
  showCode,
  showInfo,
  toggleCode,
  toggleInfo,
  speed,
  setSpeed,
  currentStep,
  stepsLength,
  mode,
  setMode,
}) => {
  const configs = useVisualizerConfig("dijkstra");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ControlButton
            onClick={isPlaying ? pauseAlgorithm : startAlgorithm}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
            icon={isPlaying ? <Pause size={18} /> : <Play size={18} />}
          >
            {isPlaying ? "Pause" : "Start Algorithm"}
          </ControlButton>

          <ControlButton
            onClick={resetAnimation}
            icon={<RotateCcw size={18} />}
          >
            Reset
          </ControlButton>

          <ControlButton
            onClick={clearGrid}
            disabled={isPlaying}
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            icon={<Eraser size={18} />}
          >
            Clear Grid
          </ControlButton>

          <ControlButton
            onClick={generateMaze}
            disabled={isPlaying}
            className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Maze
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
          <StepCounter currentStep={currentStep} totalSteps={stepsLength} />
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700">Mode:</span>
        {configs.modeSelection.map((modeOption) => (
          <ControlButton
            key={modeOption.id}
            onClick={() => setMode(modeOption.id)}
            disabled={isPlaying}
            className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              mode === modeOption.id
                ? `${modeOption.color} ${
                    modeOption.id === "erase"
                      ? "text-gray-700 border"
                      : "text-white"
                  }`
                : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
            }`}
            icon={<modeOption.icon size={16} />}
          >
            {modeOption.label}
          </ControlButton>
        ))}
      </div>
    </motion.div>
  );
};

export default ControlPanel;
