import React from "react";
import { motion } from "framer-motion";
import { Play, Code2, Github, Linkedin } from "lucide-react";
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
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use AlgoVisualizer?
          </h2>
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
              bgColor: "bg-green-100",
              iconColor: "text-green-600",
            },
            {
              icon: Code2,
              title: "Code Examples",
              description:
                "See the actual code implementation alongside the visual representation.",
              bgColor: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              icon: null,
              title: "Interview Ready",
              description:
                "Perfect for technical interview preparation and understanding algorithm complexity.",
              bgColor: "bg-purple-100",
              iconColor: "text-purple-600",
              customIcon: "⚡",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon ? (
                  <feature.icon className={feature.iconColor} size={24} />
                ) : (
                  <span className={`${feature.iconColor} text-xl font-bold`}>
                    {feature.customIcon}
                  </span>
                )}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
