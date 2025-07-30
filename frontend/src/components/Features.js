import React from "react";
import { motion } from "framer-motion";
import { Play, Code2 } from "lucide-react";
import GithubIcon from "../assets/Github.png";
import LinkedinIcon from "../assets/Linkedin.png";

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

        {/* Social Links Section */}
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
          <div className="flex justify-center gap-6">
            <motion.a
              href="https://github.com/ayush17112005"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg border-2 border-gray-200 group-hover:border-gray-400 transition-all duration-300"
                whileHover={{
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  rotate: { duration: 0.5 },
                }}
              >
                <img
                  src={GithubIcon}
                  alt="GitHub"
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/ayushmansaxena/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300"
                whileHover={{
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  rotate: { duration: 0.5 },
                }}
              >
                <img
                  src={LinkedinIcon}
                  alt="LinkedIn"
                  className="w-14 h-14 transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
