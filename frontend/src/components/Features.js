import React from "react";
import { motion } from "framer-motion";
import { Play, Code2 } from "lucide-react";
import AyushProfile from "../assets/ayush.jpg";
import AnubhavProfile from "../assets/anav5.jpg";

export const Features = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const teamMembers = [
    {
      name: "Ayush",
      image: AyushProfile,
      url: "https://www.linkedin.com/in/ayushmansaxena/",
      gradient: "from-blue-100 to-blue-200",
      border: "border-blue-300",
      hoverBorder: "group-hover:border-blue-500",
      shadow: "shadow-blue-200",
    },
    {
      name: "Anubhav",
      image: AnubhavProfile,
      url: "https://www.linkedin.com/in/anubhav-sultania-689538291/",
      gradient: "from-indigo-100 to-indigo-200",
      border: "border-indigo-300",
      hoverBorder: "group-hover:border-indigo-500",
      shadow: "shadow-indigo-200",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Use AlgoVisualizer?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the power of visual learning with our interactive algorithm
            visualization platform
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Play,
              title: "Interactive Learning",
              description:
                "Watch algorithms execute step-by-step with controls to pause, speed up, or slow down.",
              bgColor: "bg-gradient-to-br from-green-100 to-green-200",
              iconColor: "text-green-600",
              borderColor: "border-green-200",
            },
            {
              icon: Code2,
              title: "Code Examples",
              description:
                "See the actual code implementation alongside the visual representation.",
              bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
              iconColor: "text-blue-600",
              borderColor: "border-blue-200",
            },
            {
              icon: null,
              title: "Interview Ready",
              description:
                "Perfect for technical interview preparation and understanding algorithm complexity.",
              bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
              iconColor: "text-purple-600",
              borderColor: "border-purple-200",
              customIcon: "⚡",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`text-center p-8 rounded-2xl bg-white shadow-lg border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-300`}
              variants={fadeInUp}
              whileHover={{
                y: -15,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className={`${feature.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md`}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -10, 10, 0],
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  rotate: { duration: 0.6 },
                }}
              >
                {feature.icon ? (
                  <feature.icon className={feature.iconColor} size={28} />
                ) : (
                  <span className={`${feature.iconColor} text-2xl font-bold`}>
                    {feature.customIcon}
                  </span>
                )}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links Section - Profile Images with LinkedIn Theme */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Connect With Us
          </h3>
          <div className="flex justify-center gap-8">
            {teamMembers.map((member, index) => (
              <motion.a
                key={member.name}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl overflow-hidden border-3 ${member.border} ${member.hoverBorder} transition-all duration-300 bg-gradient-to-br ${member.gradient} p-1`}
                  whileHover={{
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                    rotate: index === 0 ? [0, -5, 5, 0] : [0, 5, -5, 0],
                    y: -5,
                  }}
                  transition={{
                    rotate: { duration: 0.5 },
                    y: { duration: 0.3 },
                  }}
                >
                  {/* LinkedIn-themed background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-20 rounded-xl"></div>

                  {/* Profile Image */}
                  <motion.div
                    className="relative w-full h-full rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={member.image}
                      alt={`${member.name} Profile`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* LinkedIn-themed overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      whileHover={{ opacity: 0.2 }}
                    />
                  </motion.div>

                  {/* LinkedIn indicator dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>

                {/* Name label below the image */}
                <motion.p
                  className="text-sm text-gray-700 mt-3 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {member.name}
                </motion.p>

                {/* LinkedIn text on hover */}
                <motion.p
                  className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium"
                  whileHover={{ opacity: 1 }}
                >
                  View LinkedIn
                </motion.p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
