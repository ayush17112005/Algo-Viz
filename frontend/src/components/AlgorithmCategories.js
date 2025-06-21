import React, { useContext, useState } from "react";
import { algorithms } from "../assets/assets";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
export const AlgorithmCategories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { fadeInUp, staggerContainer } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <section id="categories" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose an Algorithm to Visualize
          </h2>
          <p className="text-lg text-gray-600">
            Select an algorithm to start learning through interactive
            visualization
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {algorithms.map((algorithm, index) => (
            <motion.div
              key={algorithm.title}
              className="bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
              variants={fadeInUp}
              whileHover={{
                scale: 1.03,
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredCard(algorithm.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    className="text-3xl"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {algorithm.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {algorithm.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {algorithm.description}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredCard === algorithm.title && (
                    <motion.div
                      className="space-y-2 mb-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="font-medium">Time Complexity:</span>
                        <span className="font-mono text-green-600">
                          {algorithm.timeComplexity}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="font-medium">Space Complexity:</span>
                        <span className="font-mono text-blue-600">
                          {algorithm.spaceComplexity}
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className="mt-auto"
                  onClick={() => navigate(algorithm.route)}
                >
                  <motion.button
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 6px 20px rgba(34, 197, 94, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{
                        rotate: hoveredCard === algorithm.title ? [0, 360] : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: hoveredCard === algorithm.title ? Infinity : 0,
                        ease: "linear",
                      }}
                    >
                      <Play size={16} />
                    </motion.div>
                    Visualize {algorithm.title}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
