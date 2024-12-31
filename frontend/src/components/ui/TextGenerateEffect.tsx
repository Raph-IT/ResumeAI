"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const characters = words.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={complete ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ));

  return <h1 className={className}>{characters}</h1>;
}; 