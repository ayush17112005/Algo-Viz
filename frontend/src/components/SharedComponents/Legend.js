import { motion } from "framer-motion";
export const Legend = ({ legendItems }) => {
  const defaultLegendItems = [
    { color: "bg-blue-500", label: "Unsorted" },
    { color: "bg-purple-500", label: "Heap" },
    { color: "bg-yellow-500", label: "Comparing" },
    { color: "bg-red-500", label: "Swapping" },
    { color: "bg-green-500", label: "Sorted" },
  ];
  const items = legendItems || defaultLegendItems;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-center gap-8 text-sm"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <div className={`w-5 h-5 ${item.color} rounded-md shadow-md`}></div>
          <span className="font-medium">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
