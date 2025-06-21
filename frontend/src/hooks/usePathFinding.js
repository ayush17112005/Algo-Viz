import { useState, useEffect, useCallback } from "react";

export const usePathfinding = ({
  gridSize = { rows: 15, cols: 20 },
  initialStart = { row: 2, col: 2 },
  initialEnd = { row: 12, col: 17 },
  algorithmFunction, // Function that generates steps
  initialSpeed = 200,
  wallDensity = 0.2,
}) => {
  // Grid and positioning state
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  // Animation state
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);

  // Interaction state
  const [mode, setMode] = useState("wall");
  const [isDrawing, setIsDrawing] = useState(false);
  const [animatingCells, setAnimatingCells] = useState(new Set());

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

  // Initialize grid with random walls
  const initializeGrid = useCallback(() => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));

    // Add random walls
    for (let i = 0; i < gridSize.rows * gridSize.cols * wallDensity; i++) {
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
  }, [gridSize, start, end, wallDensity]);

  // Initialize grid on mount and when dependencies change
  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // Auto-play animation
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

  // Handle cell interactions
  const handleCellClick = useCallback(
    (row, col) => {
      if (isPlaying) return;

      const newGrid = [...grid];

      switch (mode) {
        case "start":
          setStart({ row, col });
          newGrid[row][col] = "empty";
          break;
        case "end":
          setEnd({ row, col });
          newGrid[row][col] = "empty";
          break;
        case "wall":
          if (
            (row !== start.row || col !== start.col) &&
            (row !== end.row || col !== end.col)
          ) {
            newGrid[row][col] = newGrid[row][col] === "wall" ? "empty" : "wall";
          }
          break;
        case "erase":
          if (
            (row !== start.row || col !== start.col) &&
            (row !== end.row || col !== end.col)
          ) {
            newGrid[row][col] = "empty";
          }
          break;
        default:
          break;
      }

      setGrid(newGrid);
    },
    [isPlaying, grid, mode, start, end]
  );

  const handleMouseDown = useCallback(
    (row, col) => {
      setIsDrawing(true);
      handleCellClick(row, col);
    },
    [handleCellClick]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (isDrawing && (mode === "wall" || mode === "erase")) {
        handleCellClick(row, col);
      }
    },
    [isDrawing, mode, handleCellClick]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Control functions
  const clearGrid = useCallback(() => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));
    setGrid(newGrid);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());
  }, [gridSize]);

  const generateMaze = useCallback(() => {
    const newGrid = Array(gridSize.rows)
      .fill()
      .map(() => Array(gridSize.cols).fill("empty"));

    setGrid(newGrid);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());

    // Generate walls to add
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
  }, [gridSize, start, end]);

  const startAlgorithm = useCallback(() => {
    if (steps.length === 0 && algorithmFunction) {
      const newSteps = algorithmFunction(grid, start, end);
      setSteps(newSteps);
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [steps.length, algorithmFunction, grid, start, end]);

  const resetAnimation = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCells(new Set());
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startAlgorithm();
    }
  }, [isPlaying, startAlgorithm]);

  // Get current step data with fallback
  const getCurrentStepData = useCallback(
    (fallbackGrid = grid) => {
      return (
        steps[currentStep] || {
          grid: fallbackGrid,
          visited: Array(gridSize.rows)
            .fill()
            .map(() => Array(gridSize.cols).fill(false)),
          distances: Array(gridSize.rows)
            .fill()
            .map(() => Array(gridSize.cols).fill(Infinity)),
          openSet: [],
          closedSet: [],
          current: null,
          path: [],
          description: "Click 'Start Algorithm' to begin pathfinding",
        }
      );
    },
    [steps, currentStep, grid, gridSize]
  );

  // Helper function to check if a cell is animating
  const isCellAnimating = useCallback(
    (row, col) => {
      const cellKey = `${row}-${col}`;
      return animatingCells.has(cellKey);
    },
    [animatingCells]
  );

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Helper function to get cell coordinates as key
  const getCellKey = useCallback((row, col) => `${row}-${col}`, []);

  return {
    // State
    grid,
    start,
    end,
    steps,
    currentStep,
    isPlaying,
    speed,
    mode,
    isDrawing,
    animatingCells,
    gridSize,
    pause,

    // Setters
    setGrid,
    setStart,
    setEnd,
    setSpeed,
    setMode,

    // Event handlers
    handleCellClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,

    // Control functions
    clearGrid,
    generateMaze,
    startAlgorithm,
    resetAnimation,
    togglePlayPause,

    // Utility functions
    getCurrentStepData,
    isCellAnimating,
    getCellKey,
    addAnimatingCell,
    initializeGrid,
  };
};
