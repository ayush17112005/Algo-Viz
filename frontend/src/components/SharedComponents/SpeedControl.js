import { motion } from "framer-motion";
export const SpeedControl = ({ speed, onSpeedChange }) => (
  <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
    <span className="text-sm font-medium text-gray-700">Speed:</span>
    <input
      type="range"
      min="100"
      max="2000"
      value={speed}
      onChange={(e) => onSpeedChange(Number(e.target.value))}
      className="w-24 accent-green-600"
    />
    <span className="text-sm text-gray-600 min-w-[60px]">{speed}ms</span>
  </motion.div>
);
