import { useState, useEffect } from "react";
import { generateTopologicalSteps } from "../animations/Graph/Topo";

const useTopologicalSort = () => {
  // Directed Acyclic Graph (DAG) representation - adjacency list
  const defaultGraph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [5],
    4: [5],
    5: [],
    6: [0, 4],
    7: [6, 1],
  };

  const [graph, setGraph] = useState(defaultGraph);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const currentStepData = steps[currentStep] || {
    queue: [],
    result: [],
    inDegree: {},
    currentNode: null,
    processing: [],
    description: "Click 'Start Topological Sort' to begin sorting",
  };

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

  const generateNewGraph = () => {
    // Generate a simple DAG
    const nodes = 8;
    const newGraph = {};

    // Initialize empty adjacency lists
    for (let i = 0; i < nodes; i++) {
      newGraph[i] = [];
    }

    // Add edges that maintain DAG property (from lower to higher numbered nodes mostly)
    const possibleEdges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [6, 0],
      [6, 4],
      [7, 6],
      [7, 1],
      [1, 4],
      [0, 3],
    ];

    // Randomly select some edges to create variety
    const selectedEdges = possibleEdges.filter(() => Math.random() > 0.4);

    selectedEdges.forEach(([from, to]) => {
      if (!newGraph[from].includes(to)) {
        newGraph[from].push(to);
      }
    });

    setGraph(newGraph);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const startTopologicalSort = () => {
    const newSteps = generateTopologicalSteps(graph);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    // Add any other pause logic you need
  };

  const getNodeColor = (nodeId) => {
    if (currentStepData.currentNode === nodeId) return "#ef4444"; // red - current
    if (currentStepData.result.includes(nodeId)) return "#10b981"; // green - processed
    if (currentStepData.processing.includes(nodeId)) return "#f59e0b"; // yellow - processing
    if (currentStepData.queue.includes(nodeId)) return "#8b5cf6"; // purple - in queue
    return "#3b82f6"; // blue - unprocessed
  };

  // Node positions for visualization (arranged in layers)
  const nodePositions = {
    0: { x: 200, y: 120 },
    1: { x: 400, y: 120 },
    2: { x: 200, y: 220 },
    3: { x: 400, y: 220 },
    4: { x: 600, y: 220 },
    5: { x: 500, y: 320 },
    6: { x: 100, y: 50 },
    7: { x: 300, y: 50 },
  };

  return {
    graph,
    steps,
    currentStep,
    isPlaying,
    speed,
    currentStepData,
    nodePositions,
    setSpeed,
    setIsPlaying,
    generateNewGraph,
    startTopologicalSort,
    resetAnimation,
    getNodeColor,
    pauseAnimation,
  };
};

export default useTopologicalSort;
