import { motion } from "framer-motion";

export const StepCounter = ({ currentStep, totalSteps }) => (
  <motion.div
    className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg"
    whileHover={{ scale: 1.05 }}
  >
    Step: {currentStep + 1} / {totalSteps || 1}
  </motion.div>
);
