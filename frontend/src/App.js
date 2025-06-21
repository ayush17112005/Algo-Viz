import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import BubbleSortVisualizer from "./pages/BubbleSortVisualizer";
import MergeSortVisualizer from "./pages/MergeSortVisualizer";
import QuickSortVisualizer from "./pages/QuickSortVisualizer";
import HeapSortVisualizer from "./pages/HeapSortVisualizer";
import SelectionSortVisualizer from "./pages/SelectionSortVisualizer";
import DijkstraVisualizer from "./pages/DijkstraVisualizer";
import BFSVisualizer from "./pages/BFSVisualizer";
import DFSVisualizer from "./pages/DFSVisualizer";
import TopologicalSortVisualizer from "./pages/TopoVisualizer";
import AStarVisualizer from "./pages/AstarVisualizer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bubble" element={<BubbleSortVisualizer />} />
        <Route path="/merge" element={<MergeSortVisualizer />} />
        <Route path="/quick" element={<QuickSortVisualizer />} />
        <Route path="heap" element={<HeapSortVisualizer />} />
        <Route path="/selection" element={<SelectionSortVisualizer />} />
        <Route path="/dijkstra" element={<DijkstraVisualizer />} />
        <Route path="/bfs" element={<BFSVisualizer />} />
        <Route path="dfs" element={<DFSVisualizer />} />
        <Route path="topo" element={<TopologicalSortVisualizer />} />
        <Route path="astar" element={<AStarVisualizer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
