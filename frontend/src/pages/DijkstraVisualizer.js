import React, { useState, useEffect, useCallback, useContext } from "react";
import { dijkstraCode } from "../algorithms/Dijkstra";
import {
  Play,
  Pause,
  RotateCcw,
  Code2,
  Info,
  Target,
  MapPin,
  Square,
  Eraser,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DijkstraAlgorithm } from "../animations/Graph/Dijkstra";
import { AppContext } from "../context/AppContext";

const DijkstraVisualizer = () => {
  const [gridSize] = useState({ rows: 15, cols: 20 });
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 2, col: 2 });
  const [end, setEnd] = useState({ row: 12, col: 17 });
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200);

  const [mode, setMode] = useState("wall");
  const [isDrawing, setIsDrawing] = useState(false);
  const [animatingCells, setAnimatingCells] = useState(new Set());

  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);

  const currentStepData = steps[currentStep] || {
    grid: grid,
    visited: Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill(false)),
    distances: Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill(Infinity)),
    current: null,
    path: [],
    description: "Click 'Start Algorithm' to begin pathfinding",
  };

  // Helper function to add animating cells
  const addAnimatingCell = useCallback((row, col) => {
    const cellKey = `${row}-${col}`;
    setAnimatingCells((prev) => new Set(prev).add(cellKey));

    setTimeout(() => {
      setAnimatingCells((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cellKey);
        return newSet;
      });
    }, 300);
  }, []);

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));
    // Add some random walls
    for (let i = 0; i < gridSize.rows * gridSize.cols * 0.2; i++) {
      const row = Math.floor(Math.random() * gridSize.rows);
      const col = Math.floor(Math.random() * gridSize.cols);
      if (
        (row !== start.row || col !== start.col) &&
        (row !== end.row || col !== end.col)
      ) {
        newGrid[row][col] = "wall";
      }
    }
    setGrid(newGrid);
  }, [gridSize, start, end]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        // Add animation for current step
        if (steps[currentStep + 1] && steps[currentStep + 1].current) {
          const { row, col } = steps[currentStep + 1].current;
          addAnimatingCell(row, col);
        }

        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed, addAnimatingCell]);

  const handleCellClick = (row, col) => {
    if (isPlaying) return;

    const newGrid = [...grid];

    if (mode === "start") {
      setStart({ row, col });
      newGrid[row][col] = "empty";
    } else if (mode === "end") {
      setEnd({ row, col });
      newGrid[row][col] = "empty";
    } else if (mode === "wall") {
      if (
        (row !== start.row || col !== start.col) &&
        (row !== end.row || col !== end.col)
      ) {
        newGrid[row][col] = newGrid[row][col] === "wall" ? "empty" : "wall";
      }
    } else if (mode === "erase") {
      if (
        (row !== start.row || col !== start.col) &&
        (row !== end.row || col !== end.col)
      ) {
        newGrid[row][col] = "empty";
      }
    }

    setGrid(newGrid);
  };

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    handleCellClick(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing && (mode === "wall" || mode === "erase")) {
      handleCellClick(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearGrid = () => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));
    setGrid(newGrid);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());
  };

  const generateMaze = () => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));

    setGrid(newGrid);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());

    // Animate wall generation
    const wallsToAdd = [];
    for (let i = 0; i < gridSize.rows * gridSize.cols * 0.3; i++) {
      const row = Math.floor(Math.random() * gridSize.rows);
      const col = Math.floor(Math.random() * gridSize.cols);
      if (
        (row !== start.row || col !== start.col) &&
        (row !== end.row || col !== end.col)
      ) {
        wallsToAdd.push({ row, col });
      }
    }

    // Add walls with animation
    wallsToAdd.forEach((wall, index) => {
      setTimeout(() => {
        const cellKey = `${wall.row}-${wall.col}`;
        setAnimatingCells((prev) => new Set(prev).add(cellKey));

        setGrid((prev) => {
          const updated = [...prev];
          updated[wall.row][wall.col] = "wall";
          return updated;
        });

        setTimeout(() => {
          setAnimatingCells((prev) => {
            const newSet = new Set(prev);
            newSet.delete(cellKey);
            return newSet;
          });
        }, 300);
      }, index * 50);
    });
  };

  const startAlgorithm = () => {
    if (steps.length === 0) {
      const newSteps = DijkstraAlgorithm.generateSteps(grid, start, end);
      setSteps(newSteps);
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());
  };

  const getCellClass = (row, col) => {
    // Check if it's start or end
    if (row === start.row && col === start.col) return "bg-green-500";
    if (row === end.row && col === end.col) return "bg-red-500";

    // Check if it's in the path
    if (currentStepData.path.some((p) => p.row === row && p.col === col))
      return "bg-yellow-400";

    // Check if it's the current node
    if (
      currentStepData.current &&
      currentStepData.current.row === row &&
      currentStepData.current.col === col
    ) {
      return "bg-purple-500";
    }

    // Check if it's visited
    if (currentStepData.visited[row] && currentStepData.visited[row][col])
      return "bg-blue-300";

    // Check if it's a wall
    if (grid[row] && grid[row][col] === "wall") return "bg-gray-800";

    return "bg-white border-gray-300";
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
              Dijkstra's Algorithm Visualizer
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Watch how Dijkstra's pathfinding algorithm works step by step
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
                onClick={isPlaying ? () => setIsPlaying(false) : startAlgorithm}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? "Pause" : "Start Algorithm"}
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
                onClick={clearGrid}
                disabled={isPlaying}
                className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eraser size={18} />
                Clear Grid
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateMaze}
                disabled={isPlaying}
                className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Maze
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
                  min="50"
                  max="1000"
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

          {/* Mode Selection */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Mode:</span>
            {[
              {
                id: "wall",
                label: "Draw Walls",
                icon: Square,
                color: "bg-gray-800",
              },
              {
                id: "start",
                label: "Set Start",
                icon: MapPin,
                color: "bg-green-500",
              },
              {
                id: "end",
                label: "Set End",
                icon: Target,
                color: "bg-red-500",
              },
              {
                id: "erase",
                label: "Erase",
                icon: Eraser,
                color: "bg-white border-gray-300",
              },
            ].map((modeOption) => (
              <motion.button
                key={modeOption.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(modeOption.id)}
                disabled={isPlaying}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  mode === modeOption.id
                    ? `${modeOption.color} ${
                        modeOption.id === "erase"
                          ? "text-gray-700 border"
                          : "text-white"
                      }`
                    : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <modeOption.icon size={16} />
                {modeOption.label}
              </motion.button>
            ))}
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
                  Dijkstra's Algorithm Implementation
                </h3>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm leading-relaxed">
                    <code>{dijkstraCode}</code>
                  </pre>
                </div>
              </motion.div>
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
                            onMouseDown={() =>
                              !isPlaying && handleMouseDown(row, col)
                            }
                            onMouseEnter={() =>
                              !isPlaying && handleMouseEnter(row, col)
                            }
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

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-8 text-sm flex-wrap"
                >
                  {[
                    {
                      color: "bg-green-500",
                      label: "Start",
                      border: "border-green-400",
                    },
                    {
                      color: "bg-red-500",
                      label: "End",
                      border: "border-red-400",
                    },
                    {
                      color: "bg-gray-800",
                      label: "Wall",
                      border: "border-gray-700",
                    },
                    {
                      color: "bg-purple-500",
                      label: "Current",
                      border: "border-purple-400",
                    },
                    {
                      color: "bg-blue-300",
                      label: "Visited",
                      border: "border-blue-200",
                    },
                    {
                      color: "bg-yellow-400",
                      label: "Shortest Path",
                      border: "border-yellow-300",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div
                        className={`w-6 h-6 ${item.color} rounded-sm shadow-sm border-2 ${item.border}`}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section - Algorithm Info or Current Step */}
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
                    value: "O((V + E) log V)",
                    description: "Vertices + Edges with log factor",
                    color: "bg-orange-100 text-orange-800",
                  },
                  {
                    label: "Space Complexity",
                    value: "O(V)",
                    description: "Linear space for distances",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    label: "Optimality",
                    value: "Optimal",
                    description: "Guarantees shortest path",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    label: "Graph Type",
                    value: "Weighted",
                    description: "Works with non-negative weights",
                    color: "bg-purple-100 text-purple-800",
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

export default DijkstraVisualizer;
