import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true, ...props }: CardProps) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-gray-800 bg-gray-900/50 p-6",
        hover && "hover:bg-gray-900/80 transition-colors",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}; 