import React, { useContext } from "react";
import { useSortingVisualizerConfig } from "../../hooks/useSortingVisualizerConfig";
import { AppContext } from "../../context/AppContext";
import { createColorGetter } from "../../utils/colorUtils";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { ControlPanel } from "./ControlPanel";
import { ArrayVisualization } from "./ArrayVisualization";
import { CodeDisplay } from "./CodeDisplay";
import { CurrentStep } from "./CurrentStep";
import { AlgorithmInfo } from "./AlogrithmInfo";
import { ArrayLegend } from "./ArrayLegend";
import { ArrayBar } from "./ArrayBar";

export const SortingVisualizer = ({
  algorithmType,
  sortingHook,
  algorithmCode,
  customColorGetter,
}) => {
  const configs = useSortingVisualizerConfig(algorithmType);
  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);
  const {
    totalSteps,
    currentStepData,
    isPlaying,
    speed,
    currentStep,
    setSpeed,
    generateNewArray,
    startSorting,
    pauseSorting,
    resetAnimation,
  } = sortingHook;

  // Create a default color getter
  const defaultColorGetter = createColorGetter();

  const handleGetBarColor = (index) => {
    const state = currentStepData.state || {};

    // Use customColorGetter if provided, otherwise use default
    if (customColorGetter) {
      return customColorGetter(index, state);
    }
    return defaultColorGetter(index, state);
  };

  // Helper function for Merge Sort visualization
  const renderMergeSortSpecifics = () => {
    const getBarHeight = (value, isAuxiliary = false) => {
      const maxValue = Math.max(...currentStepData.array);
      const height = (value / maxValue) * (isAuxiliary ? 150 : 300);
      return Math.max(height, 20);
    };

    return (
      <>
        {/* Range Indicators */}
        {currentStepData.state?.leftRange && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="flex justify-center mb-2 mt-4"
          >
            <div
              className="h-1 bg-red-400 rounded-full relative"
              style={{
                width: `${Math.min(
                  (currentStepData.state.leftRange.end -
                    currentStepData.state.leftRange.start +
                    1) *
                    68,
                  400
                )}px`,
                maxWidth: "400px",
              }}
            >
              <span className="absolute -top-6 left-0 text-xs font-medium text-red-600">
                Left: [{currentStepData.state.leftRange.start} -{" "}
                {currentStepData.state.leftRange.end}]
              </span>
            </div>
          </motion.div>
        )}

        {currentStepData.state?.rightRange && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="flex justify-center mb-4"
          >
            <div
              className="h-1 bg-blue-400 rounded-full relative"
              style={{
                width: `${Math.min(
                  (currentStepData.state.rightRange.end -
                    currentStepData.state.rightRange.start +
                    1) *
                    68,
                  400
                )}px`,
                maxWidth: "400px",
              }}
            >
              <span className="absolute -top-6 left-0 text-xs font-medium text-blue-600">
                Right: [{currentStepData.state.rightRange.start} -{" "}
                {currentStepData.state.rightRange.end}]
              </span>
            </div>
          </motion.div>
        )}

        {/* Auxiliary Array */}
        <AnimatePresence>
          {currentStepData.state?.auxiliaryArray?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-8 border-t-2 border-gray-200 pt-6"
            >
              <h4 className="text-lg font-medium text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                Auxiliary Array (Temporary Storage)
              </h4>
              <div
                className="flex items-end justify-center gap-3 px-4"
                style={{ height: "200px", minHeight: "200px" }}
              >
                {currentStepData.state.auxiliaryArray.map((value, index) => {
                  if (value === undefined) return null;
                  const auxBarHeight = Math.max(getBarHeight(value, true), 40);
                  return (
                    <ArrayBar
                      key={`aux-${index}-${value}`}
                      value={value}
                      index={index}
                      height={auxBarHeight}
                      color="bg-yellow-500"
                      widthClass="w-10"
                      minHeight={40}
                      fontSize="text-sm"
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="inline-flex items-center gap-3">
              <Code2 className="text-green-600" size={36} />
              {configs.title}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            {configs.description}
          </motion.p>
        </motion.div>

        {/* Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          speed={speed}
          currentStep={currentStep}
          totalSteps={totalSteps}
          showCode={showCode}
          showInfo={showInfo}
          onPlayPause={isPlaying ? pauseSorting : startSorting}
          onReset={resetAnimation}
          onGenerateArray={generateNewArray}
          onToggleCode={toggleCode}
          onToggleInfo={toggleInfo}
          onSpeedChange={setSpeed}
        />

        {/* Main Visualization Area - Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <AnimatePresence mode="wait">
            {showCode ? (
              // Code Display - Full Screen
              <CodeDisplay
                key="code"
                code={algorithmCode}
                title={configs.codeTitle}
              />
            ) : (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Array Visualization
                </h3>

                {/* Main Array Visualization */}
                <ArrayVisualization
                  currentStepData={currentStepData}
                  getBarColor={handleGetBarColor}
                  height={350}
                  minBarHeight={60}
                />

                {/* Merge Sort Specific Visualization */}
                {algorithmType === "merge" && renderMergeSortSpecifics()}

                {/* Legend */}
                <ArrayLegend legendItems={configs.legendItems} />
              </div>
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
          ) : !showCode ? (
            <CurrentStep
              key="current-step"
              currentStep={currentStep}
              currentStepData={currentStepData}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
