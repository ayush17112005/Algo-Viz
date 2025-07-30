import React from "react";
import GraphTraversalVisualizer from "../components/DFS_BFS_Components/GraphTraversal";
import { generateBFSSteps } from "../animations/Graph/BFS";
import { bfsCode } from "../algorithms/BFS";

const BFSVisualizer = () => (
  <GraphTraversalVisualizer
    algorithmType="BFS"
    generateSteps={generateBFSSteps}
    code={bfsCode}
  />
);

export default BFSVisualizer;
