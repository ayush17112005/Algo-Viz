import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Grid = ({
  gridSize,
  isPlaying,
  animatingCells,
  getCellClass,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <motion.div
        className="grid gap-0.5 p-6 bg-gray-100 rounded-xl shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: gridSize.rows }, (_, row) =>
          Array.from({ length: gridSize.cols }, (_, col) => {
            const cellKey = `${row}-${col}`;
            const isAnimating = animatingCells.has(cellKey);

            return (
              <motion.div
                key={cellKey}
                className={`w-8 h-8 border border-gray-200 cursor-pointer transition-all duration-150 rounded-sm ${getCellClass(
                  row,
                  col
                )}`}
                whileHover={{
                  scale: isPlaying ? 1 : 1.1,
                  transition: { duration: 0.1 },
                }}
                whileTap={{
                  scale: isPlaying ? 1 : 0.9,
                  transition: { duration: 0.1 },
                }}
                animate={
                  isAnimating
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
                onMouseDown={() => !isPlaying && handleMouseDown(row, col)}
                onMouseEnter={() => !isPlaying && handleMouseEnter(row, col)}
                onMouseUp={handleMouseUp}
                style={{
                  pointerEvents: isPlaying ? "none" : "auto",
                }}
              />
            );
          })
        )}
      </motion.div>
    </div>
  );
};

export default Grid;
