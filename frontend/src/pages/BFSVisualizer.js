// import React, { useState, useEffect, useContext } from "react";
// import { Play, Pause, RotateCcw, Code2, Info } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { generateBFSSteps } from "../animations/Graph/BFS";
// import { AppContext } from "../context/AppContext";
// import { bfsCode } from "../algorithms/BFS";
// const BFSVisualizer = () => {
//   // Graph representation - adjacency list
//   const defaultGraph = {
//     0: [1, 2],
//     1: [0, 3, 4],
//     2: [0, 5, 6],
//     3: [1],
//     4: [1, 7],
//     5: [2],
//     6: [2, 8],
//     7: [4],
//     8: [6],
//   };

//   const [graph, setGraph] = useState(defaultGraph);
//   const [steps, setSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState(1000);
//   const [startNode, setStartNode] = useState(0);

//   const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);

//   const currentStepData = steps[currentStep] || {
//     visited: [],
//     queue: [],
//     currentNode: null,
//     exploring: [],
//     description: "Click 'Start BFS' to begin traversal",
//   };

//   useEffect(() => {
//     let interval;
//     if (isPlaying && currentStep < steps.length - 1) {
//       interval = setInterval(() => {
//         setCurrentStep((prev) => prev + 1);
//       }, speed);
//     } else if (currentStep >= steps.length - 1) {
//       setIsPlaying(false);
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying, currentStep, steps.length, speed]);

//   const generateNewGraph = () => {
//     // Generate a simple connected graph
//     const nodes = 9;
//     const newGraph = {};

//     // Initialize empty adjacency lists
//     for (let i = 0; i < nodes; i++) {
//       newGraph[i] = [];
//     }

//     // Add some random edges to create a connected graph
//     const edges = [
//       [0, 1],
//       [0, 2],
//       [1, 3],
//       [1, 4],
//       [2, 5],
//       [2, 6],
//       [4, 7],
//       [6, 8],
//     ];

//     // Add some random additional edges
//     for (let i = 0; i < 3; i++) {
//       const from = Math.floor(Math.random() * nodes);
//       const to = Math.floor(Math.random() * nodes);
//       if (from !== to && !newGraph[from].includes(to)) {
//         edges.push([from, to]);
//       }
//     }

//     // Build adjacency list
//     edges.forEach(([from, to]) => {
//       newGraph[from].push(to);
//       newGraph[to].push(from);
//     });

//     setGraph(newGraph);
//     setSteps([]);
//     setCurrentStep(0);
//     setIsPlaying(false);
//   };

//   const startBFS = () => {
//     const newSteps = generateBFSSteps(graph, startNode);
//     setSteps(newSteps);
//     setCurrentStep(0);
//     setIsPlaying(true);
//   };

//   const resetAnimation = () => {
//     setCurrentStep(0);
//     setIsPlaying(false);
//   };

//   const getNodeColor = (nodeId) => {
//     if (currentStepData.currentNode === nodeId) return "#ef4444"; // red - current
//     if (currentStepData.visited.includes(nodeId)) return "#10b981"; // green - visited
//     if (currentStepData.exploring.includes(nodeId)) return "#f59e0b"; // yellow - exploring
//     return "#3b82f6"; // blue - unvisited
//   };

//   // Node positions for visualization (arranged in a tree-like structure)
//   const nodePositions = {
//     0: { x: 250, y: 50 },
//     1: { x: 150, y: 150 },
//     2: { x: 350, y: 150 },
//     3: { x: 100, y: 250 },
//     4: { x: 200, y: 250 },
//     5: { x: 300, y: 250 },
//     6: { x: 400, y: 250 },
//     7: { x: 150, y: 350 },
//     8: { x: 450, y: 350 },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <motion.h1
//             className="text-4xl font-bold text-gray-900 mb-2"
//             whileHover={{ scale: 1.05 }}
//           >
//             <span className="inline-flex items-center gap-3">
//               <Code2 className="text-green-600" size={36} />
//               BFS Algorithm Visualizer
//             </span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-600"
//           >
//             Watch how Breadth-First Search algorithm explores a graph level by
//             level
//           </motion.p>
//         </motion.div>

//         {/* Enhanced Control Panel */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={isPlaying ? () => setIsPlaying(false) : startBFS}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
//               >
//                 {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 {isPlaying ? "Pause" : "Start BFS"}
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={resetAnimation}
//                 className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md"
//               >
//                 <RotateCcw size={18} />
//                 Reset
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={generateNewGraph}
//                 className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
//               >
//                 Generate New Graph
//               </motion.button>

//               {/* Show Code Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={toggleCode}
//                 className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
//                   showCode
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
//                 }`}
//               >
//                 <Code2 size={18} />
//                 {showCode ? "Hide Code" : "Show Code"}
//               </motion.button>

//               {/* Algorithm Info Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={toggleInfo}
//                 className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
//                   showInfo
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
//                 }`}
//               >
//                 <Info size={18} />
//                 {showInfo ? "Hide Info" : "Algorithm Info"}
//               </motion.button>
//             </div>

//             <div className="flex items-center gap-6">
//               <motion.div
//                 className="flex items-center gap-3"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   Start Node:
//                 </span>
//                 <select
//                   value={startNode}
//                   onChange={(e) => setStartNode(Number(e.target.value))}
//                   className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                 >
//                   {Object.keys(graph).map((node) => (
//                     <option key={node} value={node}>
//                       {node}
//                     </option>
//                   ))}
//                 </select>
//               </motion.div>

//               <motion.div
//                 className="flex items-center gap-3"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   Speed:
//                 </span>
//                 <input
//                   type="range"
//                   min="100"
//                   max="2000"
//                   value={speed}
//                   onChange={(e) => setSpeed(Number(e.target.value))}
//                   className="w-24 accent-green-600"
//                 />
//                 <span className="text-sm text-gray-600 min-w-[60px]">
//                   {speed}ms
//                 </span>
//               </motion.div>

//               <motion.div
//                 className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Step: {currentStep + 1} / {steps.length || 1}
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Visualization Area */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-xl shadow-lg p-8 mb-8"
//         >
//           <AnimatePresence mode="wait">
//             {showCode ? (
//               // Code Display
//               <motion.div
//                 key="code"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="w-full"
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                   <Code2 className="text-green-600" size={28} />
//                   BFS Implementation
//                 </h3>
//                 <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
//                   <pre className="text-green-400 text-sm leading-relaxed">
//                     <code>{bfsCode}</code>
//                   </pre>
//                 </div>
//               </motion.div>
//             ) : (
//               // Graph Visualization
//               <motion.div
//                 key="visualization"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
//                   Graph Visualization
//                 </h3>

//                 <div
//                   className="relative bg-gray-50 rounded-xl p-8"
//                   style={{ height: "450px" }}
//                 >
//                   {/* Draw edges */}
//                   <svg className="absolute inset-0 w-full h-full">
//                     {Object.entries(graph).map(([nodeId, neighbors]) =>
//                       neighbors.map((neighborId) => {
//                         const from = nodePositions[nodeId];
//                         const to = nodePositions[neighborId];
//                         if (from && to && nodeId < neighborId) {
//                           // Draw each edge only once
//                           return (
//                             <line
//                               key={`${nodeId}-${neighborId}`}
//                               x1={from.x}
//                               y1={from.y}
//                               x2={to.x}
//                               y2={to.y}
//                               stroke="#d1d5db"
//                               strokeWidth="2"
//                             />
//                           );
//                         }
//                         return null;
//                       })
//                     )}
//                   </svg>

//                   {/* Draw nodes */}
//                   {Object.keys(graph).map((nodeId) => {
//                     const position = nodePositions[nodeId];
//                     if (!position) return null;

//                     return (
//                       <motion.div
//                         key={nodeId}
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{
//                           opacity: 1,
//                           scale: 1,
//                           backgroundColor: getNodeColor(parseInt(nodeId)),
//                         }}
//                         whileHover={{ scale: 1.2 }}
//                         className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer"
//                         style={{
//                           left: position.x - 24,
//                           top: position.y - 24,
//                           backgroundColor: getNodeColor(parseInt(nodeId)),
//                         }}
//                       >
//                         {nodeId}
//                         {currentStepData.currentNode === parseInt(nodeId) && (
//                           <motion.div
//                             className="absolute inset-0 rounded-full border-4 border-yellow-400"
//                             animate={{ scale: [1, 1.3, 1] }}
//                             transition={{ duration: 1, repeat: Infinity }}
//                           />
//                         )}
//                       </motion.div>
//                     );
//                   })}
//                 </div>

//                 {/* Queue and Status */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="bg-gray-50 p-6 rounded-xl"
//                   >
//                     <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       Queue
//                       <span className="text-sm text-gray-500 font-normal">
//                         (FIFO - First In First Out)
//                       </span>
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {currentStepData.queue.length > 0 ? (
//                         currentStepData.queue.map((node, index) => (
//                           <motion.div
//                             key={`${node}-${index}`}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             className="bg-blue-500 text-white px-3 py-2 rounded-lg font-medium relative"
//                           >
//                             {node}
//                             {index === 0 && (
//                               <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                 F
//                               </div>
//                             )}
//                             {index === currentStepData.queue.length - 1 &&
//                               currentStepData.queue.length > 1 && (
//                                 <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                   R
//                                 </div>
//                               )}
//                           </motion.div>
//                         ))
//                       ) : (
//                         <span className="text-gray-500">Empty</span>
//                       )}
//                     </div>
//                     {currentStepData.queue.length > 0 && (
//                       <div className="mt-2 text-xs text-gray-500">
//                         F = Front (dequeue), R = Rear (enqueue)
//                       </div>
//                     )}
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="bg-gray-50 p-6 rounded-xl"
//                   >
//                     <h4 className="text-lg font-semibold text-gray-900 mb-4">
//                       Visited Nodes
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {currentStepData.visited.length > 0 ? (
//                         currentStepData.visited.map((node, index) => (
//                           <motion.div
//                             key={`visited-${node}-${index}`}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             className="bg-green-500 text-white px-3 py-2 rounded-lg font-medium"
//                           >
//                             {node}
//                           </motion.div>
//                         ))
//                       ) : (
//                         <span className="text-gray-500">None</span>
//                       )}
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Legend */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex items-center justify-center gap-8 text-sm mt-6"
//                 >
//                   {[
//                     { color: "bg-blue-500", label: "Unvisited" },
//                     { color: "bg-yellow-500", label: "Exploring" },
//                     { color: "bg-red-500", label: "Current" },
//                     { color: "bg-green-500", label: "Visited" },
//                   ].map((item, index) => (
//                     <motion.div
//                       key={item.label}
//                       className="flex items-center gap-2"
//                       whileHover={{ scale: 1.1 }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 + index * 0.1 }}
//                     >
//                       <div
//                         className={`w-5 h-5 ${item.color} rounded-full shadow-md`}
//                       ></div>
//                       <span className="font-medium">{item.label}</span>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Bottom Section - Steps Info or Algorithm Info */}
//         <AnimatePresence mode="wait">
//           {showInfo ? (
//             <motion.div
//               key="algorithm-info"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white rounded-xl shadow-lg p-8"
//             >
//               <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                 <Info className="text-blue-600" size={28} />
//                 Algorithm Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {[
//                   {
//                     label: "Time Complexity",
//                     value: "O(V + E)",
//                     description: "V vertices, E edges",
//                     color: "bg-green-100 text-green-800",
//                   },
//                   {
//                     label: "Space Complexity",
//                     value: "O(V)",
//                     description: "Queue and visited set",
//                     color: "bg-blue-100 text-blue-800",
//                   },
//                   {
//                     label: "Data Structure",
//                     value: "Queue",
//                     description: "FIFO - First In First Out",
//                     color: "bg-purple-100 text-purple-800",
//                   },
//                   {
//                     label: "Exploration",
//                     value: "Level-wise",
//                     description: "Visits nodes level by level",
//                     color: "bg-orange-100 text-orange-800",
//                   },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={item.label}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
//                   >
//                     <div
//                       className={`inline-block ${item.color} px-3 py-1 rounded-full text-sm font-semibold mb-3`}
//                     >
//                       {item.value}
//                     </div>
//                     <h4 className="font-semibold text-gray-900 mb-2">
//                       {item.label}
//                     </h4>
//                     <p className="text-gray-600 text-sm">{item.description}</p>
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="mt-8 bg-blue-50 p-6 rounded-xl">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">
//                   Key Differences from DFS
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div className="bg-white p-4 rounded-lg">
//                     <div className="font-semibold text-blue-600 mb-2">
//                       BFS (Queue)
//                     </div>
//                     <ul className="text-gray-600 space-y-1">
//                       <li>• Uses FIFO (First In, First Out)</li>
//                       <li>• Explores level by level</li>
//                       <li>• Finds shortest path in unweighted graphs</li>
//                       <li>• Better for finding closest nodes</li>
//                     </ul>
//                   </div>
//                   <div className="bg-white p-4 rounded-lg">
//                     <div className="font-semibold text-green-600 mb-2">
//                       DFS (Stack)
//                     </div>
//                     <ul className="text-gray-600 space-y-1">
//                       <li>• Uses LIFO (Last In, First Out)</li>
//                       <li>• Explores depth first</li>
//                       <li>• Goes as deep as possible first</li>
//                       <li>• Better for exploring all paths</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             !showCode && (
//               <motion.div
//                 key="current-step"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="bg-white rounded-xl shadow-lg p-8"
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                     className="w-3 h-3 bg-green-500 rounded-full"
//                   />
//                   Current Step
//                 </h3>
//                 <motion.p
//                   key={currentStep}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-gray-700 text-lg leading-relaxed"
//                 >
//                   {currentStepData.description}
//                 </motion.p>
//               </motion.div>
//             )
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default BFSVisualizer;

// import React from "react";
// import { ControlPanel } from "../components/DFS_BFS_Components/ContorlPanel";
// import { motion, AnimatePresence } from "framer-motion";
// import { generateBFSSteps } from "../animations/Graph/BFS";
// import { bfsCode } from "../algorithms/BFS";
// import useGraphVisualizer from "../hooks/useGraphAnimation";
// import { AlgorithmHeader } from "../components/DFS_BFS_Components/AlgorithmicHeader";
// import { CodeDisplay } from "../components/SortingComponents/CodeDisplay";
// import { GraphVisualization } from "../components/DFS_BFS_Components/GraphVisualization";
// import { QueueDisplay } from "../components/DFS_BFS_Components/QueueDisplay";
// import { VisitedDisplay } from "../components/DFS_BFS_Components/VisitedDisplay";
// import { AlgorithmInfo } from "../components/SortingComponents/AlogrithmInfo";
// import { CurrentStep } from "../components/DFS_BFS_Components/CurrentStep";
// import { useSortingVisualizerConfig } from "../hooks/useSortingVisualizerConfig";
// import { ArrayLegend } from "../components/SortingComponents/ArrayLegend";

// const BFSVisualizer = () => {
//   const {
//     // State
//     graph,
//     currentStep,
//     isPlaying,
//     speed,
//     startNode,
//     currentStepData,

//     // Context
//     showCode,
//     showInfo,
//     toggleCode,
//     toggleInfo,

//     // Actions
//     generateNewGraph,
//     resetAnimation,
//     handlePlayPause,
//     handleSpeedChange,
//     handleStartNodeChange,

//     // Utilities
//     getNodeColor,
//     nodePositions,

//     // Computed values
//     algorithmInfo,
//     totalSteps,
//   } = useGraphVisualizer("BFS", generateBFSSteps);
//   const configs = useSortingVisualizerConfig("bfs");
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Title */}
//         <AlgorithmHeader algorithmInfo={algorithmInfo} />

//         {/* Enhanced Control Panel */}
//         <ControlPanel
//           isPlaying={isPlaying}
//           handlePlayPause={handlePlayPause}
//           resetAnimation={resetAnimation}
//           generateNewGraph={generateNewGraph}
//           toggleCode={toggleCode}
//           toggleInfo={toggleInfo}
//           showCode={showCode}
//           showInfo={showInfo}
//           startNode={startNode}
//           handleStartNodeChange={handleStartNodeChange}
//           graph={graph}
//           speed={speed}
//           handleSpeedChange={handleSpeedChange}
//           currentStep={currentStep}
//           totalSteps={totalSteps}
//           algorithmInfo={algorithmInfo}
//         />

//         {/* Main Visualization Area */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-xl shadow-lg p-8 mb-8"
//         >
//           <AnimatePresence mode="wait">
//             {showCode ? (
//               // Code Display
//               <CodeDisplay
//                 key="code"
//                 code={bfsCode}
//                 title="BFS Implementation"
//               />
//             ) : (
//               // Graph Visualization
//               <GraphVisualization
//                 graph={graph}
//                 nodePositions={nodePositions}
//                 getNodeColor={getNodeColor}
//                 currentStepData={currentStepData}
//               >
//                 {/* Queue and Visited Status */}
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <QueueDisplay queue={currentStepData.queue} />
//                   <VisitedDisplay visited={currentStepData.visited} />
//                 </div>

//                 {/* Legend */}
//                 <ArrayLegend legendItems={configs.legendItems} />
//               </GraphVisualization>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Bottom Section - Steps Info or Algorithm Info */}
//         <AnimatePresence mode="wait">
//           {showInfo ? (
//             <AlgorithmInfo
//               key="algorithm-info"
//               algorithmData={configs.algorithmInfo}
//             />
//           ) : (
//             !showCode && <CurrentStep currentStepData={currentStepData} />
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default BFSVisualizer;

import React from "react";
import GraphTraversalVisualizer from "../components/DFS_BFS_Components/GraphTraversal";
import { generateBFSSteps } from "../animations/Graph/BFS";
import { bfsCode } from "../algorithms/BFS";

const BFSVisualizer = () => (
  <GraphTraversalVisualizer
    algorithmType="BFS"
    generateSteps={generateBFSSteps}
    code={bfsCode}
  />
);

export default BFSVisualizer;
