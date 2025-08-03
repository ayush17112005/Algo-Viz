import useSortingAnimation from "../hooks/useSortingAnimations";
import { BubbleSort } from "../animations/SortingAlgo/BubbleSort";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";
import { bubbleSortCode } from "../algorithms/BubbleSort";
const BubbleSortVisualizer = () => {
  const sortingHook = useSortingAnimation(BubbleSort);

  return (
    <SortingVisualizer
      algorithmType="bubble"
      sortingHook={sortingHook}
      algorithmCode={bubbleSortCode}
    />
  );
};

export default BubbleSortVisualizer;
