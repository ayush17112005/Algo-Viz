import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useGraphVisualizer from "../../hooks/useGraphAnimation";
import { ControlPanel } from "./ContorlPanel";
import CodeDisplay from "../SharedComponents/CodeDisplay";
import { GraphVisualization } from "./GraphVisualization";
import { StackDisplay } from "./StackDisplay";
import { VisitedDisplay } from "./VisitedDisplay";
import { useVisualizerConfig } from "../../hooks/useVisualizerConfig";
import { Legend } from "../SharedComponents/Legend";
import { AlgorithmInfo } from "../SharedComponents/AlgorithmInfo";
import { CurrentStep } from "../SharedComponents/CurrentStep";
import { QueueDisplay } from "./QueueDisplay";
import { Title } from "../SharedComponents/Title";

const GraphTraversalVisualizer = ({
  algorithmType,
  generateSteps,
  code,
  displayComponent,
}) => {
  const {
    // State
    graph,
    currentStep,
    isPlaying,
    speed,
    startNode,
    currentStepData,

    // Context
    showCode,
    showInfo,
    toggleCode,
    toggleInfo,

    // Actions
    generateNewGraph,
    resetAnimation,
    handlePlayPause,
    handleSpeedChange,
    handleStartNodeChange,

    // Utilities
    getNodeColor,
    nodePositions,

    // Computed values
    algorithmInfo,
    totalSteps,
  } = useGraphVisualizer(algorithmType, generateSteps);

  const configs = useVisualizerConfig(algorithmType.toLowerCase());

  // Render the appropriate data structure display (Stack for DFS, Queue for BFS)
  const renderDataStructure = () => {
    if (algorithmType === "DFS") {
      return <StackDisplay stack={currentStepData.stack} />;
    } else if (algorithmType === "BFS") {
      return <QueueDisplay queue={currentStepData.queue} />;
    }
    // For custom algorithms, use the provided display component
    return displayComponent ? displayComponent(currentStepData) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <Title title={configs.title} description={configs.description} />

        {/* Enhanced Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          resetAnimation={resetAnimation}
          generateNewGraph={generateNewGraph}
          toggleCode={toggleCode}
          toggleInfo={toggleInfo}
          showCode={showCode}
          showInfo={showInfo}
          startNode={startNode}
          handleStartNodeChange={handleStartNodeChange}
          graph={graph}
          speed={speed}
          handleSpeedChange={handleSpeedChange}
          currentStep={currentStep}
          totalSteps={totalSteps}
          algorithmInfo={algorithmInfo}
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
              <CodeDisplay
                key="code"
                code={code}
                title={`${algorithmType} Implementation`}
              />
            ) : (
              // Graph Visualization
              <GraphVisualization
                graph={graph}
                nodePositions={nodePositions}
                getNodeColor={getNodeColor}
                currentStepData={currentStepData}
              >
                {/* Data Structure and Visited Status */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderDataStructure()}
                  <VisitedDisplay visited={currentStepData.visited} />
                </div>

                {/* Legend */}
                <Legend legendItems={configs.legendItems} />
              </GraphVisualization>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section - Steps Info or Algorithm Info */}
        <AnimatePresence mode="wait">
          {showInfo ? (
            <AlgorithmInfo
              key="algorithm-info"
              algorithmData={configs.algorithmInfo}
            />
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

export default GraphTraversalVisualizer;
