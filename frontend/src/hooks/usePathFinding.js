import { useState, useEffect, useCallback } from "react";

const usePathFinding = (algorithmName, generateStepsFunction) => {
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

  // Animation effect
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
  }, [isPlaying, currentStep, steps, speed, addAnimatingCell]);

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
      const newSteps = generateStepsFunction(grid, start, end);
      setSteps(newSteps);
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const pauseAlgorithm = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());
  };

  // Initialize default step data structure based on algorithm
  const defaultStepData =
    algorithmName === "dijkstra"
      ? {
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
        }
      : {
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

  // Get current step data or default
  const currentStepData = steps[currentStep] || defaultStepData;

  return {
    gridSize,
    grid,
    start,
    end,
    steps,
    currentStep,
    isPlaying,
    speed,
    mode,
    animatingCells,
    currentStepData,
    setSpeed,
    setMode,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    clearGrid,
    generateMaze,
    startAlgorithm,
    pauseAlgorithm,
    resetAnimation,
  };
};

export default usePathFinding;
