import { useState, useEffect, useCallback } from "react";

const DEFAULT_ARRAY_SIZE = 7;
const DEFAULT_SPEED = 1000;
const DEFAULT_DESCRIPTION =
  "Click 'Generate New Array' or 'Start Sorting' to begin";

const generateRandomArray = () => {
  const randomArray = Array.from(
    { length: DEFAULT_ARRAY_SIZE },
    () => Math.floor(Math.random() * 99) + 1
  );
  return randomArray;
};

export default function useSortingAnimation(algorithm, initialArray = null) {
  // State management
  const [array, setArray] = useState(
    () => initialArray || generateRandomArray(DEFAULT_ARRAY_SIZE)
  );
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  // Generate new random array and reset state
  const generateNewArray = useCallback((size = DEFAULT_ARRAY_SIZE) => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Start or resume the sorting animation
  const startSorting = useCallback(() => {
    if (steps.length === 0) {
      const newSteps = algorithm.generateSteps(array);
      setSteps(newSteps);
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [array, steps.length, algorithm]);

  // Pause the sorting animation
  const pauseSorting = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Reset the animation to the first step
  const resetAnimation = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // FIXED: Handle array change effect
  useEffect(() => {
    // Always generate new steps when array changes
    const newSteps = algorithm.generateSteps(array);
    setSteps(newSteps);
    setCurrentStep(0);
  }, [array, algorithm]);

  // Handle animation playback effect
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

  // Current step data
  const currentStepData = steps[currentStep] || {
    array: array,
    state: {
      comparing: [],
      swapping: [],
      sorted: [],

      // MergeSort specific properties
      auxiliaryArray: [],
      dividing: [],
      merging: [],
      placing: [],
      leftRange: null,
      rightRange: null,

      //Heap Sort
      heapifying: [],
      heap: [],

      //Quick Sort
      partitioning: [],
      pivot: null,

      //Selection Sort
      currentMin: -1,
      currentIndex: 1,
    },
    description: DEFAULT_DESCRIPTION,
  };

  return {
    array,
    currentStepData,
    isPlaying,
    speed,
    currentStep,
    totalSteps: steps.length,
    setSpeed,
    generateNewArray,
    startSorting,
    pauseSorting,
    resetAnimation,
    goToStep: setCurrentStep,
  };
}
