import { useToast } from '../../hooks/useToast';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Toaster = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              p-4 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-3
              ${
                toast.variant === 'success'
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                  : toast.variant === 'error'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : 'bg-gray-900/50 border border-gray-800 text-white'
              }
            `}
          >
            <div className="flex-1">
              {toast.title && (
                <h3 className="font-medium mb-1">{toast.title}</h3>
              )}
              <p className="text-sm opacity-90">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 