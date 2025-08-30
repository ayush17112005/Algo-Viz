import { Square, MapPin, Target, Eraser } from "lucide-react";
export const useVisualizerConfig = (algorithmType) => {
  const configs = {
    bubble: {
      title: "Bubble Sort Visualizer",
      description: "Watch how bubble sort algorithm works step by step",
      codeTitle: "Bubble Sort Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(n²)",
          description: "Worst and average case",
          color: "bg-red-100 text-red-800",
        },
        {
          label: "Space Complexity",
          value: "O(1)",
          description: "Constant extra space",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Stability",
          value: "Stable",
          description: "Maintains relative order",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "In-Place",
          value: "Yes",
          description: "Sorts without extra array",
          color: "bg-purple-100 text-purple-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unsorted" },
        { color: "bg-yellow-500", label: "Comparing" },
        { color: "bg-red-500", label: "Swapping" },
        { color: "bg-green-500", label: "Sorted" },
      ],
    },
    heap: {
      title: "Heap Sort Visualizer",
      description: "Watch how heap sort algorithm works step by step",
      codeTitle: "Heap Sort Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(n log n)",
          description: "Consistent performance",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Space Complexity",
          value: "O(1)",
          description: "Constant extra space",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Stability",
          value: "Unstable",
          description: "May change relative order",
          color: "bg-red-100 text-red-800",
        },
        {
          label: "In-Place",
          value: "Yes",
          description: "Sorts without extra array",
          color: "bg-purple-100 text-purple-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unsorted" },
        { color: "bg-purple-500", label: "Heap" },
        { color: "bg-yellow-500", label: "Comparing" },
        { color: "bg-red-500", label: "Swapping" },
        { color: "bg-green-500", label: "Sorted" },
      ],
    },
    quick: {
      title: "Quick Sort Visualizer",
      description: "Watch how quick sort algorithm works step by step",
      codeTitle: "Quick Sort Implementation",
      algorithmInfo: [
        {
          label: "Average Time",
          value: "O(n log n)",
          description: "Expected performance",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Worst Time",
          value: "O(n²)",
          description: "When pivot is always smallest/largest",
          color: "bg-red-100 text-red-800",
        },
        {
          label: "Space Complexity",
          value: "O(log n)",
          description: "Recursive call stack",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "Stability",
          value: "Unstable",
          description: "Does not maintain relative order",
          color: "bg-orange-100 text-orange-800",
        },
        {
          label: "In-Place",
          value: "Yes",
          description: "Sorts without extra array",
          color: "bg-purple-100 text-purple-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unsorted" },
        { color: "bg-blue-400", label: "Current Range" },
        { color: "bg-purple-500", label: "Pivot" },
        { color: "bg-yellow-500", label: "Comparing" },
        { color: "bg-orange-500", label: "Partitioned" },
        { color: "bg-red-500", label: "Swapping" },
        { color: "bg-green-500", label: "Sorted" },
      ],
    },
    merge: {
      title: "Merge Sort Visualizer",
      description: "Watch how Merge sort algorithm works step by step",
      codeTitle: "Merge Sort Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(n log n)",
          description: "Always optimal performance",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Space Complexity",
          value: "O(n)",
          description: "Requires auxiliary space",
          color: "bg-yellow-100 text-yellow-800",
        },
        {
          label: "Stability",
          value: "Stable",
          description: "Maintains relative order",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "In-Place",
          value: "No",
          description: "Uses additional memory",
          color: "bg-red-100 text-red-800",
        },
      ],
      legendItems: [
        { color: "bg-gray-500", label: "Unsorted" },
        { color: "bg-orange-500", label: "Dividing" },
        { color: "bg-blue-500", label: "Merging" },
        { color: "bg-yellow-500", label: "Comparing" },
        { color: "bg-purple-500", label: "Placing" },
        { color: "bg-green-500", label: "Sorted" },
      ],
      hasAux: false,
    },
    selection: {
      title: "Selection Sort Visualizer",
      description: "Watch how Selection sort algorithm works step by step",
      codeTitle: "Selection Sort Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(n²)",
          description: "Quadratic time complexity",
          color: "bg-red-100 text-red-800",
        },
        {
          label: "Space Complexity",
          value: "O(1)",
          description: "Constant extra space",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Stability",
          value: "Unstable",
          description: "May change relative order",
          color: "bg-red-100 text-red-800",
        },
        {
          label: "In-Place",
          value: "Yes",
          description: "Sorts without extra array",
          color: "bg-purple-100 text-purple-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unsorted" },
        { color: "bg-orange-500", label: "Current Position" },
        { color: "bg-purple-500", label: "Current Minimum" },
        { color: "bg-yellow-500", label: "Comparing" },
        { color: "bg-red-500", label: "Swapping" },
        { color: "bg-green-500", label: "Sorted" },
      ],
    },
    bfs: {
      title: "BFS Sort Visualizer",
      description: "Watch how BFS sort algorithm works step by step",
      codeTitle: "BFS  Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(V + E)",
          description: "V vertices, E edges",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Space Complexity",
          value: "O(V)",
          description: "Queue and visited set",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "Data Structure",
          value: "Queue",
          description: "FIFO - First In First Out",
          color: "bg-purple-100 text-purple-800",
        },
        {
          label: "Exploration",
          value: "Level-wise",
          description: "Visits nodes level by level",
          color: "bg-orange-100 text-orange-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unvisited" },
        { color: "bg-yellow-500", label: "Exploring" },
        { color: "bg-red-500", label: "Current" },
        { color: "bg-green-500", label: "Visited" },
      ],
    },
    dfs: {
      title: "DFS Sort Visualizer",
      description: "Watch how DFS sort algorithm works step by step",
      codeTitle: "DFS  Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(V + E)",
          description: "V vertices, E edges",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Space Complexity",
          value: "O(V)",
          description: "Stack and visited set",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "Data Structure",
          value: "Stack",
          description: "LIFO - Last In First Out",
          color: "bg-purple-100 text-purple-800",
        },
        {
          label: "Graph Type",
          value: "Any",
          description: "Works on directed/undirected",
          color: "bg-orange-100 text-orange-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unvisited" },
        { color: "bg-yellow-500", label: "Exploring" },
        { color: "bg-red-500", label: "Current" },
        { color: "bg-green-500", label: "Visited" },
      ],
    },
    dijkstra: {
      title: "Dijkstra Sort Visualizer",
      description: "Watch how Dijkstra sort algorithm works step by step",
      codeTitle: "Dijkstra  Implementation",
      algorithmInfo: [
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
      ],
      legendItems: [
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
      ],
      modeSelection: [
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
      ],
    },
    topological: {
      title: "Topological Sort Visualizer",
      description: "Watch how Topological sort algorithm works step by step",
      codeTitle: "Topological Sort Implementation",
      algorithmInfo: [
        {
          label: "Time Complexity",
          value: "O(V + E)",
          description: "V vertices, E edges",
          color: "bg-green-100 text-green-800",
        },
        {
          label: "Space Complexity",
          value: "O(V)",
          description: "Queue and in-degree array",
          color: "bg-blue-100 text-blue-800",
        },
        {
          label: "Data Structure",
          value: "Queue",
          description: "FIFO - First In First Out",
          color: "bg-purple-100 text-purple-800",
        },
        {
          label: "Graph Type",
          value: "DAG Only",
          description: "Directed Acyclic Graph required",
          color: "bg-orange-100 text-orange-800",
        },
      ],
      legendItems: [
        { color: "bg-blue-500", label: "Unprocessed" },
        { color: "bg-purple-500", label: "In Queue" },
        { color: "bg-yellow-500", label: "Processing" },
        { color: "bg-red-500", label: "Current" },
        { color: "bg-green-500", label: "Processed" },
      ],
    },

    Astar: {
      title: "A* Sort Visualizer",
      description: "Watch how A* sort algorithm works step by step",
      codeTitle: "A*  Implementation",
      algorithmInfo: [
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
      ],
      legendItems: [
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
      ],
    },
  };

  return configs[algorithmType];
};
