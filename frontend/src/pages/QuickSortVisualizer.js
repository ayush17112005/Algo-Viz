import React from "react";
import { QuickSort } from "../animations/SortingAlgo/QuickSort";
import { quickSortCode } from "../algorithms/QuickSort";
import useSortingAnimation from "../hooks/useSortingAnimations";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";

const QuickSortVisualizer = () => {
  const sortingHook = useSortingAnimation(QuickSort);
  const getBarColor = (index) => {
    // Access state through currentStepData
    const state = sortingHook.currentStepData.state || {};

    if (state.sorted?.includes(index)) return "bg-green-500";
    if (state.pivot === index) return "bg-purple-500";
    if (state.swapping?.includes(index)) return "bg-red-500";
    if (state.comparing?.includes(index)) return "bg-yellow-500";
    if (state.partitioned?.includes(index)) return "bg-orange-500";

    if (
      state.left !== -1 &&
      state.right !== -1 &&
      index >= state.left &&
      index <= state.right
    )
      return "bg-blue-400";

    return "bg-blue-500";
  };
  return (
    <SortingVisualizer
      algorithmType="quick"
      sortingHook={sortingHook}
      algorithmCode={quickSortCode}
      customColorGetter={getBarColor}
    />
  );
};

export default QuickSortVisualizer;
