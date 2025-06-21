import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const useGraphVisualizer = (algorithmType = "BFS", generateStepsFunction) => {
  // Default graph structure
  const defaultGraph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5, 6],
    3: [1],
    4: [1, 7],
    5: [2],
    6: [2, 8],
    7: [4],
    8: [6],
  };

  // State management
  const [graph, setGraph] = useState(defaultGraph);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [startNode, setStartNode] = useState(0);

  // Context
  const { showCode, showInfo, toggleCode, toggleInfo } = useContext(AppContext);

  // Current step data with algorithm-specific defaults
  const getDefaultStepData = () => {
    const baseData = {
      visited: [],
      currentNode: null,
      exploring: [],
    };

    if (algorithmType === "BFS") {
      return {
        ...baseData,
        queue: [],
        description: "Click 'Start BFS' to begin traversal",
      };
    } else {
      return {
        ...baseData,
        stack: [],
        description: "Click 'Start DFS' to begin traversal",
      };
    }
  };

  const currentStepData = steps[currentStep] || getDefaultStepData();

  // Auto-play effect
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

  // Graph generation utility
  const generateNewGraph = () => {
    const nodes = 9;
    const newGraph = {};

    // Initialize empty adjacency lists
    for (let i = 0; i < nodes; i++) {
      newGraph[i] = [];
    }

    // Base edges to ensure connectivity
    const edges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
      [4, 7],
      [6, 8],
    ];

    // Add random additional edges
    for (let i = 0; i < 3; i++) {
      const from = Math.floor(Math.random() * nodes);
      const to = Math.floor(Math.random() * nodes);
      if (from !== to && !newGraph[from].includes(to)) {
        edges.push([from, to]);
      }
    }

    // Build adjacency list
    edges.forEach(([from, to]) => {
      newGraph[from].push(to);
      newGraph[to].push(from);
    });

    setGraph(newGraph);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Start algorithm
  const startAlgorithm = () => {
    if (!generateStepsFunction) {
      console.error("generateStepsFunction is required");
      return;
    }

    const newSteps = generateStepsFunction(graph, startNode);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  // Reset animation
  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Node color logic
  const getNodeColor = (nodeId) => {
    if (currentStepData.currentNode === nodeId) return "#ef4444"; // red - current
    if (currentStepData.visited.includes(nodeId)) return "#10b981"; // green - visited
    if (currentStepData.exploring.includes(nodeId)) return "#f59e0b"; // yellow - exploring
    return "#3b82f6"; // blue - unvisited
  };

  // Node positions for visualization
  const nodePositions = {
    0: { x: 400, y: 70 },
    1: { x: 300, y: 170 },
    2: { x: 500, y: 170 },
    3: { x: 250, y: 270 },
    4: { x: 350, y: 270 },
    5: { x: 450, y: 270 },
    6: { x: 550, y: 270 },
    7: { x: 300, y: 370 },
    8: { x: 600, y: 370 },
  };

  // Algorithm-specific info
  const getAlgorithmInfo = () => {
    if (algorithmType === "BFS") {
      return {
        title: "BFS Algorithm Visualizer",
        description:
          "Watch how Breadth-First Search algorithm explores a graph level by level",
        dataStructure: {
          name: "Queue",
          description: "FIFO - First In First Out",
          exploration: "Level-wise",
          explorationDesc: "Visits nodes level by level",
        },
        complexity: {
          time: "O(V + E)",
          space: "O(V)",
          timeDesc: "V vertices, E edges",
          spaceDesc: "Queue and visited set",
        },
        buttonText: {
          start: "Start BFS",
          pause: "Pause",
        },
      };
    } else {
      return {
        title: "DFS Algorithm Visualizer",
        description:
          "Watch how Depth-First Search algorithm explores a graph step by step",
        dataStructure: {
          name: "Stack",
          description: "LIFO - Last In First Out",
          exploration: "Depth-first",
          explorationDesc: "Goes as deep as possible first",
        },
        complexity: {
          time: "O(V + E)",
          space: "O(V)",
          timeDesc: "V vertices, E edges",
          spaceDesc: "Stack and visited set",
        },
        buttonText: {
          start: "Start DFS",
          pause: "Pause",
        },
      };
    }
  };

  // Control handlers
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startAlgorithm();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(Number(newSpeed));
  };

  const handleStartNodeChange = (newStartNode) => {
    setStartNode(Number(newStartNode));
  };

  // Legend data
  const legendItems = [
    { color: "bg-blue-500", label: "Unvisited" },
    { color: "bg-yellow-500", label: "Exploring" },
    { color: "bg-red-500", label: "Current" },
    { color: "bg-green-500", label: "Visited" },
  ];

  return {
    // State
    graph,
    steps,
    currentStep,
    isPlaying,
    speed,
    startNode,
    currentStepData,

    // Context
    showCode,
    showInfo,
    toggleCode,
    toggleInfo,

    // Actions
    generateNewGraph,
    startAlgorithm,
    resetAnimation,
    handlePlayPause,
    handleSpeedChange,
    handleStartNodeChange,

    // Utilities
    getNodeColor,
    nodePositions,
    getAlgorithmInfo,
    legendItems,

    // Computed values
    algorithmInfo: getAlgorithmInfo(),
    totalSteps: steps.length || 1,
    isLastStep: currentStep >= steps.length - 1,
  };
};

export default useGraphVisualizer;
