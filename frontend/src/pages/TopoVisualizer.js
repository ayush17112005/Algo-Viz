import React, { useState, useEffect, useContext } from "react";
import { Play, Pause, RotateCcw, Code2, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateTopologicalSteps } from "../animations/Graph/Topo";
import { AppContext } from "../context/AppContext";
const TopologicalSortVisualizer = () => {
  // Directed Acyclic Graph (DAG) representation - adjacency list
  const defaultGraph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [5],
    4: [5],
    5: [],
    6: [0, 4],
    7: [6, 1],
  };

  const [graph, setGraph] = useState(defaultGraph);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);

  const currentStepData = steps[currentStep] || {
    queue: [],
    result: [],
    inDegree: {},
    currentNode: null,
    processing: [],
    description: "Click 'Start Topological Sort' to begin sorting",
  };

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

  const generateNewGraph = () => {
    // Generate a simple DAG
    const nodes = 8;
    const newGraph = {};

    // Initialize empty adjacency lists
    for (let i = 0; i < nodes; i++) {
      newGraph[i] = [];
    }

    // Add edges that maintain DAG property (from lower to higher numbered nodes mostly)
    const possibleEdges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [6, 0],
      [6, 4],
      [7, 6],
      [7, 1],
      [1, 4],
      [0, 3],
    ];

    // Randomly select some edges to create variety
    const selectedEdges = possibleEdges.filter(() => Math.random() > 0.4);

    selectedEdges.forEach(([from, to]) => {
      if (!newGraph[from].includes(to)) {
        newGraph[from].push(to);
      }
    });

    setGraph(newGraph);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const startTopologicalSort = () => {
    const newSteps = generateTopologicalSteps(graph);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getNodeColor = (nodeId) => {
    if (currentStepData.currentNode === nodeId) return "#ef4444"; // red - current
    if (currentStepData.result.includes(nodeId)) return "#10b981"; // green - processed
    if (currentStepData.processing.includes(nodeId)) return "#f59e0b"; // yellow - processing
    if (currentStepData.queue.includes(nodeId)) return "#8b5cf6"; // purple - in queue
    return "#3b82f6"; // blue - unprocessed
  };

  // Node positions for visualization (arranged in layers)
  const nodePositions = {
    0: { x: 200, y: 120 },
    1: { x: 400, y: 120 },
    2: { x: 200, y: 220 },
    3: { x: 400, y: 220 },
    4: { x: 600, y: 220 },
    5: { x: 500, y: 320 },
    6: { x: 100, y: 50 },
    7: { x: 300, y: 50 },
  };

  const topologicalSortCode = `function topologicalSort(graph) {
    const inDegree = {};
    const queue = [];
    const result = [];
    
    // Initialize in-degree count
    Object.keys(graph).forEach(node => {
        inDegree[node] = 0;
    });
    
    // Calculate in-degree for each node
    Object.entries(graph).forEach(([node, neighbors]) => {
        neighbors.forEach(neighbor => {
            inDegree[neighbor]++;
        });
    });
    
    // Add all nodes with in-degree 0 to queue
    Object.keys(inDegree).forEach(node => {
        if (inDegree[node] === 0) {
            queue.push(parseInt(node));
        }
    });
    
    // Process nodes
    while (queue.length > 0) {
        const currentNode = queue.shift();
        result.push(currentNode);
        
        // Reduce in-degree of neighbors
        const neighbors = graph[currentNode] || [];
        neighbors.forEach(neighbor => {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        });
    }
    
    // Check if topological sort is possible
    if (result.length !== Object.keys(graph).length) {
        throw new Error("Graph contains a cycle!");
    }
    
    return result;
}`;

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
              Topological Sort Visualizer
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Watch how Topological Sort algorithm orders a Directed Acyclic Graph
            (DAG) step by step
          </motion.p>
        </motion.div>

        {/* Enhanced Control Panel */}
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
                onClick={
                  isPlaying ? () => setIsPlaying(false) : startTopologicalSort
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? "Pause" : "Start Topological Sort"}
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
                Generate New DAG
              </motion.button>

              {/* Show Code Button */}
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

              {/* Algorithm Info Button */}
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
                  Speed:
                </span>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
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
                Step: {currentStep + 1} / {steps.length || 1}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <AnimatePresence mode="wait">
            {showCode ? (
              // Code Display
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <Code2 className="text-green-600" size={28} />
                  Topological Sort Implementation (Kahn's Algorithm)
                </h3>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm leading-relaxed">
                    <code>{topologicalSortCode}</code>
                  </pre>
                </div>
              </motion.div>
            ) : (
              // Graph Visualization
              <motion.div
                key="visualization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Directed Acyclic Graph (DAG) Visualization
                </h3>

                <div
                  className="relative bg-gray-50 rounded-xl p-8"
                  style={{ height: "400px" }}
                >
                  {/* Draw edges with arrows */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>
                    {Object.entries(graph).map(([nodeId, neighbors]) =>
                      neighbors.map((neighborId) => {
                        const from = nodePositions[nodeId];
                        const to = nodePositions[neighborId];
                        if (from && to) {
                          // Calculate arrow position
                          const dx = to.x - from.x;
                          const dy = to.y - from.y;
                          const length = Math.sqrt(dx * dx + dy * dy);
                          const unitX = dx / length;
                          const unitY = dy / length;

                          // Adjust start and end points to not overlap with nodes
                          const startX = from.x + unitX * 24;
                          const startY = from.y + unitY * 24;
                          const endX = to.x - unitX * 24;
                          const endY = to.y - unitY * 24;

                          return (
                            <line
                              key={`${nodeId}-${neighborId}`}
                              x1={startX}
                              y1={startY}
                              x2={endX}
                              y2={endY}
                              stroke="#6b7280"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                            />
                          );
                        }
                        return null;
                      })
                    )}
                  </svg>

                  {/* Draw nodes */}
                  {Object.keys(graph).map((nodeId) => {
                    const position = nodePositions[nodeId];
                    if (!position) return null;

                    return (
                      <motion.div
                        key={nodeId}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          backgroundColor: getNodeColor(parseInt(nodeId)),
                        }}
                        whileHover={{ scale: 1.2 }}
                        className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer"
                        style={{
                          left: position.x - 24,
                          top: position.y - 24,
                          backgroundColor: getNodeColor(parseInt(nodeId)),
                        }}
                      >
                        {nodeId}
                        {currentStepData.currentNode === parseInt(nodeId) && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-yellow-400"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                        {/* Show in-degree */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          in: {currentStepData.inDegree[parseInt(nodeId)] || 0}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Queue, Result, and In-degrees */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Queue (In-degree = 0)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStepData.queue.length > 0 ? (
                        currentStepData.queue.map((node, index) => (
                          <motion.div
                            key={`queue-${node}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-purple-500 text-white px-3 py-2 rounded-lg font-medium"
                          >
                            {node}
                          </motion.div>
                        ))
                      ) : (
                        <span className="text-gray-500">Empty</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Topological Order
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStepData.result.length > 0 ? (
                        currentStepData.result.map((node, index) => (
                          <motion.div
                            key={`result-${node}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium flex items-center gap-1"
                          >
                            {node}
                            {index < currentStepData.result.length - 1 && (
                              <ArrowRight size={14} />
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      In-Degrees
                    </h4>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      {Object.entries(currentStepData.inDegree).map(
                        ([node, degree]) => (
                          <div key={`degree-${node}`} className="text-center">
                            <div className="text-gray-600">Node {node}</div>
                            <div className="font-bold text-gray-900">
                              {degree}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-8 text-sm mt-6"
                >
                  {[
                    { color: "bg-blue-500", label: "Unprocessed" },
                    { color: "bg-purple-500", label: "In Queue" },
                    { color: "bg-yellow-500", label: "Processing" },
                    { color: "bg-red-500", label: "Current" },
                    { color: "bg-green-500", label: "Processed" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div
                        className={`w-5 h-5 ${item.color} rounded-full shadow-md`}
                      ></div>
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section - Steps Info or Algorithm Info */}
        <AnimatePresence mode="wait">
          {showInfo ? (
            <motion.div
              key="algorithm-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="text-blue-600" size={28} />
                Algorithm Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Time Complexity",
                    value: "O(V + E)",
                    description: "V vertices, E edges",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    label: "Space Complexity",
                    value: "O(V)",
                    description: "Queue and in-degree array",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    label: "Data Structure",
                    value: "Queue",
                    description: "FIFO - First In First Out",
                    color: "bg-purple-100 text-purple-800",
                  },
                  {
                    label: "Graph Type",
                    value: "DAG Only",
                    description: "Directed Acyclic Graph required",
                    color: "bg-orange-100 text-orange-800",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`inline-block ${item.color} px-3 py-1 rounded-full text-sm font-semibold mb-3`}
                    >
                      {item.value}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.label}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Applications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>• Task scheduling with dependencies</div>
                  <div>• Course prerequisite ordering</div>
                  <div>• Build system dependency resolution</div>
                  <div>• Symbol table construction in compilers</div>
                </div>
              </div>
            </motion.div>
          ) : (
            !showCode && (
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
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-700 text-lg leading-relaxed"
                >
                  {currentStepData.description}
                </motion.p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopologicalSortVisualizer;
