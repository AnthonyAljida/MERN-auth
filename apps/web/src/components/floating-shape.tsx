import React from "react";
import { motion } from "framer-motion";

export interface SignUpProps {
  color: string;
  delay: number;
  left: string;
  size: string;
  top: string;
}

function FloatingShape({
  color,
  delay,
  left,
  size,
  top,
}: SignUpProps): React.JSX.Element {
  return (
    <motion.div
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      aria-hidden="true"
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export default FloatingShape;
