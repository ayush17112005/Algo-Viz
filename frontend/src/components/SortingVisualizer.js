import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Settings,
  Info,
  Code,
  Zap,
} from "lucide-react";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [theme, setTheme] = useState("dark");

  const timeoutRef = useRef(null);
  const stepsRef = useRef([]);

  const algorithms = {
    bubbleSort: {
      name: "Bubble Sort",
      complexity: "O(n²)",
      description:
        "Compares adjacent elements and swaps them if they are in wrong order",
    },
    quickSort: {
      name: "Quick Sort",
      complexity: "O(n log n)",
      description: "Divides array into partitions and sorts them recursively",
    },
    mergeSort: {
      name: "Merge Sort",
      complexity: "O(n log n)",
      description: "Divides array into halves and merges them in sorted order",
    },
    insertionSort: {
      name: "Insertion Sort",
      complexity: "O(n²)",
      description: "Builds final sorted array one element at a time",
    },
    selectionSort: {
      name: "Selection Sort",
      complexity: "O(n²)",
      description: "Finds minimum element and places it at the beginning",
    },
    heapSort: {
      name: "Heap Sort",
      complexity: "O(n log n)",
      description: "Uses heap data structure to sort elements",
    },
  };

  const codeSnippets = {
    bubbleSort: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    quickSort: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`,
    mergeSort: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`,
    insertionSort: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    selectionSort: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    heapSort: `function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}`,
  };

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 300) + 10
    );
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCurrentStep(0);
    setTotalSteps(0);
    stepsRef.current = [];
  }, [arraySize]);

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Bubble Sort Algorithm
  const bubbleSort = (arr) => {
    const steps = [];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          });
        }
      }
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
    });

    return steps;
  };

  // Quick Sort Algorithm
  const quickSort = (arr, low = 0, high = arr.length - 1, steps = []) => {
    if (low < high) {
      const pi = partition(arr, low, high, steps);
      quickSort(arr, low, pi - 1, steps);
      quickSort(arr, pi + 1, high, steps);
    }
    return steps;
  };

  const partition = (arr, low, high, steps) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: [],
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [j, high],
          swapping: [i, j],
          sorted: [],
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [i + 1],
    });

    return i + 1;
  };

  // Merge Sort Algorithm
  const mergeSort = (arr, left = 0, right = arr.length - 1, steps = []) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid, steps);
      mergeSort(arr, mid + 1, right, steps);
      merge(arr, left, mid, right, steps);
    }
    return steps;
  };

  const merge = (arr, left, mid, right, steps) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  };

  // Insertion Sort Algorithm
  const insertionSort = (arr) => {
    const steps = [];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        array: [...arr],
        comparing: [i],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k),
      });

      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
        });

        arr[j + 1] = arr[j];
        j--;

        steps.push({
          array: [...arr],
          comparing: [j + 1, j + 2],
          swapping: [j + 1, j + 2],
          sorted: Array.from({ length: i }, (_, k) => k),
        });
      }

      arr[j + 1] = key;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    });

    return steps;
  };

  // Selection Sort Algorithm
  const selectionSort = (arr) => {
    const steps = [];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        steps.push({
          array: [...arr],
          comparing: [minIdx, j],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [i, minIdx],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
        });
      }
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
    });

    return steps;
  };

  // Heap Sort Algorithm (simplified)
  const heapSort = (arr) => {
    const steps = [];

    // Build max heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, arr.length, i, steps);
    }

    // Extract elements from heap
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [0, i],
        sorted: Array.from(
          { length: arr.length - i },
          (_, k) => arr.length - 1 - k
        ),
      });

      heapify(arr, i, 0, steps);
    }

    return steps;
  };

  const heapify = (arr, n, i, steps) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        array: [...arr],
        comparing: [i, largest],
        swapping: [],
        sorted: [],
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, largest],
        sorted: [],
      });

      heapify(arr, n, largest, steps);
    }
  };

  // Start sorting animation
  const startSorting = () => {
    if (isPlaying) return;

    const arrCopy = [...array];
    let steps = [];

    switch (selectedAlgorithm) {
      case "bubbleSort":
        steps = bubbleSort(arrCopy);
        break;
      case "quickSort":
        steps = quickSort(arrCopy);
        break;
      case "mergeSort":
        steps = mergeSort(arrCopy);
        break;
      case "insertionSort":
        steps = insertionSort(arrCopy);
        break;
      case "selectionSort":
        steps = selectionSort(arrCopy);
        break;
      case "heapSort":
        steps = heapSort(arrCopy);
        break;
      default:
        steps = bubbleSort(arrCopy);
    }

    stepsRef.current = steps;
    setTotalSteps(steps.length);
    setIsPlaying(true);
    setIsPaused(false);
    animateSteps(steps, 0);
  };

  const animateSteps = (steps, stepIndex) => {
    if (stepIndex >= steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = steps[stepIndex];
    setArray(step.array);
    setComparing(step.comparing || []);
    setSwapping(step.swapping || []);
    setSorted(step.sorted || []);
    setCurrentStep(stepIndex);

    const delay = 101 - speed;
    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        animateSteps(steps, stepIndex + 1);
      }
    }, delay);
  };

  const pauseAnimation = () => {
    setIsPaused(!isPaused);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isPaused && isPlaying) {
      animateSteps(stepsRef.current, currentStep + 1);
    }
  };

  const resetAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    generateArray();
  };

  const getBarColor = (index) => {
    if (sorted.includes(index)) {
      return theme === "dark" ? "bg-green-500" : "bg-green-600";
    }
    if (swapping.includes(index)) {
      return theme === "dark" ? "bg-red-500" : "bg-red-600";
    }
    if (comparing.includes(index)) {
      return theme === "dark" ? "bg-yellow-500" : "bg-yellow-600";
    }
    return theme === "dark" ? "bg-blue-500" : "bg-blue-600";
  };

  const maxValue = Math.max(...array);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap
                className={`w-8 h-8 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h1
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Algorithm Visualizer
              </h1>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls */}
        <div
          className={`rounded-2xl p-6 mb-6 ${
            theme === "dark"
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/50 border border-gray-200"
          } backdrop-blur-sm`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Algorithm Selection */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Algorithm
              </label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                disabled={isPlaying}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                {Object.entries(algorithms).map(([key, algo]) => (
                  <option key={key} value={key}>
                    {algo.name} - {algo.complexity}
                  </option>
                ))}
              </select>
            </div>

            {/* Array Size */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Array Size: {arraySize}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                disabled={isPlaying}
                className="w-full"
              />
            </div>

            {/* Speed Control */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Speed: {speed}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={startSorting}
              disabled={isPlaying && !isPaused}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600"
                  : "bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300"
              } disabled:cursor-not-allowed`}
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </button>

            <button
              onClick={pauseAnimation}
              disabled={!isPlaying}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-gray-600"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white disabled:bg-gray-300"
              } disabled:cursor-not-allowed`}
            >
              <Pause className="w-4 h-4" />
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>

            <button
              onClick={resetAnimation}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={generateArray}
              disabled={isPlaying}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300"
              } disabled:cursor-not-allowed`}
            >
              <Shuffle className="w-4 h-4" />
              <span>New Array</span>
            </button>

            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Code</span>
            </button>
          </div>

          {/* Progress */}
          {totalSteps > 0 && (
            <div className="mt-4">
              <div
                className={`text-sm mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Step {currentStep} of {totalSteps}
              </div>
              <div
                className={`w-full h-2 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Algorithm Info */}
        <div
          className={`rounded-2xl p-4 mb-6 ${
            theme === "dark"
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/50 border border-gray-200"
          } backdrop-blur-sm`}
        >
          <div className="flex items-start space-x-3">
            <Info
              className={`w-5 h-5 mt-1 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <div>
              <h3
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {algorithms[selectedAlgorithm].name}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Time Complexity: {algorithms[selectedAlgorithm].complexity} •{" "}
                {algorithms[selectedAlgorithm].description}
              </p>
            </div>
          </div>
        </div>

        {/* Code Display */}
        {showCode && (
          <div
            className={`rounded-2xl p-6 mb-6 ${
              theme === "dark"
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/50 border border-gray-200"
            } backdrop-blur-sm`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Code Implementation
            </h3>
            <pre
              className={`p-4 rounded-lg text-sm overflow-x-auto ${
                theme === "dark"
                  ? "bg-gray-900 text-green-400"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <code>{codeSnippets[selectedAlgorithm]}</code>
            </pre>
          </div>
        )}

        {/* Visualization */}
        <div
          className={`rounded-2xl p-6 ${
            theme === "dark"
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/50 border border-gray-200"
          } backdrop-blur-sm`}
        >
          <div className="flex items-end justify-center space-x-1 h-80 overflow-hidden">
            {array.map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${getBarColor(
                  index
                )} rounded-t-sm`}
                style={{
                  height: `${(value / maxValue) * 280}px`,
                  width: `${Math.max(800 / arraySize, 4)}px`,
                  minWidth: "2px",
                }}
                title={`Index: ${index}, Value: ${value}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded ${
                  theme === "dark" ? "bg-blue-500" : "bg-blue-600"
                }`}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Unsorted
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded ${
                  theme === "dark" ? "bg-yellow-500" : "bg-yellow-600"
                }`}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Comparing
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded ${
                  theme === "dark" ? "bg-red-500" : "bg-red-600"
                }`}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Swapping
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-4 h-4 rounded ${
                  theme === "dark" ? "bg-green-500" : "bg-green-600"
                }`}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Sorted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
