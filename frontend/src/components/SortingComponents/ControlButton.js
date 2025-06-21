import { motion } from "framer-motion";
export const ControlButton = ({
  onClick,
  children,
  icon,
  className = "border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700",
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md ${className}`}
  >
    {icon}
    {children}
  </motion.button>
);
