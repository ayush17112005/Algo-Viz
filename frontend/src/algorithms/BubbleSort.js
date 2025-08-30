export const bubbleSortCode = `vector<int> bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    // Outer loop for number of passes
    for (int i = 0; i < n - 1; i++) {
        
        // Inner loop for comparisons in each pass
        for (int j = 0; j < n - i - 1; j++) {
            
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                
                // Swap if they're in wrong order
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // Alternative modern C++ swap syntax:
                // std::swap(arr[j], arr[j + 1]);
            }
        }

        // After each pass, the largest element 
        // is placed at the end
    }

    return arr;
}`;
