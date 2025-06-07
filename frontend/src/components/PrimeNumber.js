import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Code, Info, X } from 'lucide-react';

const SieveVisualizer = () => {
  const [numbers, setNumbers] = useState([]);
  const [maxNumber, setMaxNumber] = useState(30);
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(2);
  const [showCode, setShowCode] = useState(false);
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(false);
  const [step, setStep] = useState(0);

  const initializeGrid = useCallback(() => {
    const grid = [];
    for (let i = 1; i <= maxNumber; i++) {
      grid.push({
        value: i,
        isPrime: i > 1,
        isMarked: false,
        isCurrentlyChecking: false,
        isMultiple: false
      });
    }
    return grid;
  }, [maxNumber]);

  useEffect(() => {
    setNumbers(initializeGrid());
    setCurrentNumber(2);
    setStep(0);
  }, [maxNumber, initializeGrid]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sieveAlgorithm = async () => {
    setIsRunning(true);
    const newNumbers = initializeGrid();
    let current = 2;

    while (current * current <= maxNumber) {
      if (newNumbers[current - 1].isPrime) {
        // Highlight current prime
        newNumbers[current - 1].isCurrentlyChecking = true;
        setNumbers([...newNumbers]);
        setCurrentNumber(current);
        await sleep(speed);

        // Mark multiples
        for (let multiple = current * current; multiple <= maxNumber; multiple += current) {
          newNumbers[multiple - 1].isPrime = false;
          newNumbers[multiple - 1].isMultiple = true;
          setNumbers([...newNumbers]);
          await sleep(speed / 2);
        }

        // Remove highlighting
        newNumbers[current - 1].isCurrentlyChecking = false;
        for (let i = 0; i < newNumbers.length; i++) {
          newNumbers[i].isMultiple = false;
        }
        setNumbers([...newNumbers]);
      }
      current++;
      setStep(prev => prev + 1);
    }

    setIsRunning(false);
    setCurrentNumber(-1);
  };

  const reset = () => {
    setNumbers(initializeGrid());
    setCurrentNumber(2);
    setIsRunning(false);
    setStep(0);
  };

  const getCellStyle = (number) => {
    let baseStyle = "w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-sm font-semibold transition-all duration-300 transform cursor-pointer ";
    
    if (number.value === 1) {
      return baseStyle + "bg-gray-200 text-gray-500";
    }
    
    if (number.isCurrentlyChecking) {
      return baseStyle + "bg-blue-500 text-white scale-110 shadow-lg border-blue-600 animate-pulse";
    }
    
    if (number.isMultiple) {
      return baseStyle + "bg-red-400 text-white scale-105 border-red-500";
    }
    
    if (number.isPrime) {
      return baseStyle + "bg-green-400 text-white border-green-500 hover:bg-green-500";
    } else {
      return baseStyle + "bg-red-200 text-red-700 border-red-300";
    }
  };

  const codeSnippet = `function sieveOfEratosthenes(n) {
    // Create array of consecutive integers from 2 to n
    let numbers = [];
    for (let i = 2; i <= n; i++) {
        numbers[i] = true;
    }
    
    // Start with the first prime number, 2
    let p = 2;
    
    while (p * p <= n) {
        // If numbers[p] is not changed, then it's prime
        if (numbers[p] === true) {
            // Mark all multiples of p as composite
            for (let i = p * p; i <= n; i += p) {
                numbers[i] = false;
            }
        }
        p++;
    }
    
    // Collect all prime numbers
    let primes = [];
    for (let i = 2; i <= n; i++) {
        if (numbers[i] === true) {
            primes.push(i);
        }
    }
    
    return primes;
}`;

  const primeCount = numbers.filter(n => n.isPrime).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sieve of Eratosthenes Visualizer
          </h1>
          <p className="text-gray-600 text-lg">
            Watch how this ancient algorithm finds prime numbers by eliminating composites
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Max Number:</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="w-32"
                />
                <span className="text-sm font-semibold text-gray-700 w-8">{maxNumber}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Speed:</label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="w-32"
                />
                <span className="text-sm font-semibold text-gray-700">{speed}ms</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={isRunning ? () => setIsRunning(false) : sieveAlgorithm}
                disabled={isRunning && currentNumber === -1}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={reset}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              
              <button
                onClick={() => setShowCode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Code className="w-4 h-4" />
                View Code
              </button>
              
              <button
                onClick={() => setShowAlgorithmInfo(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                How it Works
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Current Step:</span>
                <span className="ml-2 text-blue-600 font-semibold">{step}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Checking:</span>
                <span className="ml-2 text-blue-600 font-semibold">
                  {currentNumber > 0 ? currentNumber : 'Complete!'}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Primes Found:</span>
                <span className="ml-2 text-green-600 font-semibold">{primeCount}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 border border-green-500 rounded"></div>
                <span>Prime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                <span>Composite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded"></div>
                <span>Checking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 border border-red-500 rounded"></div>
                <span>Multiple</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div 
            className="grid gap-2 justify-center"
            style={{
              gridTemplateColumns: `repeat(${Math.min(10, Math.ceil(Math.sqrt(maxNumber)))}, minmax(0, 1fr))`
            }}
          >
            {numbers.map((number, index) => (
              <div
                key={index}
                className={getCellStyle(number)}
                title={`${number.value}: ${number.value === 1 ? 'Neither prime nor composite' : number.isPrime ? 'Prime' : 'Composite'}`}
              >
                {number.value}
              </div>
            ))}
          </div>
        </div>

        {/* Prime Numbers List */}
        {primeCount > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Prime Numbers Found ({primeCount}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {numbers
                .filter(n => n.isPrime)
                .map((prime, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {prime.value}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Sieve of Eratosthenes Code</h3>
              <button
                onClick={() => setShowCode(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Algorithm Info Modal */}
      {showAlgorithmInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">How the Sieve of Eratosthenes Works</h3>
              <button
                onClick={() => setShowAlgorithmInfo(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Algorithm Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>Initialize:</strong> Create a list of consecutive integers from 2 to n</li>
                  <li><strong>Start with 2:</strong> Begin with the first prime number, 2</li>
                  <li><strong>Mark Multiples:</strong> Mark all multiples of the current prime (starting from its square) as composite</li>
                  <li><strong>Find Next Prime:</strong> Move to the next unmarked number</li>
                  <li><strong>Repeat:</strong> Continue until you've processed all numbers up to √n</li>
                  <li><strong>Result:</strong> All unmarked numbers are prime</li>
                </ol>

                <h4 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Key Insights:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Efficiency:</strong> We only need to check up to √n because any composite number greater than √n must have already been marked</li>
                  <li><strong>Starting Point:</strong> When marking multiples, we start from p² because smaller multiples have already been marked</li>
                  <li><strong>Time Complexity:</strong> O(n log log n) - much faster than checking each number individually</li>
                  <li><strong>Space Complexity:</strong> O(n) - we need to store the status of each number</li>
                </ul>

                <h4 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Historical Context:</h4>
                <p className="text-gray-700">
                  Named after the ancient Greek mathematician Eratosthenes of Cyrene (276-194 BC), this algorithm 
                  is one of the most efficient ways to find all prime numbers up to a given number. Eratosthenes 
                  was also famous for calculating the Earth's circumference with remarkable accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SieveVisualizer;