import { motion } from 'framer-motion';

interface SectionProgressProps {
  completed: number;
  total: number;
}

export const SectionProgress = ({ completed, total }: SectionProgressProps) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="relative h-1 w-full bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}; 