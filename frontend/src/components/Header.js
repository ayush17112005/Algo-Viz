import React from "react";
import { Code2, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.header
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="text-green-600" size={28} />
            </motion.div>
            <span
              onClick={() => navigate("/")}
              className="text-xl font-bold text-gray-900 cursor-pointer"
            >
              AlgoVisualizer
            </span>
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.button
              className="text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.button>
            <motion.button
              className="text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
