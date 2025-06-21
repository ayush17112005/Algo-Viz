import useSortingAnimation from "../hooks/useSortingAnimations";
import { HeapSort } from "../animations/SortingAlgo/HeapSort";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";
import { heapSortCode } from "../algorithms/HeapSort";
const HeapSortVisualizer = () => {
  const sortingHook = useSortingAnimation(HeapSort);

  return (
    <SortingVisualizer
      algorithmType="heap"
      sortingHook={sortingHook}
      algorithmCode={heapSortCode}
    />
  );
};

export default HeapSortVisualizer;
