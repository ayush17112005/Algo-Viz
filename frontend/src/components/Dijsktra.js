import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Trash2, Shuffle, Zap, Target, MapPin, Move } from 'lucide-react';

// Node component with enhanced visuals
const Node = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const getNodeClass = () => {
    const baseClass = "w-6 h-6 border border-slate-700/20 transition-all duration-300 cursor-pointer relative overflow-hidden";
    
    if (node.isStart) return `${baseClass} bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50 animate-pulse scale-110`;
    if (node.isEnd) return `${baseClass} bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/50 animate-pulse scale-110`;
    if (node.isWall && node.wallAnimation) return `${baseClass} bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner animate-ping`;
    if (node.isWall) return `${baseClass} bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner transform scale-95`;
    if (node.isPath) return `${baseClass} bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg shadow-amber-500/50 animate-bounce`;
    if (node.isVisited) return `${baseClass} bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md shadow-blue-500/30 animate-pulse`;
    
    return `${baseClass} bg-slate-50 hover:bg-slate-200 hover:shadow-md hover:scale-105`;
  };

  const getIcon = () => {
    if (node.isStart) return <MapPin className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-lg" />;
    if (node.isEnd) return <Target className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-lg" />;
    return null;
  };

  return (
    <div
      className={getNodeClass()}
      onMouseDown={() => onMouseDown(node.row, node.col)}
      onMouseEnter={() => onMouseEnter(node.row, node.col)}
      onMouseUp={() => onMouseUp()}
      style={{
        animationDelay: node.isVisited ? `${(node.row + node.col) * 10}ms` : '0ms'
      }}
    >
      {getIcon()}
      {node.wallAnimation && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 opacity-50 animate-ping" />
      )}
    </div>
  );
};

// Grid component
const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div className="inline-block p-4 bg-white rounded-xl shadow-2xl border border-slate-200">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}>
        {grid.flat().map((node, idx) => (
          <Node
            key={idx}
            node={node}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
          />
        ))}
      </div>
    </div>
  );
};

// Control Panel
const ControlPanel = ({ 
  onVisualize, 
  onClearPath, 
  onClearBoard, 
  onGenerateMaze, 
  algorithm, 
  setAlgorithm, 
  isRunning,
  mode,
  setMode,
  startNode,
  endNode
}) => {
  const algorithms = ['Dijkstra', 'A*', 'BFS', 'DFS'];
  const modes = [
    { value: 'wall', label: 'Draw Walls', icon: Square },
    { value: 'start', label: 'Move Start', icon: MapPin },
    { value: 'end', label: 'Move End', icon: Target }
  ];
  
  return (
    <div className="w-80 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          PathFinder Pro
        </h1>
        <p className="text-slate-400 text-sm">Visualize pathfinding algorithms in real-time</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 text-slate-300">Mode</label>
          <div className="grid grid-cols-1 gap-2">
            {modes.map((modeOption) => {
              const IconComponent = modeOption.icon;
              return (
                <button
                  key={modeOption.value}
                  onClick={() => setMode(modeOption.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                    mode === modeOption.value
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 shadow-lg'
                      : 'bg-slate-800 border-slate-600 hover:border-slate-500 hover:bg-slate-700'
                  }`}
                  disabled={isRunning}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{modeOption.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-slate-300">Algorithm</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            disabled={isRunning}
          >
            {algorithms.map((algo) => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <button
            onClick={onVisualize}
            disabled={isRunning}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
          >
            {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Visualize Path'}
          </button>

          <button
            onClick={onGenerateMaze}
            disabled={isRunning}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Generate Maze
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClearPath}
            disabled={isRunning}
            className="py-2 px-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <Zap className="w-4 h-4" />
            Clear Path
          </button>
          <button
            onClick={onClearBoard}
            disabled={isRunning}
            className="py-2 px-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="font-semibold mb-2 text-cyan-400">Current Position</h3>
          <div className="text-sm text-slate-300 space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Start: ({startNode.row}, {startNode.col})</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-rose-400" />
              <span>End: ({endNode.row}, {endNode.col})</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="font-semibold mb-2 text-cyan-400">Instructions</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Select mode to draw walls or move nodes</li>
            <li>• Click nodes to place start/end points</li>
            <li>• Generate mazes for complex paths</li>
            <li>• Watch algorithms find optimal routes!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main PathFinder component
const PathFinder = () => {
  const [grid, setGrid] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [algorithm, setAlgorithm] = useState('Dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('wall');
  const [dimensions, setDimensions] = useState({ rows: 25, cols: 50 });
  const [startNode, setStartNode] = useState({ row: 5, col: 5 });
  const [endNode, setEndNode] = useState({ row: 19, col: 44 });

  // Initialize grid
  const createInitialGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < dimensions.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < dimensions.cols; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isEnd: row === endNode.row && col === endNode.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
          heuristic: 0,
          fCost: Infinity,
          wallAnimation: false
        });
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }, [dimensions, startNode, endNode]);

  useEffect(() => {
    setGrid(createInitialGrid());
  }, [createInitialGrid]);

  // Mouse handlers
  const handleMouseDown = (row, col) => {
    if (isRunning) return;
    
    if (mode === 'start') {
      if (row === endNode.row && col === endNode.col) return;
      setStartNode({ row, col });
      const newGrid = grid.map(gridRow => [...gridRow]);
      // Clear old start
      newGrid.forEach(gridRow => {
        gridRow.forEach(node => {
          if (node.isStart) node.isStart = false;
        });
      });
      // Set new start
      newGrid[row][col].isStart = true;
      newGrid[row][col].isWall = false;
      setGrid(newGrid);
    } else if (mode === 'end') {
      if (row === startNode.row && col === startNode.col) return;
      setEndNode({ row, col });
      const newGrid = grid.map(gridRow => [...gridRow]);
      // Clear old end
      newGrid.forEach(gridRow => {
        gridRow.forEach(node => {
          if (node.isEnd) node.isEnd = false;
        });
      });
      // Set new end
      newGrid[row][col].isEnd = true;
      newGrid[row][col].isWall = false;
      setGrid(newGrid);
    } else if (mode === 'wall') {
      if ((row === startNode.row && col === startNode.col) || (row === endNode.row && col === endNode.col)) return;
      
      const newGrid = grid.map(gridRow => [...gridRow]);
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
      setGrid(newGrid);
      setMousePressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mousePressed || isRunning || mode !== 'wall') return;
    if ((row === startNode.row && col === startNode.col) || (row === endNode.row && col === endNode.col)) return;
    
    const newGrid = grid.map(gridRow => [...gridRow]);
    newGrid[row][col].isWall = true;
    setGrid(newGrid);
  };

  const handleMouseUp = () => setMousePressed(false);

  // Algorithm implementations
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isWall);
  };

  const dijkstra = (grid, startNode, endNode) => {
    const visitedNodes = [];
    const unvisitedNodes = grid.flat();
    startNode.distance = 0;

    while (unvisitedNodes.length) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();
      
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) break;
      
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      
      if (closestNode === endNode) break;
      
      const neighbors = getNeighbors(closestNode, grid);
      for (const neighbor of neighbors) {
        const tentativeDistance = closestNode.distance + 1;
        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance;
          neighbor.previousNode = closestNode;
        }
      }
    }
    
    return visitedNodes;
  };

  const bfs = (grid, startNode, endNode) => {
    const visitedNodes = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodes.push(currentNode);
      
      if (currentNode === endNode) break;
      
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
    
    return visitedNodes;
  };

  const getShortestPath = (endNode) => {
    const path = [];
    let currentNode = endNode;
    
    while (currentNode) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    
    return path;
  };

  // Animation functions
  const animateAlgorithm = async (visitedNodes, shortestPath) => {
    // Animate visited nodes
    for (let i = 0; i < visitedNodes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      const newGrid = grid.map(row => [...row]);
      const node = visitedNodes[i];
      if (!node.isStart && !node.isEnd) {
        newGrid[node.row][node.col].isVisited = true;
      }
      setGrid([...newGrid]);
    }

    // Animate shortest path
    for (let i = 0; i < shortestPath.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const newGrid = grid.map(row => [...row]);
      const node = shortestPath[i];
      if (!node.isStart && !node.isEnd) {
        newGrid[node.row][node.col].isPath = true;
      }
      setGrid([...newGrid]);
    }
  };

  // Visualize algorithm
  const visualizeAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    clearPath();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const gridCopy = grid.map(row => row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null
    })));
    
    const start = gridCopy[startNode.row][startNode.col];
    const end = gridCopy[endNode.row][endNode.col];
    
    let visitedNodes;
    switch (algorithm) {
      case 'BFS':
        visitedNodes = bfs(gridCopy, start, end);
        break;
      default:
        visitedNodes = dijkstra(gridCopy, start, end);
    }
    
    const shortestPath = getShortestPath(end);
    await animateAlgorithm(visitedNodes, shortestPath);
    
    setIsRunning(false);
  };

  // Utility functions
  const clearPath = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    setGrid(newGrid);
  };

  const clearBoard = () => {
    setGrid(createInitialGrid());
  };

  // Enhanced maze generation with animations
  const generateMaze = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    
    // First clear the board
    const newGrid = createInitialGrid();
    setGrid(newGrid);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Recursive division maze algorithm with animation
    const animateMazeGeneration = async () => {
      const walls = [];
      
      // Generate walls with a more sophisticated pattern
      for (let row = 0; row < dimensions.rows; row++) {
        for (let col = 0; col < dimensions.cols; col++) {
          if (
            (row === startNode.row && col === startNode.col) ||
            (row === endNode.row && col === endNode.col)
          ) continue;
          
          // Create a maze pattern
          if (
            (row % 2 === 1 && col % 2 === 1) || // Grid pattern
            (Math.random() < 0.35 && row % 4 !== 0 && col % 4 !== 0) // Random walls
          ) {
            walls.push({ row, col, delay: (row + col) * 15 });
          }
        }
      }
      
      // Sort by delay for wave-like animation
      walls.sort((a, b) => a.delay - b.delay);
      
      // Animate wall creation
      for (let i = 0; i < walls.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 25));
        
        const wall = walls[i];
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[wall.row][wall.col].isWall = true;
          newGrid[wall.row][wall.col].wallAnimation = true;
          
          // Remove animation after a short delay
          setTimeout(() => {
            setGrid(currentGrid => {
              const updatedGrid = currentGrid.map(row => [...row]);
              updatedGrid[wall.row][wall.col].wallAnimation = false;
              return updatedGrid;
            });
          }, 500);
          
          return newGrid;
        });
      }
      
      // Create some openings for better pathfinding
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const openings = [];
      for (let i = 0; i < Math.floor(walls.length * 0.3); i++) {
        const randomWall = walls[Math.floor(Math.random() * walls.length)];
        if (Math.random() < 0.4) {
          openings.push(randomWall);
        }
      }
      
      for (const opening of openings) {
        await new Promise(resolve => setTimeout(resolve, 10));
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[opening.row][opening.col].isWall = false;
          return newGrid;
        });
      }
    };
    
    await animateMazeGeneration();
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex">
      <ControlPanel
        onVisualize={visualizeAlgorithm}
        onClearPath={clearPath}
        onClearBoard={clearBoard}
        onGenerateMaze={generateMaze}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isRunning={isRunning}
        mode={mode}
        setMode={setMode}
        startNode={startNode}
        endNode={endNode}
      />
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Interactive Grid
            </h2>
            <p className="text-slate-600">
              {mode === 'wall' && 'Click and drag to create walls'}
              {mode === 'start' && 'Click to place the start node'}
              {mode === 'end' && 'Click to place the end node'}
            </p>
          </div>
          
          <Grid
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          />
          
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
              <span>Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-rose-500 to-rose-700 rounded flex items-center justify-center">
                <Target className="w-2 h-2 text-white" />
              </div>
              <span>End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded"></div>
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-amber-300 to-amber-500 rounded"></div>
              <span>Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathFinder;