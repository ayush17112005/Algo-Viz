import React, { useState } from "react";
import { Code2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import LinkedinIcon from "../assets/Linkedin.png";
import GithubIcon from "../assets/Github.png";
// Add your profile pictures
import AyushProfile from "../assets/ayush.jpg";
import AnubhavProfile from "../assets/anav5.jpg";

export const Header = () => {
  const navigate = useNavigate();
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "Ayush",
      image: AyushProfile,
      linkedin: "https://www.linkedin.com/in/ayushmansaxena/",
      github: "https://github.com/ayush17112005",
    },
    {
      name: "Anubhav",
      image: AnubhavProfile,
      linkedin: "https://www.linkedin.com/in/anubhav-sultania-689538291/",
      github: "https://github.com/your-friend",
    },
  ];

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

          {/* Right Section - Team Profiles */}
          <div className="flex items-center gap-2">
            <motion.span
              className="text-sm text-gray-600 mr-2 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Users size={16} />
              Built by
            </motion.span>

            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative group"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Flip Container */}
                <motion.div
                  className="relative w-10 h-10 cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(member.linkedin, "_blank")}
                >
                  <AnimatePresence mode="wait">
                    {hoveredMember !== index ? (
                      // Front Side - Profile Image
                      <motion.div
                        key="profile"
                        className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-2 border-green-200 group-hover:border-green-400 transition-border duration-300"
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      </motion.div>
                    ) : (
                      // Back Side - LinkedIn Icon
                      <motion.div
                        key="linkedin"
                        className="absolute inset-0 w-full h-full rounded-full border-2 border-blue-400 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={LinkedinIcon}
                          alt="LinkedIn"
                          className="w-6 h-6"
                        />
                        <div className="absolute inset-0 bg-blue-400 opacity-10 rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Tooltip - Fixed positioning */}
                <AnimatePresence>
                  {hoveredMember === index && (
                    <motion.div
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-50 shadow-lg"
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {member.name}
                      {/* Tooltip arrow */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* GitHub link - appears on hover */}
                <AnimatePresence>
                  {hoveredMember === index && (
                    <motion.div
                      className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <motion.button
                        className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(member.github, "_blank");
                        }}
                      >
                        <img
                          src={GithubIcon}
                          alt="GitHub"
                          className="w-5 h-5"
                        />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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
