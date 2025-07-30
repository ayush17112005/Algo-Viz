import React from "react";
import GraphTraversalVisualizer from "../components/DFS_BFS_Components/GraphTraversal";
import { generateDFSSteps } from "../animations/Graph/DFS";
import { dfsCode } from "../algorithms/DFS";

const DFSVisualizer = () => (
  <GraphTraversalVisualizer
    algorithmType="DFS"
    generateSteps={generateDFSSteps}
    code={dfsCode}
  />
);

export default DFSVisualizer;
