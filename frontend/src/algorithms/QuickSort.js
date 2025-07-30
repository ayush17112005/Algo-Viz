export const quickSortCode = `
// Partition the array and return the index of the pivot
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Choose rightmost element as pivot
    int i = low - 1;       // Index of smaller element

    for (int j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]); // Swap elements
        }
    }

    // Place pivot in the correct sorted position
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// Recursive Quick Sort function
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        // Partition the array
        int pivotIndex = partition(arr, low, high);

        // Recursively sort elements before and after pivot
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}
`;
