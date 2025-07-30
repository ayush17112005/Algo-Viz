export const mergeSortCode = `
// Merge two sorted subarrays arr[left..mid] and arr[mid+1..right]
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(arr);  // Copy of original array to use for merging
    int i = left;           // Pointer for left subarray
    int j = mid + 1;        // Pointer for right subarray
    int k = left;           // Pointer for merged array

    // Merge elements into original array in sorted order
    while (i <= mid && j <= right) {
        if (temp[i] <= temp[j]) {
            arr[k++] = temp[i++];
        } else {
            arr[k++] = temp[j++];
        }
    }

    // Copy any remaining elements from the left subarray
    while (i <= mid) {
        arr[k++] = temp[i++];
    }

    // Copy any remaining elements from the right subarray
    while (j <= right) {
        arr[k++] = temp[j++];
    }
}

// Recursive merge sort function
void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;  // Base case: 1 element

    int mid = (left + right) / 2;

    // Recursively sort both halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    // Merge the sorted halves
    merge(arr, left, mid, right);
}
`;
