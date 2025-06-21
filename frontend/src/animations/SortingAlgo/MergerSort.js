export const MergeSort = {
  generateSteps: (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    const tempArr = new Array(n);

    // Helper to create state object
    const createState = (step) => ({
      state: {
        auxiliaryArray: step.auxiliaryArray ? [...step.auxiliaryArray] : [],
        dividing: step.dividing ? [...step.dividing] : [],
        merging: step.merging ? [...step.merging] : [],
        sorted: step.sorted ? [...step.sorted] : [],
        comparing: step.comparing ? [...step.comparing] : [],
        placing: step.placing ? [...step.placing] : [],
        leftRange: step.leftRange ? { ...step.leftRange } : null,
        rightRange: step.rightRange ? { ...step.rightRange } : null,
        phase: step.phase || "",
        depth: step.depth || 0,
      },
      array: [...step.array],
      description: step.description,
    });

    // Initial step
    steps.push(
      createState({
        array: arr,
        auxiliaryArray: [],
        dividing: [],
        merging: [],
        sorted: [],
        leftRange: null,
        rightRange: null,
        phase: "start",
        description:
          "Starting Merge Sort - We'll divide the array into smaller parts, then merge them back in sorted order",
      })
    );

    const mergeSortHelper = (arr, tempArr, left, right, depth = 0) => {
      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);

      // Show division step
      steps.push(
        createState({
          array: [...arr],
          auxiliaryArray: [...tempArr],
          dividing: Array.from(
            { length: right - left + 1 },
            (_, i) => left + i
          ),
          merging: [],
          sorted: [],
          leftRange: { start: left, end: mid },
          rightRange: { start: mid + 1, end: right },
          phase: "divide",
          depth: depth,
          description: `Dividing array: splitting range [${left}...${right}] into [${left}...${mid}] and [${
            mid + 1
          }...${right}]`,
        })
      );

      // Recursively sort left and right halves
      mergeSortHelper(arr, tempArr, left, mid, depth + 1);
      mergeSortHelper(arr, tempArr, mid + 1, right, depth + 1);

      // Merge the sorted halves
      merge(arr, tempArr, left, mid, right, depth);
    };

    const merge = (arr, tempArr, left, mid, right, depth) => {
      // Copy data to temp array
      for (let i = left; i <= right; i++) {
        tempArr[i] = arr[i];
      }

      steps.push(
        createState({
          array: [...arr],
          auxiliaryArray: [...tempArr],
          dividing: [],
          merging: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          sorted: [],
          leftRange: { start: left, end: mid },
          rightRange: { start: mid + 1, end: right },
          phase: "merge_start",
          depth: depth,
          description: `Merging subarrays [${left}...${mid}] and [${
            mid + 1
          }...${right}] - copied to auxiliary array`,
        })
      );

      let i = left; // Initial index of left subarray
      let j = mid + 1; // Initial index of right subarray
      let k = left; // Initial index of merged subarray

      // Merge the temp arrays back into arr[left..right]
      while (i <= mid && j <= right) {
        const comparing = [i, j];

        steps.push(
          createState({
            array: [...arr],
            auxiliaryArray: [...tempArr],
            dividing: [],
            merging: Array.from(
              { length: right - left + 1 },
              (_, idx) => left + idx
            ),
            sorted: [],
            comparing: comparing,
            leftRange: { start: left, end: mid },
            rightRange: { start: mid + 1, end: right },
            phase: "merge_compare",
            depth: depth,
            description: `Comparing ${tempArr[i]} (left) with ${tempArr[j]} (right)`,
          })
        );

        if (tempArr[i] <= tempArr[j]) {
          arr[k] = tempArr[i];
          steps.push(
            createState({
              array: [...arr],
              auxiliaryArray: [...tempArr],
              dividing: [],
              merging: Array.from(
                { length: right - left + 1 },
                (_, idx) => left + idx
              ),
              sorted: [],
              placing: [k],
              leftRange: { start: left, end: mid },
              rightRange: { start: mid + 1, end: right },
              phase: "merge_place",
              depth: depth,
              description: `${tempArr[i]} ≤ ${tempArr[j]}, placing ${tempArr[i]} at position ${k}`,
            })
          );
          i++;
        } else {
          arr[k] = tempArr[j];
          steps.push(
            createState({
              array: [...arr],
              auxiliaryArray: [...tempArr],
              dividing: [],
              merging: Array.from(
                { length: right - left + 1 },
                (_, idx) => left + idx
              ),
              sorted: [],
              placing: [k],
              leftRange: { start: left, end: mid },
              rightRange: { start: mid + 1, end: right },
              phase: "merge_place",
              depth: depth,
              description: `${tempArr[j]} < ${tempArr[i]}, placing ${tempArr[j]} at position ${k}`,
            })
          );
          j++;
        }
        k++;
      }

      // Copy remaining elements of left subarray
      while (i <= mid) {
        arr[k] = tempArr[i];
        steps.push(
          createState({
            array: [...arr],
            auxiliaryArray: [...tempArr],
            dividing: [],
            merging: Array.from(
              { length: right - left + 1 },
              (_, idx) => left + idx
            ),
            sorted: [],
            placing: [k],
            leftRange: { start: left, end: mid },
            rightRange: { start: mid + 1, end: right },
            phase: "merge_remaining",
            depth: depth,
            description: `Copying remaining element ${tempArr[i]} from left subarray to position ${k}`,
          })
        );
        i++;
        k++;
      }

      // Copy remaining elements of right subarray
      while (j <= right) {
        arr[k] = tempArr[j];
        steps.push(
          createState({
            array: [...arr],
            auxiliaryArray: [...tempArr],
            dividing: [],
            merging: Array.from(
              { length: right - left + 1 },
              (_, idx) => left + idx
            ),
            sorted: [],
            placing: [k],
            leftRange: { start: left, end: mid },
            rightRange: { start: mid + 1, end: right },
            phase: "merge_remaining",
            depth: depth,
            description: `Copying remaining element ${tempArr[j]} from right subarray to position ${k}`,
          })
        );
        j++;
        k++;
      }

      // Mark this range as merged
      steps.push(
        createState({
          array: [...arr],
          auxiliaryArray: [...tempArr],
          dividing: [],
          merging: [],
          sorted: Array.from(
            { length: right - left + 1 },
            (_, idx) => left + idx
          ),
          leftRange: { start: left, end: mid },
          rightRange: { start: mid + 1, end: right },
          phase: "merge_complete",
          depth: depth,
          description: `Merge complete! Subarray [${left}...${right}] is now sorted`,
        })
      );
    };

    mergeSortHelper(arr, tempArr, 0, arr.length - 1);

    steps.push(
      createState({
        array: [...arr],
        auxiliaryArray: [],
        dividing: [],
        merging: [],
        sorted: Array.from({ length: arr.length }, (_, i) => i),
        leftRange: null,
        rightRange: null,
        phase: "complete",
        description: "Merge Sort Complete! Array is now fully sorted 🎉",
      })
    );

    return steps;
  },
};
