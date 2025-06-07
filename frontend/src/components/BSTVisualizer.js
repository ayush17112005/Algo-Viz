import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Code, HelpCircle, Plus } from "lucide-react";

// Tree Node Class
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

// BST Class
class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    this.root = this.insertHelper(this.root, val);
  }

  insertHelper(node, val) {
    if (!node) return new TreeNode(val);
    if (val < node.val) {
      node.left = this.insertHelper(node.left, val);
    } else if (val > node.val) {
      node.right = this.insertHelper(node.right, val);
    }
    return node;
  }

  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }

  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.val);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.val);
    }
    return result;
  }
}

const BSTVisualizer = () => {
  const [bst] = useState(new BST());
  const [treeData, setTreeData] = useState(null);
  const [currentTraversal, setCurrentTraversal] = useState("inorder");
  const [traversalStep, setTraversalStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Initialize with sample data
  useEffect(() => {
    const sampleValues = [50, 30, 70, 20, 40, 60, 80];
    sampleValues.forEach((val) => bst.insert(val));
    updateTreeLayout();
  }, []);

  const updateTreeLayout = () => {
    if (!bst.root) return;

    const calculatePositions = (node, x, y, spacing) => {
      if (!node) return;
      node.x = x;
      node.y = y;

      if (node.left) {
        calculatePositions(node.left, x - spacing, y + 80, spacing / 2);
      }
      if (node.right) {
        calculatePositions(node.right, x + spacing, y + 80, spacing / 2);
      }
    };

    calculatePositions(bst.root, 400, 60, 150);
    setTreeData({ ...bst.root });
  };

  const addNode = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      bst.insert(val);
      updateTreeLayout();
      setInputValue("");
      resetTraversal();
    }
  };

  const resetTraversal = () => {
    setTraversalStep(0);
    setVisitedNodes([]);
    setCurrentNode(null);
    setIsPlaying(false);
  };

  const getTraversalSteps = useCallback(() => {
    const steps = [];
    const traverse = (node, type) => {
      if (!node) return;

      if (type === "preorder") {
        steps.push(node.val);
        traverse(node.left, type);
        traverse(node.right, type);
      } else if (type === "inorder") {
        traverse(node.left, type);
        steps.push(node.val);
        traverse(node.right, type);
      } else if (type === "postorder") {
        traverse(node.left, type);
        traverse(node.right, type);
        steps.push(node.val);
      }
    };

    traverse(bst.root, currentTraversal);
    return steps;
  }, [currentTraversal, bst.root]);

  useEffect(() => {
    if (isPlaying) {
      const steps = getTraversalSteps();
      if (traversalStep < steps.length) {
        const timer = setTimeout(() => {
          setCurrentNode(steps[traversalStep]);
          setVisitedNodes((prev) => [...prev, steps[traversalStep]]);
          setTraversalStep((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, traversalStep, getTraversalSteps]);

  const renderTree = (node) => {
    if (!node) return null;

    const isVisited = visitedNodes.includes(node.val);
    const isCurrent = currentNode === node.val;

    return (
      <g key={node.val}>
        {/* Render edges first */}
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#64748b"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#64748b"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}

        {/* Render node */}
        <circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill={isCurrent ? "#ef4444" : isVisited ? "#22c55e" : "#3b82f6"}
          stroke={isCurrent ? "#dc2626" : isVisited ? "#16a34a" : "#2563eb"}
          strokeWidth="3"
          className="transition-all duration-500 drop-shadow-lg"
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {node.val}
        </text>

        {/* Recursively render children */}
        {renderTree(node.left)}
        {renderTree(node.right)}
      </g>
    );
  };

  const codeExamples = {
    inorder: `function inorderTraversal(node) {
  if (node === null) return;
  
  inorderTraversal(node.left);   // Visit left subtree
  console.log(node.val);         // Process current node
  inorderTraversal(node.right);  // Visit right subtree
}`,
    preorder: `function preorderTraversal(node) {
  if (node === null) return;
  
  console.log(node.val);         // Process current node
  preorderTraversal(node.left);  // Visit left subtree
  preorderTraversal(node.right); // Visit right subtree
}`,
    postorder: `function postorderTraversal(node) {
  if (node === null) return;
  
  postorderTraversal(node.left);  // Visit left subtree
  postorderTraversal(node.right); // Visit right subtree
  console.log(node.val);          // Process current node
}`,
  };

  const explanations = {
    inorder:
      "In-order traversal visits nodes in ascending order (Left → Root → Right). This is particularly useful for BSTs as it gives you the values in sorted order.",
    preorder:
      "Pre-order traversal visits the root first, then left and right subtrees (Root → Left → Right). This is useful for creating a copy of the tree or prefix expressions.",
    postorder:
      "Post-order traversal visits children before the parent (Left → Right → Root). This is useful for deleting trees or calculating directory sizes.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Binary Search Tree Visualizer
          </h1>
          <p className="text-xl text-gray-300">
            Interactive visualization of tree traversal algorithms
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg p-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-24 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <button
              onClick={addNode}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <select
            value={currentTraversal}
            onChange={(e) => {
              setCurrentTraversal(e.target.value);
              resetTraversal();
            }}
            className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg text-white"
          >
            <option value="inorder">In-order</option>
            <option value="preorder">Pre-order</option>
            <option value="postorder">Post-order</option>
          </select>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTraversal}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
          >
            <RotateCcw size={20} />
            Reset
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Code size={20} />
            {showCode ? "Hide Code" : "Show Code"}
          </button>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <HelpCircle size={20} />
            How it Works
          </button>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span>Visited</span>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <svg width="800" height="400" className="mx-auto">
            {treeData && renderTree(treeData)}
          </svg>
        </div>

        {/* Traversal Result */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 capitalize">
            {currentTraversal} Traversal Result:
          </h3>
          <div className="flex flex-wrap gap-2">
            {getTraversalSteps().map((val, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-300 ${
                  index < traversalStep
                    ? "bg-green-600 text-white"
                    : index === traversalStep && isPlaying
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-slate-700 text-gray-300"
                }`}
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Code Display */}
        {showCode && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize">
              {currentTraversal} Traversal Code:
            </h3>
            <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400">
                {codeExamples[currentTraversal]}
              </code>
            </pre>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">How It Works:</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {explanations[currentTraversal]}
            </p>
            <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold mb-2">
                General Tree Traversal Concepts:
              </h4>
              <ul className="text-gray-300 space-y-1">
                <li>
                  • Tree traversal is the process of visiting each node exactly
                  once
                </li>
                <li>
                  • The order of visiting determines the type of traversal
                </li>
                <li>
                  • Each traversal has specific use cases in computer science
                </li>
                <li>
                  • Time complexity: O(n), Space complexity: O(h) where h is
                  height
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BSTVisualizer;
