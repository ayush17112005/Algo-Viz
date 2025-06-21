// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrayBar } from "./ArrayBar";
// import { ArrayLegend } from "./ArrayLegend";
// export const ArrayVisualization = ({
//   currentStepData,
//   getBarColor,
//   title = "Array Visualization",
//   legendItems,
// }) => {
//   const getBarHeight = (value) => {
//     const maxValue = Math.max(...currentStepData.array);
//     return (value / maxValue) * 350;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//     >
//       <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
//         {title}
//       </h3>

//       <div
//         className="flex items-end justify-center gap-4 mb-8"
//         style={{ height: "400px" }}
//       >
//         <AnimatePresence>
//           {currentStepData.array.map((value, index) => (
//             <ArrayBar
//               key={`${index}-${value}`}
//               value={value}
//               index={index}
//               height={getBarHeight(value)}
//               color={getBarColor(index)}
//             />
//           ))}
//         </AnimatePresence>
//       </div>

//       <ArrayLegend legendItems={legendItems} />
//     </motion.div>
//   );
// };

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrayBar } from "./ArrayBar";
import { ArrayLegend } from "./ArrayLegend";

export const ArrayVisualization = ({
  currentStepData,
  getBarColor,
  title,
  legendItems,
  height = 400,
  minBarHeight = 20,
}) => {
  const getBarHeight = (value) => {
    const maxValue = Math.max(...currentStepData.array);
    return (value / maxValue) * height;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        {title}
      </h3>

      <div
        className="flex items-end justify-center gap-4 mb-8"
        style={{ height: `${height}px` }}
      >
        <AnimatePresence>
          {currentStepData.array.map((value, index) => (
            <ArrayBar
              key={`${index}-${value}`}
              value={value}
              index={index}
              height={Math.max(getBarHeight(value), minBarHeight)}
              color={getBarColor(index)}
            />
          ))}
        </AnimatePresence>
      </div>

      {legendItems && <ArrayLegend legendItems={legendItems} />}
    </motion.div>
  );
};
