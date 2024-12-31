import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

type Status = "empty" | "partial" | "complete";

interface StatusDotProps {
  status: Status;
  pulse?: boolean;
}

export const StatusDot = ({ status, pulse = false }: StatusDotProps) => {
  const baseClasses = "h-3 w-3 rounded-full";
  
  const statusClasses = {
    empty: "bg-gray-500/50",
    partial: "bg-orange-500",
    complete: "bg-green-500"
  };

  return (
    <div className="relative">
      <motion.div
        className={cn(baseClasses, statusClasses[status])}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {pulse && (
        <div className={cn(
          "absolute inset-0 rounded-full",
          status === "complete" && "animate-ping bg-green-500/40",
          status === "partial" && "animate-ping bg-orange-500/40"
        )} />
      )}
    </div>
  );
}; 