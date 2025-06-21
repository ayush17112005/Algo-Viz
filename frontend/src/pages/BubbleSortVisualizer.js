// import React, { useState, useEffect } from "react";
// import { Play, Pause, RotateCcw, Code2, Info } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BubbleSort } from "../animations/SortingAlgo/BubbleSort";
// import { bubbleSortCode } from "../algorithms/BubbleSort";
// import useSortingAnimation from "../hooks/useSortingAnimations";

// const BubbleSortVisualizer = () => {
//   const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
//   const [steps, setSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState(1000);
//   const [showCode, setShowCode] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);
//   const currentStepData = steps[currentStep] || {
//     array: array,
//     comparing: [],
//     swapping: [],
//     sorted: [],
//     description: "Click 'Generate New Array' or 'Start Sorting' to begin",
//   };

//   //Whenver we change the array restart
//   useEffect(() => {
//     if (steps.length > 0) {
//       setSteps(BubbleSort.generateSteps(array));
//       setCurrentStep(0);
//     }
//   }, [array]);

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

//   const generateNewArray = () => {
//     const newArray = Array.from(
//       { length: 7 },
//       () => Math.floor(Math.random() * 99) + 1
//     );
//     setArray(newArray);
//     setSteps([]);
//     setCurrentStep(0);
//     setIsPlaying(false);
//   };

//   const startSorting = () => {
//     if (steps.length === 0) {
//       const newSteps = BubbleSort.generateSteps(array);
//       setSteps(newSteps);
//       setCurrentStep(0);
//     }
//     setIsPlaying(true);
//   };

//   //When we press reset button
//   const resetAnimation = () => {
//     setCurrentStep(0);
//     setIsPlaying(false);
//   };

//   const getBarColor = (index) => {
//     if (currentStepData.sorted.includes(index)) return "bg-green-500";
//     if (currentStepData.swapping.includes(index)) return "bg-red-500";
//     if (currentStepData.comparing.includes(index)) return "bg-yellow-500";
//     return "bg-blue-500";
//   };

//   const getBarHeight = (value) => {
//     const maxValue = Math.max(...currentStepData.array);
//     return (value / maxValue) * 350;
//   };

//   const toggleCode = () => {
//     setShowCode(!showCode);
//     if (showInfo) {
//       setShowInfo(false);
//     }
//   };

//   const toggleInfo = () => {
//     setShowInfo(!showInfo);
//     if (showCode) {
//       setShowCode(false);
//     }
//     if (!showInfo) {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth",
//       });
//     }
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
//               Bubble Sort Visualizer
//             </span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-600"
//           >
//             Watch how bubble sort algorithm works step by step
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
//                 onClick={isPlaying ? () => setIsPlaying(false) : startSorting}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
//               >
//                 {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 {isPlaying ? "Pause" : "Start Sorting"}
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
//                 onClick={generateNewArray}
//                 className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
//               >
//                 Generate New Array
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

//         {/* Main Visualization Area - Full Width */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-xl shadow-lg p-8 mb-8"
//         >
//           <AnimatePresence mode="wait">
//             {showCode ? (
//               // Code Display - Full Screen
//               <motion.div
//                 key="code"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="w-full"
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                   <Code2 className="text-green-600" size={28} />
//                   Bubble Sort Implementation
//                 </h3>
//                 <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
//                   <pre className="text-green-400 text-sm leading-relaxed">
//                     <code>{bubbleSortCode}</code>
//                   </pre>
//                 </div>
//               </motion.div>
//             ) : (
//               // Array Visualization
//               <motion.div
//                 key="visualization"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
//                   Array Visualization
//                 </h3>

//                 <div
//                   className="flex items-end justify-center gap-4 mb-8"
//                   style={{ height: "400px" }}
//                 >
//                   <AnimatePresence>
//                     {currentStepData.array.map((value, index) => (
//                       <motion.div
//                         key={`${index}-${value}`}
//                         initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
//                         animate={{
//                           opacity: 1,
//                           scale: 1,
//                           rotateY: 0,
//                           height: getBarHeight(value),
//                           backgroundColor:
//                             getBarColor(index) === "bg-green-500"
//                               ? "#10b981"
//                               : getBarColor(index) === "bg-red-500"
//                               ? "#ef4444"
//                               : getBarColor(index) === "bg-yellow-500"
//                               ? "#f59e0b"
//                               : "#3b82f6",
//                         }}
//                         whileHover={{
//                           scale: 1.1,
//                           rotateY: 10,
//                           boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//                         }}
//                         transition={{
//                           duration: 0.4,
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 25,
//                         }}
//                         className="w-16 rounded-t-xl flex items-end justify-center relative shadow-lg cursor-pointer"
//                         style={{
//                           height: getBarHeight(value),
//                           transformStyle: "preserve-3d",
//                         }}
//                       >
//                         <span className="text-white font-bold text-lg mb-4 drop-shadow-lg">
//                           {value}
//                         </span>
//                         <span className="absolute -bottom-8 text-sm text-gray-500 font-medium">
//                           [{index}]
//                         </span>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </div>

//                 {/* Legend */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex items-center justify-center gap-8 text-sm"
//                 >
//                   {[
//                     { color: "bg-blue-500", label: "Unsorted" },
//                     { color: "bg-yellow-500", label: "Comparing" },
//                     { color: "bg-red-500", label: "Swapping" },
//                     { color: "bg-green-500", label: "Sorted" },
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
//                         className={`w-5 h-5 ${item.color} rounded-md shadow-md`}
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
//                     value: "O(n²)",
//                     description: "Worst and average case",
//                     color: "bg-red-100 text-red-800",
//                   },
//                   {
//                     label: "Space Complexity",
//                     value: "O(1)",
//                     description: "Constant extra space",
//                     color: "bg-green-100 text-green-800",
//                   },
//                   {
//                     label: "Stability",
//                     value: "Stable",
//                     description: "Maintains relative order",
//                     color: "bg-blue-100 text-blue-800",
//                   },
//                   {
//                     label: "In-Place",
//                     value: "Yes",
//                     description: "Sorts without extra array",
//                     color: "bg-purple-100 text-purple-800",
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

import useSortingAnimation from "../hooks/useSortingAnimations";
import { BubbleSort } from "../animations/SortingAlgo/BubbleSort";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";
import { bubbleSortCode } from "../algorithms/BubbleSort";
const BubbleSortVisualizer = () => {
  const sortingHook = useSortingAnimation(BubbleSort);

  return (
    <SortingVisualizer
      algorithmType="bubble"
      sortingHook={sortingHook}
      algorithmCode={bubbleSortCode}
    />
  );
};

export default BubbleSortVisualizer;
