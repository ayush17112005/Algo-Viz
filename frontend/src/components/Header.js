import React from "react";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import LinkedinIcon from "../assets/Linkedin.png";
import GithubIcon from "../assets/Github.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      className="bg-gradient-to-r from-white via-green-50 to-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm relative h-16 shadow-sm"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - Logo */}
          <motion.div
            className="flex items-center gap-3 relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="text-green-600 drop-shadow-lg" size={32} />
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span
                onClick={() => navigate("/")}
                className="text-xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-clip-text text-transparent cursor-pointer"
              >
                AlgoVisualizer
              </span>
              <motion.span
                className="text-xs text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Learn • Visualize • Master
              </motion.span>
            </div>
          </motion.div>

          {/* Right Section - Social Icons Only */}
          <div className="flex items-center ">
            {/* GitHub Icon - 10x10 */}
            <motion.button
              className="relative p-2 text-gray-600 hover:text-green-600 transition-all duration-300 rounded-full hover:bg-green-50 hover:shadow-md w-14 h-14 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://github.com/ayush17112005", "_blank")
              }
            >
              <img
                src={GithubIcon}
                alt="Github"
                className="w-8 h-8 filter hover:brightness-110 object-contain"
              />
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full opacity-0 hover:opacity-10 transition-opacity"
                whileHover={{ opacity: 0.1 }}
              />
            </motion.button>

            {/* LinkedIn Icon - 14x14 */}
            <motion.button
              className="relative p-2 text-gray-600 hover:text-green-600 transition-all duration-300 rounded-full hover:bg-green-50 hover:shadow-md w-18 h-18 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/ayushmansaxena/",
                  "_blank"
                )
              }
            >
              <img
                src={LinkedinIcon}
                alt="Linkedin"
                className="w-14 h-14 filter hover:brightness-110 object-contain"
              />
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full opacity-0 hover:opacity-10 transition-opacity"
                whileHover={{ opacity: 0.1 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-2 left-1/4 w-1 h-1 bg-green-400 rounded-full opacity-50"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-3 right-1/3 w-1 h-1 bg-green-300 rounded-full opacity-40"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1 left-2/3 w-1 h-1 bg-green-500 rounded-full opacity-30"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </motion.header>
  );
};
