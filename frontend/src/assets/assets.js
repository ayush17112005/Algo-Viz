// export const algorithms = [
//   {
//     title: "Bubble Sort",
//     description: "Step-by-step simulation of Bubble Sort algorithm.",
//     icon: "🔁",
//     timeComplexity: "O(n²)",
//     spaceComplexity: "O(1)",
//     route: "/bubble",
//   },
//   {
//     title: "Quick Sort",
//     description: "Visualize partitioning and recursive sorting.",
//     icon: "⚡",
//     timeComplexity: "O(n log n) (avg), O(n²) (worst)",
//     spaceComplexity: "O(log n)",
//     route: "/quick",
//   },
//   {
//     title: "Merge Sort",
//     description: "Watch divide and conquer in action.",
//     icon: "🔀",
//     timeComplexity: "O(n log n)",
//     spaceComplexity: "O(n)",
//     route: "/merge",
//   },
//   {
//     title: "Heap Sort",
//     description: "Build and flatten the heap visually.",
//     icon: "🏗️",
//     timeComplexity: "O(n log n)",
//     spaceComplexity: "O(1)",
//     route: "/heap",
//   },
//   {
//     title: "Selection Sort",
//     description: "Understand how the smallest element is selected.",
//     icon: "🎯",
//     timeComplexity: "O(n²)",
//     spaceComplexity: "O(1)",
//     route: "/selection",
//   },
//   {
//     title: "A* Algorithm",
//     description: "Pathfinding using heuristics and cost.",
//     icon: "🧭",
//     timeComplexity: "O(E)",
//     spaceComplexity: "O(V)",
//     route: "/astar",
//   },
//   {
//     title: "Dijkstra",
//     description: "Shortest path calculation in weighted graphs.",
//     icon: "📍",
//     timeComplexity: "O((V + E) log V)",
//     spaceComplexity: "O(V)",
//     route: "/dijkstra",
//   },
//   {
//     title: "DFS",
//     description: "Explore deep into a graph recursively.",
//     icon: "🌊",
//     timeComplexity: "O(V + E)",
//     spaceComplexity: "O(V)",
//     route: "/dfs",
//   },
//   {
//     title: "BFS",
//     description: "Level-wise traversal in graphs.",
//     icon: "📘",
//     timeComplexity: "O(V + E)",
//     spaceComplexity: "O(V)",
//     route: "/bfs",
//   },
//   {
//     title: "Topological Sort",
//     description: "Sort tasks based on dependency order.",
//     icon: "🧱",
//     timeComplexity: "O(V + E)",
//     spaceComplexity: "O(V)",
//     route: "/topo",
//   },
// ];

export const algorithms = [
  {
    title: "Bubble Sort",
    description: "Step-by-step simulation of Bubble Sort algorithm.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="16" r="4" fill="#10B981" opacity="0.8" />
        <circle cx="16" cy="12" r="4" fill="#3B82F6" />
        <circle cx="24" cy="20" r="4" fill="#EF4444" opacity="0.8" />
        <path
          d="M12 16h2M20 12h2"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 14l2 2M18 14l2 2"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    route: "/bubble",
  },
  {
    title: "Quick Sort",
    description: "Visualize partitioning and recursive sorting.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="3" height="16" rx="1.5" fill="#10B981" />
        <rect x="9" y="8" width="3" height="20" rx="1.5" fill="#3B82F6" />
        <rect x="14" y="16" width="3" height="12" rx="1.5" fill="#F59E0B" />
        <rect x="19" y="4" width="3" height="24" rx="1.5" fill="#EF4444" />
        <rect x="24" y="20" width="3" height="8" rx="1.5" fill="#8B5CF6" />
        <path
          d="M2 2l28 28"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
    timeComplexity: "O(n log n) (avg), O(n²) (worst)",
    spaceComplexity: "O(log n)",
    route: "/quick",
  },
  {
    title: "Merge Sort",
    description: "Watch divide and conquer in action.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M4 8h8M20 8h8M4 16h24M4 24h8M20 24h8"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 8v8M20 8v8M12 16v8M20 16v8"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2" fill="#F59E0B" />
      </svg>
    ),
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    route: "/merge",
  },
  {
    title: "Heap Sort",
    description: "Build and flatten the heap visually.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="8" r="3" fill="#10B981" />
        <circle cx="10" cy="16" r="2.5" fill="#3B82F6" />
        <circle cx="22" cy="16" r="2.5" fill="#3B82F6" />
        <circle cx="6" cy="24" r="2" fill="#F59E0B" />
        <circle cx="14" cy="24" r="2" fill="#F59E0B" />
        <circle cx="18" cy="24" r="2" fill="#F59E0B" />
        <circle cx="26" cy="24" r="2" fill="#F59E0B" />
        <path
          d="M16 11l-4 3M16 11l4 3M10 18.5l-3 3.5M10 18.5l3 3.5M22 18.5l-3 3.5M22 18.5l3 3.5"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    route: "/heap",
  },
  {
    title: "Selection Sort",
    description: "Understand how the smallest element is selected.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="20" width="4" height="8" rx="2" fill="#EF4444" />
        <rect x="10" y="16" width="4" height="12" rx="2" fill="#F59E0B" />
        <rect x="16" y="12" width="4" height="16" rx="2" fill="#10B981" />
        <rect x="22" y="8" width="4" height="20" rx="2" fill="#3B82F6" />
        <circle
          cx="6"
          cy="6"
          r="3"
          fill="#10B981"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          d="M6 9l0 9"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
      </svg>
    ),
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    route: "/selection",
  },
  {
    title: "A* Algorithm",
    description: "Pathfinding using heuristics and cost.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M4 28h24v-4H4v4zM8 24h16v-4H8v4zM12 20h8v-4h-8v4zM16 16h0"
          stroke="#10B981"
          strokeWidth="2"
          fill="#10B981"
          opacity="0.3"
        />
        <circle cx="6" cy="26" r="2" fill="#3B82F6" />
        <circle cx="26" cy="18" r="2" fill="#EF4444" />
        <path
          d="M8 24l16-8"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        <polygon points="24,14 28,18 24,22" fill="#F59E0B" />
      </svg>
    ),
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    route: "/astar",
  },
  {
    title: "Dijkstra",
    description: "Shortest path calculation in weighted graphs.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="6" cy="16" r="3" fill="#10B981" />
        <circle cx="16" cy="8" r="3" fill="#3B82F6" />
        <circle cx="16" cy="24" r="3" fill="#3B82F6" />
        <circle cx="26" cy="16" r="3" fill="#EF4444" />
        <path
          d="M9 16h4M13 11l3-2M13 21l3 2M19 16h4"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="12" y="18" fontSize="8" fill="#F59E0B" fontWeight="bold">
          3
        </text>
        <text x="18" y="6" fontSize="8" fill="#F59E0B" fontWeight="bold">
          2
        </text>
        <text x="18" y="30" fontSize="8" fill="#F59E0B" fontWeight="bold">
          4
        </text>
        <text x="21" y="18" fontSize="8" fill="#F59E0B" fontWeight="bold">
          1
        </text>
      </svg>
    ),
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    route: "/dijkstra",
  },
  {
    title: "DFS",
    description: "Explore deep into a graph recursively.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="8" r="3" fill="#10B981" />
        <circle cx="8" cy="16" r="2.5" fill="#3B82F6" />
        <circle cx="8" cy="24" r="2" fill="#F59E0B" />
        <circle cx="16" cy="24" r="2" fill="#EF4444" />
        <circle cx="24" cy="16" r="2.5" fill="#8B5CF6" />
        <path
          d="M8 11v2M8 18.5v3M11 24h3M10.5 15.5l11.5 0.5"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 5l0 19l8 0l8-8"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="6 3"
        />
      </svg>
    ),
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    route: "/dfs",
  },
  {
    title: "BFS",
    description: "Level-wise traversal in graphs.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="6" r="3" fill="#10B981" />
        <circle cx="8" cy="14" r="2.5" fill="#3B82F6" />
        <circle cx="24" cy="14" r="2.5" fill="#3B82F6" />
        <circle cx="4" cy="22" r="2" fill="#F59E0B" />
        <circle cx="12" cy="22" r="2" fill="#F59E0B" />
        <circle cx="20" cy="22" r="2" fill="#F59E0B" />
        <circle cx="28" cy="22" r="2" fill="#F59E0B" />
        <path
          d="M14 8l-4 4M18 8l4 4M6 16l-1 4M10 16l1 4M22 16l-1 4M26 16l1 4"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="16"
          cy="6"
          rx="8"
          ry="2"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 2"
          opacity="0.7"
        />
        <ellipse
          cx="16"
          cy="14"
          rx="12"
          ry="2"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 2"
          opacity="0.7"
        />
      </svg>
    ),
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    route: "/bfs",
  },
  {
    title: "Topological Sort",
    description: "Sort tasks based on dependency order.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="6" height="4" rx="2" fill="#10B981" />
        <rect x="14" y="4" width="6" height="4" rx="2" fill="#3B82F6" />
        <rect x="24" y="4" width="6" height="4" rx="2" fill="#F59E0B" />
        <rect x="4" y="14" width="6" height="4" rx="2" fill="#EF4444" />
        <rect x="14" y="14" width="6" height="4" rx="2" fill="#8B5CF6" />
        <rect x="14" y="24" width="6" height="4" rx="2" fill="#06B6D4" />
        <path
          d="M10 6h4M20 6h4M7 8v6M17 8v6M17 18v6"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polygon points="13,12 15,14 13,16" fill="#6B7280" />
        <polygon points="13,22 15,24 13,26" fill="#6B7280" />
        <polygon points="23,12 25,14 23,16" fill="#6B7280" />
      </svg>
    ),
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    route: "/topo",
  },
];
