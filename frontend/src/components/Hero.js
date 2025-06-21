import React, { useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Play, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
export const Hero = () => {
  const { scrollToCategories, floatingAnimation } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Learn Algorithms Through{" "}
          <span className="text-green-600">
            <Typewriter
              words={[
                "Interactive Visualization",
                "Real-Time Animation",
                "Dynamic Examples",
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Master data structures and algorithms by watching them work in
          real-time. Perfect for students, developers, and anyone preparing for
          technical interviews.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={scrollToCategories}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play size={18} />
            </motion.div>
            Start Learning
          </motion.button>
          <motion.button
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05, borderColor: "#374151" }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                "https://github.com/anubhavsultania/Algo-Viz",
                "_blank"
              )
            }
          >
            View on GitHub
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToCategories}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          {...floatingAnimation}
          whileHover={{ scale: 1.2 }}
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </section>
  );
};
