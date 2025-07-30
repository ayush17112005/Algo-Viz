import { motion } from "framer-motion";
import { Info } from "lucide-react";
export const AlgorithmInfo = ({ algorithmData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-xl shadow-lg p-8"
  >
    <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
      <Info className="text-blue-600" size={28} />
      Algorithm Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {algorithmData.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div
            className={`inline-block ${item.color} px-3 py-1 rounded-full text-sm font-semibold mb-3`}
          >
            {item.value}
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">{item.label}</h4>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
