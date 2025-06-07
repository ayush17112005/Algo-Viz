import "./App.css";

import BSTVisualizer from "./components/BSTVisualizer";
import SortingVisualizer from "./components/SortingVisualizer";

import PathFinder from "./components/Dijsktra";
import SieveVisualizer from "./components/PrimeNumber";

function App() {
  return (
    <div className="App">
      <BSTVisualizer />
      <SortingVisualizer />
      <PathFinder />
      <SieveVisualizer />
    </div>
  );
}

export default App;
