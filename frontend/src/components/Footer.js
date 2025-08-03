// import React from "react";
// import { motion } from "framer-motion";
// import { Code2, Github, Linkedin } from "lucide-react";
// export const Footer = () => {
//   return (
//     <motion.footer
//       className="bg-gray-900 text-white py-12 px-4"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           className="flex items-center justify-center gap-2 mb-4"
//           whileHover={{ scale: 1.05 }}
//         >
//           <motion.div
//             animate={{ rotate: [0, 360] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//           >
//             <Code2 className="text-green-500" size={24} />
//           </motion.div>
//           <span className="text-xl font-bold">AlgoVisualizer</span>
//         </motion.div>

//         <motion.p
//           className="text-gray-400 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           Built with ❤️ by{" "}
//           <span className="text-white">Ayushman Saxena, Anubhav Sultania</span>{" "}
//           @ NIT Rourkela
//         </motion.p>

//         <motion.div
//           className="flex justify-center gap-6 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <motion.button
//             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
//             whileHover={{ scale: 1.1, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Github size={18} />
//             GitHub
//           </motion.button>
//           <motion.button
//             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
//             whileHover={{ scale: 1.1, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Linkedin size={18} />
//             LinkedIn
//           </motion.button>
//         </motion.div>

//         <motion.div
//           className="pt-6 border-t border-gray-800"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//         >
//           <p className="text-gray-500 text-sm">
//             Made for learning • Open Source • Free Forever
//           </p>
//         </motion.div>
//       </div>
//     </motion.footer>
//   );
// };

import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Simple Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code2 className="text-green-500" size={24} />
          </motion.div>
          <span className="text-xl font-semibold">AlgoVisualizer</span>
        </div>

        {/* Clean Description */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg mb-2">
            Built with ❤️ by <span className="text-white">Ayushman Saxena</span>{" "}
            and <span className="text-white">Anubhav Sultania</span>
          </p>
          <p className="text-green-400 font-medium">NIT Rourkela</p>
        </div>

        {/* Simple Features */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <span className="text-green-400">✨ Made for Learning</span>
          <span className="text-blue-400">🔓 Open Source</span>
          <span className="text-purple-400">🆓 Free Forever</span>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © 2025 AlgoVisualizer • Making algorithms easy to understand
          </p>
        </div>
      </div>
    </footer>
  );
};
