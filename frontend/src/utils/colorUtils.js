export const createColorGetter = (stateKeys) => {
  return (index, state) => {
    if (state.sorted?.includes(index)) return "bg-green-500";
    if (state.swapping?.includes(index)) return "bg-red-500";
    if (state.comparing?.includes(index)) return "bg-yellow-500";
    if (state.heap?.includes(index)) return "bg-purple-500";
    if (state.pivot?.includes(index)) return "bg-orange-500";
    return "bg-blue-500";
  };
};
