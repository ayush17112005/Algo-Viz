import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import useTopologicalSort from "../hooks/useTopologicalSort";

// Import components
import ControlPanel from "../components/TopoComponents.js/ControlPanel";
import GraphVisualization from "../components/TopoComponents.js/GraphVisualization";
import { AlgorithmInfo } from "../components/SharedComponents/AlgorithmInfo";
import { CurrentStep } from "../components/SharedComponents/CurrentStep";
import TopologicalCode from "../algorithms/TopologicalCode";
import { Title } from "../components/SharedComponents/Title";
import { useVisualizerConfig } from "../hooks/useVisualizerConfig";

const TopologicalSortVisualizer = () => {
  const {
    graph,
    steps,
    currentStep,
    isPlaying,
    speed,
    currentStepData,
    nodePositions,
    setSpeed,
    generateNewGraph,
    startTopologicalSort,
    resetAnimation,
    getNodeColor,
    pauseAnimation,
  } = useTopologicalSort();

  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);
  const configs = useVisualizerConfig("topological");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <Title title={configs.title} description={configs.description} />

        {/* Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          speed={speed}
          startTopologicalSort={startTopologicalSort}
          resetAnimation={resetAnimation}
          pauseAnimation={pauseAnimation}
          generateNewGraph={generateNewGraph}
          toggleCode={toggleCode}
          toggleInfo={toggleInfo}
          showCode={showCode}
          showInfo={showInfo}
          setSpeed={setSpeed}
          currentStep={currentStep}
          steps={steps}
        />

        {/* Main Visualization Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <AnimatePresence mode="wait">
            {showCode ? (
              <TopologicalCode />
            ) : (
              <GraphVisualization
                graph={graph}
                nodePositions={nodePositions}
                currentStepData={currentStepData}
                getNodeColor={getNodeColor}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section - Steps Info or Algorithm Info */}
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

export default TopologicalSortVisualizer;
