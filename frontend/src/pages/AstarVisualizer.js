import React from "react";
import PathfindingVisualizer from "../components/PathFindingComponents/PathFindingVisualizer";
import { generateAStarSteps } from "../animations/Graph/Astart";
import { aStarCode } from "../algorithms/Astart";

const AStarVisualizer = () => {
  return (
    <PathfindingVisualizer
      algorithmType="astar"
      generateStepsFunction={generateAStarSteps}
      algorithmCode={aStarCode}
      codeTitle="A* Algorithm Implementation"
      configKey="Astar"
    />
  );
};

export default AStarVisualizer;
