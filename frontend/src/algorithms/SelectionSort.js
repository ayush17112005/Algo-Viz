export const selectionSortCode = `
// Function to perform Selection Sort
void selectionSort(vector<int>& arr) {
    int n = arr.size();

    // Outer loop to mark the boundary of unsorted array
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        // Inner loop to find the index of the minimum element
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}
`;
