export const bubbleSortCode = `function bubbleSort(arr) {
    const n = arr.length;
    
    // Outer loop for number of passes
    for (let i = 0; i < n - 1; i++) {
        
        // Inner loop for comparisons in each pass
        for (let j = 0; j < n - i - 1; j++) {
            
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                
                // Swap if they're in wrong order
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                // Alternative ES6 swap syntax:
                // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        
        // After each pass, the largest element 
        // is placed at the end
    }
    
    return arr;
}`;
