// Updated HeapSort implementation with nested state
export const HeapSort = {
  generateSteps: (arr) => {
    const steps = [];
    const array = [...arr];
    const n = array.length;

    // Helper function to create state object
    const createState = (step) => ({
      state: {
        comparing: step.comparing || [],
        swapping: step.swapping || [],
        sorted: step.sorted || [],
        heap: step.heap || [],
      },
      array: [...step.array],
      description: step.description,
    });

    // Initial step
    steps.push(
      createState({
        array,
        comparing: [],
        swapping: [],
        sorted: [],
        heap: [],
        description: "Starting HeapSort: Building max heap from the array",
      })
    );

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapifySteps(array, n, i, steps, createState);
    }

    steps.push(
      createState({
        array,
        comparing: [],
        swapping: [],
        sorted: [],
        heap: Array.from({ length: n }, (_, i) => i),
        description: "Max heap built! Root contains the maximum element",
      })
    );

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      steps.push(
        createState({
          array,
          comparing: [0, i],
          swapping: [],
          sorted: Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
          heap: Array.from({ length: i + 1 }, (_, idx) => idx),
          description: `Swapping root (${array[0]}) with last element (${array[i]})`,
        })
      );

      [array[0], array[i]] = [array[i], array[0]];

      steps.push(
        createState({
          array,
          comparing: [],
          swapping: [0, i],
          sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
          heap: Array.from({ length: i }, (_, idx) => idx),
          description: `Swapped! Element ${array[i]} is now in its final position`,
        })
      );

      heapifySteps(array, i, 0, steps, createState);
    }

    // Final step
    steps.push(
      createState({
        array,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        heap: [],
        description: "HeapSort completed! Array is now fully sorted",
      })
    );

    return steps;
  },
};

function heapifySteps(arr, n, i, steps, createState) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n) {
    steps.push(
      createState({
        array: arr,
        comparing: [largest, left],
        swapping: [],
        sorted: [],
        heap: Array.from({ length: n }, (_, idx) => idx),
        description: `Comparing parent (${arr[largest]}) with left child (${arr[left]})`,
      })
    );

    if (arr[left] > arr[largest]) {
      largest = left;
      steps.push(
        createState({
          array: arr,
          comparing: [largest],
          swapping: [],
          sorted: [],
          heap: Array.from({ length: n }, (_, idx) => idx),
          description: `Left child (${arr[left]}) is larger, updating largest`,
        })
      );
    }
  }

  if (right < n) {
    steps.push(
      createState({
        array: arr,
        comparing: [largest, right],
        swapping: [],
        sorted: [],
        heap: Array.from({ length: n }, (_, idx) => idx),
        description: `Comparing current largest (${arr[largest]}) with right child (${arr[right]})`,
      })
    );

    if (arr[right] > arr[largest]) {
      largest = right;
      steps.push(
        createState({
          array: arr,
          comparing: [largest],
          swapping: [],
          sorted: [],
          heap: Array.from({ length: n }, (_, idx) => idx),
          description: `Right child (${arr[right]}) is larger, updating largest`,
        })
      );
    }
  }

  if (largest !== i) {
    steps.push(
      createState({
        array: arr,
        comparing: [i, largest],
        swapping: [],
        sorted: [],
        heap: Array.from({ length: n }, (_, idx) => idx),
        description: `Swapping parent (${arr[i]}) with largest child (${arr[largest]})`,
      })
    );

    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    steps.push(
      createState({
        array: arr,
        comparing: [],
        swapping: [i, largest],
        sorted: [],
        heap: Array.from({ length: n }, (_, idx) => idx),
        description: `Swapped! Now heapifying the affected subtree`,
      })
    );

    heapifySteps(arr, n, largest, steps, createState);
  }
}
