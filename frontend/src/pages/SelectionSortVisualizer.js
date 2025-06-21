import React from "react";
import { SelectionSort } from "../animations/SortingAlgo/SelectionSort";
import { selectionSortCode } from "../algorithms/SelectionSort";
import useSortingAnimation from "../hooks/useSortingAnimations";
import { SortingVisualizer } from "../components/SortingComponents/SortingVisualizer";

const SelectionSortVisualizer = () => {
  const sortingHook = useSortingAnimation(SelectionSort);

  const getBarColor = (index, state = {}) => {
    if (state.sorted?.includes(index)) return "#10b981";
    if (state.currentMin === index) return "#8b5cf6";
    if (state.swapping?.includes(index)) return "#ef4444";
    if (state.comparing?.includes(index)) return "#f59e0b";
    if (state.currentIndex === index) return "#60a5fa";

    return "#3b82f6";
  };

  return (
    <SortingVisualizer
      algorithmType="selection"
      sortingHook={sortingHook}
      algorithmCode={selectionSortCode}
      customColorGetter={getBarColor}
    />
  );
};

export default SelectionSortVisualizer;
