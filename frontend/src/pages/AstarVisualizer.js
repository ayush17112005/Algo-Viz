import React, { useState, useEffect, useCallback, useContext } from "react";
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
import { generateAStarSteps } from "../animations/Graph/Astart";
import { AppContext } from "../context/AppContext";
const AStarVisualizer = () => {
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
    openSet: [],
    closedSet: [],
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
      const newSteps = generateAStarSteps(grid, start, end);
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

    // Check if it's in closed set (visited)
    if (
      currentStepData.closedSet &&
      currentStepData.closedSet.some(
        (node) => node.row === row && node.col === col
      )
    )
      return "bg-blue-300";

    // Check if it's in open set
    if (
      currentStepData.openSet &&
      currentStepData.openSet.some(
        (node) => node.row === row && node.col === col
      )
    )
      return "bg-cyan-200";

    // Check if it's a wall
    if (grid[row] && grid[row][col] === "wall") return "bg-gray-800";

    return "bg-white border-gray-300";
  };
  const aStarCode = `function aStar(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Heuristic function (Manhattan distance)
    const heuristic = (a, b) => {
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    };
    
    // Initialize open and closed sets
    const openSet = [{
        ...start, 
        g: 0, 
        h: heuristic(start, end), 
        f: heuristic(start, end), 
        parent: null
    }];
    const closedSet = [];
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (openSet.length > 0) {
        // Find node with lowest f score
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        closedSet.push(current);
        
        // Check if we reached the goal
        if (current.row === end.row && current.col === end.col) {
            return reconstructPath(current);
        }
        
        // Explore neighbors
        for (const [dr, dc] of directions) {
            const newRow = current.row + dr;
            const newCol = current.col + dc;
            
            if (isValidCell(newRow, newCol, rows, cols) &&
                grid[newRow][newCol] !== 'wall' &&
                !isInClosedSet(newRow, newCol, closedSet)) {
                
                const tentativeG = current.g + 1;
                const h = heuristic({row: newRow, col: newCol}, end);
                const f = tentativeG + h;
                
                const existingNode = openSet.find(
                    node => node.row === newRow && node.col === newCol
                );
                
                if (!existingNode || tentativeG < existingNode.g) {
                    const neighbor = {
                        row: newRow,
                        col: newCol,
                        g: tentativeG,
                        h: h,
                        f: f,
                        parent: current
                    };
                    
                    if (existingNode) {
                        // Update existing node
                        Object.assign(existingNode, neighbor);
                    } else {
                        // Add new node to open set
                        openSet.push(neighbor);
                    }
                }
            }
        }
    }
    
    return []; // No path found
}

function isValidCell(row, col, rows, cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function isInClosedSet(row, col, closedSet) {
    return closedSet.some(node => node.row === row && node.col === col);
}

function reconstructPath(endNode) {
    const path = [];
    let current = endNode;
    
    while (current) {
        path.unshift({row: current.row, col: current.col});
        current = current.parent;
    }
    
    return path;
}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="inline-flex items-center gap-3">
              <Code2 className="text-green-600" size={36} />
              A* Algorithm Visualizer
            </span>
          </h1>
          <p className="text-gray-600">
            Watch how A* pathfinding algorithm works step by step with heuristic
            optimization
          </p>
        </div>

        {/* Enhanced Control Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={isPlaying ? () => setIsPlaying(false) : startAlgorithm}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? "Pause" : "Start Algorithm"}
              </button>

              <button
                onClick={resetAnimation}
                className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <RotateCcw size={18} />
                Reset
              </button>

              <button
                onClick={clearGrid}
                disabled={isPlaying}
                className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eraser size={18} />
                Clear Grid
              </button>

              <button
                onClick={generateMaze}
                disabled={isPlaying}
                className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Maze
              </button>

              {/* Show Code Button */}
              <button
                onClick={toggleCode}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
                  showCode
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Code2 size={18} />
                {showCode ? "Hide Code" : "Show Code"}
              </button>

              {/* Algorithm Info Button */}
              <button
                onClick={toggleInfo}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${
                  showInfo
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Info size={18} />
                {showInfo ? "Hide Info" : "Algorithm Info"}
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
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
              </div>

              <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                Step: {currentStep + 1} / {steps.length || 1}
              </div>
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
              <button
                key={modeOption.id}
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
              </button>
            ))}
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {showCode ? (
            // Code Display
            <div className="w-full">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Code2 className="text-green-600" size={28} />
                A* Algorithm Implementation
              </h3>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm leading-relaxed">
                  <code>{aStarCode}</code>
                </pre>
              </div>
            </div>
          ) : (
            // Grid Visualization
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Pathfinding Grid
              </h3>

              <div className="flex justify-center mb-8">
                <div
                  className="grid gap-0.5 p-6 bg-gray-100 rounded-xl shadow-inner"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                  }}
                >
                  {Array.from({ length: gridSize.rows }, (_, row) =>
                    Array.from({ length: gridSize.cols }, (_, col) => {
                      const cellKey = `${row}-${col}`;
                      const isAnimating = animatingCells.has(cellKey);

                      return (
                        <div
                          key={cellKey}
                          className={`w-8 h-8 border border-gray-200 cursor-pointer transition-all duration-150 rounded-sm ${getCellClass(
                            row,
                            col
                          )} ${isAnimating ? "scale-110" : ""}`}
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
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
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
                    color: "bg-cyan-200",
                    label: "Open Set",
                    border: "border-cyan-100",
                  },
                  {
                    color: "bg-blue-300",
                    label: "Closed Set",
                    border: "border-blue-200",
                  },
                  {
                    color: "bg-yellow-400",
                    label: "Shortest Path",
                    border: "border-yellow-300",
                  },
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 ${item.color} rounded-sm shadow-sm border-2 ${item.border}`}
                    ></div>
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - Algorithm Info or Current Step */}
        {showInfo ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Info className="text-blue-600" size={28} />
              Algorithm Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Time Complexity",
                  value: "O(b^d)",
                  description: "Branching factor to depth",
                  color: "bg-orange-100 text-orange-800",
                },
                {
                  label: "Space Complexity",
                  value: "O(b^d)",
                  description: "Stores all nodes in memory",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  label: "Optimality",
                  value: "Optimal*",
                  description: "With admissible heuristic",
                  color: "bg-green-100 text-green-800",
                },
                {
                  label: "Heuristic",
                  value: "Manhattan",
                  description: "Distance-based estimation",
                  color: "bg-purple-100 text-purple-800",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          !showCode && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                Current Step
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AStarVisualizer;
