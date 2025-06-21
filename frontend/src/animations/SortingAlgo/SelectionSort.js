export const SelectionSort = {
  generateSteps: (arr) => {
    const steps = [];
    const array = [...arr];
    const n = array.length;

    // Helper function to create consistent state structure
    const createState = (step) => ({
      state: {
        comparing: step.comparing || [],
        swapping: step.swapping || [],
        sorted: step.sorted || [],
        currentMin: step.currentMin !== undefined ? step.currentMin : -1,
        currentIndex: step.currentIndex !== undefined ? step.currentIndex : -1,
      },
      array: [...step.array],
      description: step.description,
    });

    // Initial step
    steps.push(
      createState({
        array: array,
        comparing: [],
        swapping: [],
        sorted: [],
        currentMin: -1,
        currentIndex: -1,
        description:
          "Starting Selection Sort: Finding minimum element in unsorted portion",
      })
    );

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      steps.push(
        createState({
          array: array,
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          currentMin: minIndex,
          currentIndex: i,
          description: `Pass ${i + 1}: Assuming element at index ${i} (${
            array[i]
          }) is minimum`,
        })
      );

      for (let j = i + 1; j < n; j++) {
        steps.push(
          createState({
            array: array,
            comparing: [minIndex, j],
            swapping: [],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            currentMin: minIndex,
            currentIndex: i,
            description: `Comparing current minimum (${array[minIndex]}) with element (${array[j]})`,
          })
        );

        if (array[j] < array[minIndex]) {
          minIndex = j;
          steps.push(
            createState({
              array: array,
              comparing: [j],
              swapping: [],
              sorted: Array.from({ length: i }, (_, idx) => idx),
              currentMin: minIndex,
              currentIndex: i,
              description: `Found new minimum! Element ${array[j]} at index ${j} is smaller`,
            })
          );
        }
      }

      if (minIndex !== i) {
        steps.push(
          createState({
            array: array,
            comparing: [i, minIndex],
            swapping: [],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            currentMin: minIndex,
            currentIndex: i,
            description: `Swapping minimum element (${array[minIndex]}) with element at position ${i} (${array[i]})`,
          })
        );

        [array[i], array[minIndex]] = [array[minIndex], array[i]];

        steps.push(
          createState({
            array: array,
            comparing: [],
            swapping: [i, minIndex],
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            currentMin: -1,
            currentIndex: -1,
            description: `Swapped! Element ${array[i]} is now in its correct position`,
          })
        );
      } else {
        steps.push(
          createState({
            array: array,
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            currentMin: -1,
            currentIndex: -1,
            description: `No swap needed. Element ${array[i]} is already in correct position`,
          })
        );
      }
    }

    // Final step
    steps.push(
      createState({
        array: array,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        currentMin: -1,
        currentIndex: -1,
        description: "Selection Sort completed! Array is now fully sorted",
      })
    );

    return steps;
  },
};
