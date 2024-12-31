"use client";
import React from "react";
import { motion } from "framer-motion";

interface Item {
  title: string;
  description: string;
  icon: string;
}

export const HoverEffect = ({ items }: { items: Item[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group"
          whileHover="hover"
          initial="initial"
          variants={{
            hover: { scale: 1.05 },
            initial: { scale: 1 },
          }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />
          <div className="relative flex flex-col gap-4 bg-black p-6 rounded-lg border border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">
                {item.title}
              </h3>
            </div>
            <p className="text-neutral-300">
              {item.description}
            </p>
            <motion.div
              className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100"
              variants={{
                hover: {
                  scale: 1.5,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
                initial: {
                  scale: 0,
                },
              }}
            >
              <motion.div
                className="absolute inset-0.5 rounded-full bg-black"
                variants={{
                  hover: {
                    scale: 0.9,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                  initial: {
                    scale: 1,
                  },
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 