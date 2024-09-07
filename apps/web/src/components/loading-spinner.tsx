import { motion } from "framer-motion";
import React from "react";

function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* Simple Loading Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default LoadingSpinner;
