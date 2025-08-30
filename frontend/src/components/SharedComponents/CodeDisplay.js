import React from "react";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";

const CodeDisplay = ({ code, title, language = "javascript" }) => {
  return (
    <motion.div
      key="code"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
        <Code2 className="text-green-600" size={28} />
        {title || "Algorithm Implementation"}
      </h3>
      <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
        <pre className="text-green-400 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeDisplay;
