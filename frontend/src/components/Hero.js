import React, { useContext, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Play, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export const Hero = () => {
  const { scrollToCategories, floatingAnimation } = useContext(AppContext);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 min-h-screen flex items-center overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Floating geometric shapes with parallax */}
      <motion.div
        className="absolute top-32 left-16 w-16 h-16 border-2 border-green-200 rounded-lg opacity-30"
        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-20 right-20 w-8 h-8 bg-green-100 rounded-full opacity-40"
        style={{ transform: `translateY(${scrollY * -0.4}px)` }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-40 left-32 w-12 h-12 border border-gray-300 rotate-45 opacity-20"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
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
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
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
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        >
          <motion.button
            onClick={scrollToCategories}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 25px rgba(34, 197, 94, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
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
            className="border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-green-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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

        {/* Enhanced scroll indicator with parallax */}
        <motion.button
          onClick={scrollToCategories}
          className="text-gray-400 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-green-50"
          {...floatingAnimation}
          whileHover={{ scale: 1.1 }}
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Code-like decorative elements */}
      <div className="absolute top-24 left-8 text-green-200 font-mono text-sm opacity-30 select-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          function visualize() {"{"}
        </motion.div>
      </div>

      <div className="absolute bottom-32 right-12 text-green-200 font-mono text-sm opacity-30 select-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          return algorithm;
          <br />
          {"}"}
        </motion.div>
      </div>
    </section>
  );
};
