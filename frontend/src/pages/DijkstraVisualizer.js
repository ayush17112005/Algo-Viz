import React from "react";
import PathfindingVisualizer from "../components/PathFindingComponents/PathFindingVisualizer";
import { DijkstraAlgorithm } from "../animations/Graph/Dijkstra";
import { dijkstraCode } from "../algorithms/Dijkstra";

const DijkstraVisualizer = () => {
  return (
    <PathfindingVisualizer
      algorithmType="dijkstra"
      generateStepsFunction={DijkstraAlgorithm.generateSteps}
      algorithmCode={dijkstraCode}
      codeTitle="Dijkstra's Algorithm Implementation"
      configKey="dijkstra"
    />
  );
};

export default DijkstraVisualizer;
