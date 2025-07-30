import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export const Title = ({
  title,
  description,
  icon: Icon = Code2,
  iconColor = "text-green-600",
  iconSize = 36,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <motion.h1
        className="text-4xl font-bold text-gray-900 mb-2"
        whileHover={{ scale: 1.05 }}
      >
        <span className="inline-flex items-center gap-3">
          <Icon className={iconColor} size={iconSize} />
          {title}
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
