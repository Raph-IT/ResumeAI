import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";
import { SectionTransition } from "./SectionTransition";

interface BaseSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  empty?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action: React.ReactNode;
  };
  children: React.ReactNode;
}

export const BaseSection = ({
  title,
  description,
  action,
  empty,
  children
}: BaseSectionProps) => {
  return (
    <SectionTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {description && (
              <p className="text-gray-400 mt-1">{description}</p>
            )}
          </div>
          {action}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {empty ? (
              <Card className="p-8 text-center">
                <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                  {empty.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  {empty.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {empty.description}
                </p>
                {empty.action}
              </Card>
            ) : (
              children
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionTransition>
  );
}; 