import "./App.css";
import PathFinder from "./components/Dijsktra";
import SieveVisualizer from "./components/PrimeNumber";

function App() {
  return (
    <div className="App">
        <PathFinder />
        <SieveVisualizer/>
    </div>
  );
}

export default App;
