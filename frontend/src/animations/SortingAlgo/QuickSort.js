// export const QuickSort = {
//   generateSteps: (array) => {
//     const steps = [];
//     const arr = [...array];

//     steps.push({
//       array: [...arr],
//       pivot: -1,
//       comparing: [],
//       swapping: [],
//       partitioned: [],
//       sorted: [],
//       left: -1,
//       right: -1,
//       description:
//         "Starting QuickSort - We'll select a pivot and partition the array",
//     });

//     const quickSortHelper = (arr, low, high, steps) => {
//       if (low < high) {
//         // Choose last element as pivot
//         const pivotIndex = high;

//         steps.push({
//           array: [...arr],
//           pivot: pivotIndex,
//           comparing: [],
//           swapping: [],
//           partitioned: [],
//           sorted: [],
//           left: low,
//           right: high,
//           description: `Selected pivot: ${arr[pivotIndex]} at position ${pivotIndex}`,
//         });

//         // Partition the array
//         const pi = partition(arr, low, high, steps);

//         // Mark pivot as in correct position
//         steps.push({
//           array: [...arr],
//           pivot: -1,
//           comparing: [],
//           swapping: [],
//           partitioned: [],
//           sorted: [pi],
//           left: -1,
//           right: -1,
//           description: `Pivot ${arr[pi]} is now in its correct position at index ${pi}`,
//         });

//         // Recursively sort left and right subarrays
//         quickSortHelper(arr, low, pi - 1, steps);
//         quickSortHelper(arr, pi + 1, high, steps);
//       }
//     };

//     const partition = (arr, low, high, steps) => {
//       const pivot = arr[high];
//       let i = low - 1;

//       for (let j = low; j < high; j++) {
//         steps.push({
//           array: [...arr],
//           pivot: high,
//           comparing: [j],
//           swapping: [],
//           partitioned: [],
//           sorted: [],
//           left: low,
//           right: high,
//           description: `Comparing ${arr[j]} with pivot ${pivot}`,
//         });

//         if (arr[j] < pivot) {
//           i++;

//           if (i !== j) {
//             steps.push({
//               array: [...arr],
//               pivot: high,
//               comparing: [],
//               swapping: [i, j],
//               partitioned: [],
//               sorted: [],
//               left: low,
//               right: high,
//               description: `${arr[j]} < ${pivot}, swapping positions ${i} and ${j}`,
//             });

//             [arr[i], arr[j]] = [arr[j], arr[i]];

//             steps.push({
//               array: [...arr],
//               pivot: high,
//               comparing: [],
//               swapping: [],
//               partitioned: Array.from({ length: i + 1 }, (_, k) => low + k),
//               sorted: [],
//               left: low,
//               right: high,
//               description: `Swapped! Elements ≤ pivot are now on the left`,
//             });
//           } else {
//             steps.push({
//               array: [...arr],
//               pivot: high,
//               comparing: [],
//               swapping: [],
//               partitioned: Array.from({ length: i + 1 }, (_, k) => low + k),
//               sorted: [],
//               left: low,
//               right: high,
//               description: `${arr[j]} < ${pivot}, already in correct partition`,
//             });
//           }
//         } else {
//           steps.push({
//             array: [...arr],
//             pivot: high,
//             comparing: [],
//             swapping: [],
//             partitioned:
//               i >= low ? Array.from({ length: i + 1 }, (_, k) => low + k) : [],
//             sorted: [],
//             left: low,
//             right: high,
//             description: `${arr[j]} ≥ ${pivot}, stays on the right`,
//           });
//         }
//       }

//       // Place pivot in correct position
//       steps.push({
//         array: [...arr],
//         pivot: high,
//         comparing: [],
//         swapping: [i + 1, high],
//         partitioned: [],
//         sorted: [],
//         left: low,
//         right: high,
//         description: `Placing pivot ${pivot} in its correct position`,
//       });

//       [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

//       return i + 1;
//     };

//     quickSortHelper(arr, 0, arr.length - 1, steps);

//     // Mark all elements as sorted
//     steps.push({
//       array: [...arr],
//       pivot: -1,
//       comparing: [],
//       swapping: [],
//       partitioned: [],
//       sorted: Array.from({ length: arr.length }, (_, k) => k),
//       left: -1,
//       right: -1,
//       description: "QuickSort Complete! Array is now fully sorted 🎉",
//     });

//     return steps;
//   },
// };
export const QuickSort = {
  generateSteps: (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    // Helper to create state object
    const createState = (step) => ({
      state: {
        pivot: step.pivot,
        comparing: step.comparing || [],
        swapping: step.swapping || [],
        partitioned: step.partitioned || [],
        sorted: step.sorted || [],
        left: step.left,
        right: step.right,
      },
      array: [...step.array],
      description: step.description,
    });

    // Initial step
    steps.push(
      createState({
        array: arr,
        pivot: -1,
        comparing: [],
        swapping: [],
        partitioned: [],
        sorted: [],
        left: -1,
        right: -1,
        description:
          "Starting QuickSort: We'll select a pivot and partition the array",
      })
    );

    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pivotIndex = high;

        steps.push(
          createState({
            array: arr,
            pivot: pivotIndex,
            comparing: [],
            swapping: [],
            partitioned: [],
            sorted: [],
            left: low,
            right: high,
            description: `Selected pivot: ${arr[pivotIndex]} at position ${pivotIndex}`,
          })
        );

        const pi = partition(low, high, pivotIndex);

        steps.push(
          createState({
            array: arr,
            pivot: -1,
            comparing: [],
            swapping: [],
            partitioned: [],
            sorted: [pi],
            left: -1,
            right: -1,
            description: `Pivot ${arr[pi]} is now in its correct position at index ${pi}`,
          })
        );

        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    const partition = (low, high, pivotIndex) => {
      const pivotValue = arr[pivotIndex];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        steps.push(
          createState({
            array: arr,
            pivot: pivotIndex,
            comparing: [j],
            swapping: [],
            partitioned:
              i >= low
                ? Array.from({ length: i - low + 1 }, (_, idx) => low + idx)
                : [],
            sorted: [],
            left: low,
            right: high,
            description: `Comparing ${arr[j]} with pivot ${pivotValue}`,
          })
        );

        if (arr[j] < pivotValue) {
          i++;

          if (i !== j) {
            steps.push(
              createState({
                array: arr,
                pivot: pivotIndex,
                comparing: [j],
                swapping: [i, j],
                partitioned:
                  i >= low
                    ? Array.from({ length: i - low + 1 }, (_, idx) => low + idx)
                    : [],
                sorted: [],
                left: low,
                right: high,
                description: `${arr[j]} < ${pivotValue}, swapping with element at ${i}`,
              })
            );

            [arr[i], arr[j]] = [arr[j], arr[i]];
          } else {
            steps.push(
              createState({
                array: arr,
                pivot: pivotIndex,
                comparing: [],
                swapping: [],
                partitioned:
                  i >= low
                    ? Array.from({ length: i - low + 1 }, (_, idx) => low + idx)
                    : [],
                sorted: [],
                left: low,
                right: high,
                description: `${arr[j]} < ${pivotValue}, already in correct position`,
              })
            );
          }
        }
      }

      // Swap pivot to correct position
      if (i + 1 !== pivotIndex) {
        steps.push(
          createState({
            array: arr,
            pivot: pivotIndex,
            comparing: [],
            swapping: [i + 1, pivotIndex],
            partitioned: Array.from(
              { length: i - low + 1 },
              (_, idx) => low + idx
            ),
            sorted: [],
            left: low,
            right: high,
            description: `Moving pivot ${pivotValue} to its final position at ${
              i + 1
            }`,
          })
        );

        [arr[i + 1], arr[pivotIndex]] = [arr[pivotIndex], arr[i + 1]];
      }

      return i + 1;
    };

    quickSortHelper(0, n - 1);

    // Final sorted state
    steps.push(
      createState({
        array: arr,
        pivot: -1,
        comparing: [],
        swapping: [],
        partitioned: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        left: -1,
        right: -1,
        description: "QuickSort complete! Array is now fully sorted 🎉",
      })
    );

    return steps;
  },
};
