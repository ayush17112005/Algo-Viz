// import React, { useContext } from "react";
// import { Play, Pause, RotateCcw, Info, Code2, GitBranch } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MergeSort } from "../animations/SortingAlgo/MergerSort";
// import { mergeSortCode } from "../algorithms/MergeSort";
// import useSortingAnimation from "../hooks/useSortingAnimations";
// import { AppContext } from "../context/AppContext";
// import { useSortingVisualizerConfig } from "../hooks/useSortingVisualizerConfig";
// import { ControlPanel } from "../components/SortingComponents/ControlPanel";
// import { CodeDisplay } from "../components/SortingComponents/CodeDisplay";

// const MergeSortVisualizer = () => {
//   const {
//     totalSteps,
//     currentStepData,
//     isPlaying,
//     speed,
//     currentStep,
//     setSpeed,
//     generateNewArray,
//     startSorting,
//     pauseSorting,
//     resetAnimation,
//   } = useSortingAnimation(MergeSort);

//   const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);
//   const configs = useSortingVisualizerConfig("merge");
//   // Access state through the nested state property
//   const getBarColor = (index, isAuxiliary = false) => {
//     const state = currentStepData.state || {};

//     if (isAuxiliary) {
//       if (state.comparing?.includes(index)) return "bg-yellow-500";
//       return "bg-gray-400";
//     }

//     if (state.sorted?.includes(index)) return "bg-green-500";
//     if (state.placing?.includes(index)) return "bg-purple-500";
//     if (state.dividing?.includes(index)) return "bg-orange-500";
//     if (state.merging?.includes(index)) return "bg-blue-500";
//     return "bg-gray-500";
//   };

//   const getBarHeight = (value, isAuxiliary = false) => {
//     const maxValue = Math.max(...currentStepData.array);
//     const height = (value / maxValue) * (isAuxiliary ? 150 : 300);
//     return Math.max(height, 20);
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
//               <GitBranch className="text-green-600" size={36} />
//               Merge Sort Visualizer
//             </span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-600"
//           >
//             Watch how merge sort algorithm works step by step
//           </motion.p>
//         </motion.div>

//         {/* Enhanced Control Panel */}
//         <ControlPanel
//           isPlaying={isPlaying}
//           speed={speed}
//           currentStep={currentStep}
//           totalSteps={totalSteps}
//           showCode={showCode}
//           showInfo={showInfo}
//           onPlayPause={isPlaying ? pauseSorting : startSorting}
//           onReset={resetAnimation}
//           onGenerateArray={generateNewArray}
//           onToggleCode={toggleCode}
//           onToggleInfo={toggleInfo}
//           onSpeedChange={setSpeed}
//         />

//         {/* Main Visualization Area */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-xl shadow-lg p-8 mb-8"
//         >
//           <AnimatePresence mode="wait">
//             {showCode ? (
//               <CodeDisplay
//                 key="code"
//                 code={mergeSortCode}
//                 title={configs.codeTitle}
//               />
//             ) : (
//               <motion.div
//                 key="visualization"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
//                   Array Visualization
//                 </h3>

//                 {/* Main Array */}
//                 <div className="mb-8">
//                   <div
//                     className="flex items-end justify-center gap-3 mb-8 px-4"
//                     style={{ height: "320px" }}
//                   >
//                     <AnimatePresence>
//                       {currentStepData.array.map((value, index) => {
//                         const barHeight = Math.max(getBarHeight(value), 60);
//                         return (
//                           <motion.div
//                             key={`${index}-${value}`}
//                             initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
//                             animate={{
//                               opacity: 1,
//                               scale: 1,
//                               rotateY: 0,
//                               height: barHeight,
//                               backgroundColor:
//                                 getBarColor(index) === "bg-green-500"
//                                   ? "#10b981"
//                                   : getBarColor(index) === "bg-purple-500"
//                                   ? "#8b5cf6"
//                                   : getBarColor(index) === "bg-orange-500"
//                                   ? "#f97316"
//                                   : getBarColor(index) === "bg-blue-500"
//                                   ? "#3b82f6"
//                                   : getBarColor(index) === "bg-yellow-500"
//                                   ? "#f59e0b"
//                                   : "#6b7280",
//                             }}
//                             whileHover={{
//                               scale: 1.1,
//                               rotateY: 10,
//                               boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//                               zIndex: 10,
//                             }}
//                             transition={{
//                               duration: 0.4,
//                               type: "spring",
//                               stiffness: 300,
//                               damping: 25,
//                             }}
//                             className="relative w-14 rounded-t-xl flex items-center justify-center shadow-lg cursor-pointer"
//                             style={{
//                               height: barHeight,
//                               transformStyle: "preserve-3d",
//                               minHeight: "60px",
//                             }}
//                           >
//                             <span
//                               className="text-white font-bold text-base drop-shadow-lg absolute"
//                               style={{
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                                 textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
//                               }}
//                             >
//                               {value}
//                             </span>
//                             <span className="absolute -bottom-7 text-xs text-gray-500 font-medium left-1/2 transform -translate-x-1/2">
//                               [{index}]
//                             </span>
//                           </motion.div>
//                         );
//                       })}
//                     </AnimatePresence>
//                   </div>

//                   {/* Range Indicators - Access through state */}
//                   {currentStepData.state?.leftRange && (
//                     <motion.div
//                       initial={{ opacity: 0, scaleX: 0 }}
//                       animate={{ opacity: 1, scaleX: 1 }}
//                       className="flex justify-center mb-2"
//                     >
//                       <div
//                         className="h-1 bg-red-400 rounded-full relative"
//                         style={{
//                           width: `${Math.min(
//                             (currentStepData.state.leftRange.end -
//                               currentStepData.state.leftRange.start +
//                               1) *
//                               68,
//                             400
//                           )}px`,
//                           maxWidth: "400px",
//                         }}
//                       >
//                         <span className="absolute -top-6 left-0 text-xs font-medium text-red-600">
//                           Left: [{currentStepData.state.leftRange.start} -{" "}
//                           {currentStepData.state.leftRange.end}]
//                         </span>
//                       </div>
//                     </motion.div>
//                   )}

//                   {currentStepData.state?.rightRange && (
//                     <motion.div
//                       initial={{ opacity: 0, scaleX: 0 }}
//                       animate={{ opacity: 1, scaleX: 1 }}
//                       className="flex justify-center mb-4"
//                     >
//                       <div
//                         className="h-1 bg-blue-400 rounded-full relative"
//                         style={{
//                           width: `${Math.min(
//                             (currentStepData.state.rightRange.end -
//                               currentStepData.state.rightRange.start +
//                               1) *
//                               68,
//                             400
//                           )}px`,
//                           maxWidth: "400px",
//                         }}
//                       >
//                         <span className="absolute -top-6 left-0 text-xs font-medium text-blue-600">
//                           Right: [{currentStepData.state.rightRange.start} -{" "}
//                           {currentStepData.state.rightRange.end}]
//                         </span>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Auxiliary Array - Access through state */}
//                 <AnimatePresence>
//                   {currentStepData.state?.auxiliaryArray &&
//                     currentStepData.state.auxiliaryArray.length > 0 && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0, y: 20 }}
//                         animate={{ opacity: 1, height: "auto", y: 0 }}
//                         exit={{ opacity: 0, height: 0, y: -20 }}
//                         transition={{ duration: 0.5, ease: "easeInOut" }}
//                         className="mb-8 border-t-2 border-gray-200 pt-6"
//                       >
//                         <h4 className="text-lg font-medium text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
//                           Auxiliary Array (Temporary Storage)
//                         </h4>
//                         <div
//                           className="flex items-end justify-center gap-3 px-4"
//                           style={{ height: "200px", minHeight: "200px" }}
//                         >
//                           {currentStepData.state.auxiliaryArray.map(
//                             (value, index) => {
//                               if (value === undefined) return null;
//                               const auxBarHeight = Math.max(
//                                 getBarHeight(value, true),
//                                 40
//                               );
//                               return (
//                                 <motion.div
//                                   key={`aux-${index}-${value}`}
//                                   initial={{ opacity: 0, scale: 0.8, y: 20 }}
//                                   animate={{
//                                     opacity: 1,
//                                     scale: 1,
//                                     y: 0,
//                                     height: auxBarHeight,
//                                     backgroundColor: "#f59e0b",
//                                   }}
//                                   whileHover={{
//                                     scale: 1.1,
//                                     boxShadow:
//                                       "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//                                     zIndex: 10,
//                                   }}
//                                   transition={{
//                                     duration: 0.3,
//                                     type: "spring",
//                                     stiffness: 200,
//                                     damping: 20,
//                                   }}
//                                   className="relative w-10 rounded-t-xl flex items-center justify-center shadow-md cursor-pointer"
//                                   style={{
//                                     height: auxBarHeight,
//                                     minHeight: "40px",
//                                   }}
//                                 >
//                                   <span
//                                     className="text-white font-bold text-sm drop-shadow-lg absolute"
//                                     style={{
//                                       top: "50%",
//                                       left: "50%",
//                                       transform: "translate(-50%, -50%)",
//                                       textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
//                                     }}
//                                   >
//                                     {value}
//                                   </span>
//                                   <span className="absolute -bottom-6 text-xs text-gray-500 font-medium left-1/2 transform -translate-x-1/2">
//                                     [{index}]
//                                   </span>
//                                 </motion.div>
//                               );
//                             }
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Legend */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex items-center justify-center gap-8 text-sm flex-wrap"
//                 >
//                   {[
//                     { color: "bg-gray-500", label: "Unsorted" },
//                     { color: "bg-orange-500", label: "Dividing" },
//                     { color: "bg-blue-500", label: "Merging" },
//                     { color: "bg-yellow-500", label: "Comparing" },
//                     { color: "bg-purple-500", label: "Placing" },
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

//         {/* Bottom Section */}
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
//                     value: "O(n log n)",
//                     description: "Always optimal performance",
//                     color: "bg-green-100 text-green-800",
//                   },
//                   {
//                     label: "Space Complexity",
//                     value: "O(n)",
//                     description: "Requires auxiliary space",
//                     color: "bg-yellow-100 text-yellow-800",
//                   },
//                   {
//                     label: "Stability",
//                     value: "Stable",
//                     description: "Maintains relative order",
//                     color: "bg-blue-100 text-blue-800",
//                   },
//                   {
//                     label: "In-Place",
//                     value: "No",
//                     description: "Uses additional memory",
//                     color: "bg-red-100 text-red-800",
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

// export default MergeSortVisualizer;

import React from "react";
import { mergeSortCode } from "../algorithms/MergeSort";
import useSortingAnimation from "../hooks/useSortingAnimations";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";
import { MergeSort } from "../animations/SortingAlgo/MergerSort";
const MergeSortVisualizer = () => {
  const sortingHook = useSortingAnimation(MergeSort);
  const getBarColor = (index, isAuxiliary = false) => {
    const state = sortingHook.currentStepData.state || {};

    if (isAuxiliary) {
      if (state.comparing?.includes(index)) return "bg-yellow-500";
      return "bg-gray-400";
    }

    if (state.sorted?.includes(index)) return "bg-green-500";
    if (state.placing?.includes(index)) return "bg-purple-500";
    if (state.dividing?.includes(index)) return "bg-orange-500";
    if (state.merging?.includes(index)) return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <SortingVisualizer
      algorithmType="merge"
      sortingHook={sortingHook}
      algorithmCode={mergeSortCode}
      customColorGetter={getBarColor}
    />
  );
};

export default MergeSortVisualizer;
