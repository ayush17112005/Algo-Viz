export const selectionSortCode = `function selectionSort(arr) {
  const n = arr.length;
  
  // Outer loop to move the boundary of unsorted array
  for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      // Inner loop to find the minimum element in unsorted part
      for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[minIndex]) {
              minIndex = j;
          }
      }
      
      // Swap the found minimum with the first element of unsorted part
      if (minIndex !== i) {
          let temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
          
          // Alternative ES6 swap syntax:
          // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
  }
  
  return arr;
}`;
