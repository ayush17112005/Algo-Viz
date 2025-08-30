import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import usePathFinding from "../../hooks/usePathFinding";
import ControlPanel from "./ControlPanel";
import Grid from "./Grid";
import { Legend } from "../SharedComponents/Legend";
import CodeDisplay from "../SharedComponents/CodeDisplay";
import { AlgorithmInfo } from "../SharedComponents/AlgorithmInfo";
import { CurrentStep } from "../SharedComponents/CurrentStep";
import { useVisualizerConfig } from "../../hooks/useVisualizerConfig";
import { Title } from "../SharedComponents/Title";

const PathfindingVisualizer = ({
  algorithmType,
  generateStepsFunction,
  algorithmCode,
  codeTitle,
  configKey,
}) => {
  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);
  const configs = useVisualizerConfig(configKey);

  const {
    gridSize,
    grid,
    start,
    end,
    steps,
    currentStep,
    isPlaying,
    speed,
    mode,
    animatingCells,
    currentStepData,
    setSpeed,
    setMode,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearGrid,
    generateMaze,
    startAlgorithm,
    pauseAlgorithm,
    resetAnimation,
  } = usePathFinding(algorithmType, generateStepsFunction);

  const getCellClass = (row, col) => {
    // Check if it's start or end
    if (row === start.row && col === start.col) return "bg-green-500";
    if (row === end.row && col === end.col) return "bg-red-500";

    // Check if it's in the path
    if (currentStepData.path?.some((p) => p.row === row && p.col === col))
      return "bg-yellow-400";

    // Check if it's the current node
    if (
      currentStepData.current &&
      currentStepData.current.row === row &&
      currentStepData.current.col === col
    ) {
      return "bg-purple-500";
    }

    // Algorithm-specific logic
    if (algorithmType === "astar") {
      // A* specific logic
      if (
        currentStepData.closedSet &&
        currentStepData.closedSet.some(
          (node) => node.row === row && node.col === col
        )
      )
        return "bg-blue-300";

      if (
        currentStepData.openSet &&
        currentStepData.openSet.some(
          (node) => node.row === row && node.col === col
        )
      )
        return "bg-cyan-200";
    } else if (algorithmType === "dijkstra") {
      // Dijkstra specific logic
      if (currentStepData.visited?.[row]?.[col]) return "bg-blue-300";
    }

    // Check if it's a wall
    if (grid[row] && grid[row][col] === "wall") return "bg-gray-800";

    return "bg-white border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <Title title={configs.title} description={configs.description} />

        {/* Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          startAlgorithm={startAlgorithm}
          pauseAlgorithm={pauseAlgorithm}
          resetAnimation={resetAnimation}
          clearGrid={clearGrid}
          generateMaze={generateMaze}
          showCode={showCode}
          showInfo={showInfo}
          toggleCode={toggleCode}
          toggleInfo={toggleInfo}
          speed={speed}
          setSpeed={setSpeed}
          currentStep={currentStep}
          stepsLength={steps.length}
          mode={mode}
          setMode={setMode}
        />

        {/* Main Visualization Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <AnimatePresence mode="wait">
            {showCode ? (
              // Code Display
              <CodeDisplay title={codeTitle} code={algorithmCode} />
            ) : (
              // Grid Visualization
              <motion.div
                key="visualization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Pathfinding Grid
                </h3>

                <Grid
                  gridSize={gridSize}
                  isPlaying={isPlaying}
                  animatingCells={animatingCells}
                  getCellClass={getCellClass}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseUp={handleMouseUp}
                />

                {/* Legend */}
                <Legend legendItems={configs.legendItems} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section - Algorithm Info or Current Step */}
        <AnimatePresence mode="wait">
          {showInfo ? (
            <AlgorithmInfo algorithmData={configs.algorithmInfo} />
          ) : (
            !showCode && (
              <CurrentStep
                key="current-step"
                currentStep={currentStep}
                currentStepData={currentStepData}
              />
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
