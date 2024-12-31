"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Card {
  id: string;
  content: React.ReactNode;
}

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute w-full bg-gray-900/50 rounded-xl p-6 border border-gray-800"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  );
}; 