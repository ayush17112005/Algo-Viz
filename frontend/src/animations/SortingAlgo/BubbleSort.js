// export const BubbleSort = {
//   generateSteps: (array) => {
//     const steps = [];
//     const arr = [...array];
//     const n = arr.length;

//     steps.push({
//       array: [...arr],
//       comparing: [],
//       swapping: [],
//       sorted: [],
//       description:
//         "Starting Bubble Sort - We'll compare adjacent elements and swap if needed",
//     });

//     for (let i = 0; i < n - 1; i++) {
//       for (let j = 0; j < n - i - 1; j++) {
//         // Comparing step
//         steps.push({
//           array: [...arr],
//           comparing: [j, j + 1],
//           swapping: [],
//           sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
//           description: `Comparing elements at positions ${j} and ${j + 1} (${
//             arr[j]
//           } and ${arr[j + 1]})`,
//         });

//         if (arr[j] > arr[j + 1]) {
//           // Swapping step
//           steps.push({
//             array: [...arr],
//             comparing: [],
//             swapping: [j, j + 1],
//             sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
//             description: `${arr[j]} > ${arr[j + 1]}, so we swap them`,
//           });

//           // Perform swap
//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

//           // After swap step
//           steps.push({
//             array: [...arr],
//             comparing: [],
//             swapping: [],
//             sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
//             description: `Swapped! Array is now: [${arr.join(", ")}]`,
//           });
//         } else {
//           steps.push({
//             array: [...arr],
//             comparing: [],
//             swapping: [],
//             sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
//             description: `${arr[j]} ≤ ${arr[j + 1]}, no swap needed`,
//           });
//         }
//       }

//       // Mark element as sorted
//       steps.push({
//         array: [...arr],
//         comparing: [],
//         swapping: [],
//         sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
//         description: `Pass ${i + 1} complete! Largest element (${
//           arr[n - 1 - i]
//         }) is in its correct position`,
//       });
//     }

//     steps.push({
//       array: [...arr],
//       comparing: [],
//       swapping: [],
//       sorted: Array.from({ length: n }, (_, k) => k),
//       description: "Bubble Sort Complete! Array is now fully sorted 🎉",
//     });

//     return steps;
//   },
// };

export const BubbleSort = {
  generateSteps: (inputArray) => {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;

    // Initial step
    steps.push({
      array: [...array],
      state: {
        comparing: [],
        swapping: [],
        sorted: [],
      },
      description:
        "Starting Bubble Sort algorithm. We'll compare adjacent elements and swap if needed.",
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({
          array: [...array],
          state: {
            comparing: [j, j + 1],
            swapping: [],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          },
          description: `Comparing elements at positions ${j} and ${j + 1}: ${
            array[j]
          } and ${array[j + 1]}`,
        });

        if (array[j] > array[j + 1]) {
          // Swapping step
          steps.push({
            array: [...array],
            state: {
              comparing: [],
              swapping: [j, j + 1],
              sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            },
            description: `${array[j]} > ${array[j + 1]}, so we swap them`,
          });

          // Perform the swap
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          // Show result after swap
          steps.push({
            array: [...array],
            state: {
              comparing: [],
              swapping: [],
              sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            },
            description: `Swapped! New positions: ${array[j]} and ${
              array[j + 1]
            }`,
          });
        } else {
          steps.push({
            array: [...array],
            state: {
              comparing: [],
              swapping: [],
              sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            },
            description: `${array[j]} ≤ ${array[j + 1]}, no swap needed`,
          });
        }
      }
    }

    // Final step - all sorted
    steps.push({
      array: [...array],
      state: {
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
      },
      description:
        "Bubble Sort complete! All elements are now in sorted order.",
    });

    return steps;
  },
};
