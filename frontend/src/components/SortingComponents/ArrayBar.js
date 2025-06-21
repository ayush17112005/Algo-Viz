import { motion } from "framer-motion";

export const ArrayBar = ({
  value,
  index,
  height,
  color,
  widthClass = "w-16",
  minHeight = 20,
  fontSize = "text-lg",
}) => {
  const getBackgroundColor = (colorClass) => {
    const colorMap = {
      "bg-green-500": "#10b981",
      "bg-red-500": "#ef4444",
      "bg-yellow-500": "#f59e0b",
      "bg-purple-500": "#8b5cf6",
      "bg-blue-500": "#3b82f6",
      "bg-orange-500": "#f97316",
      "bg-gray-500": "#6b7280",
    };

    return color.startsWith("#") ? color : colorMap[color] || "#3b82f6";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        height: height,
        backgroundColor: getBackgroundColor(color),
      }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className={`${widthClass} rounded-t-xl flex items-center justify-center relative shadow-lg cursor-pointer`}
      style={{
        minHeight: `${minHeight}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <span className={`text-white font-bold ${fontSize} mb-4 drop-shadow-lg`}>
        {value}
      </span>
      <span className="absolute -bottom-8 text-sm text-gray-500 font-medium">
        [{index}]
      </span>
    </motion.div>
  );
};
