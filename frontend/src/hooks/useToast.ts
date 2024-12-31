import { create } from 'zustand';

type ToastVariant = 'default' | 'success' | 'error';

interface Toast {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Math.random().toString(36).slice(2) },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const useToast = () => {
  const { toasts, addToast, removeToast } = useToastStore();

  const toast = ({
    title,
    description,
    variant = 'default',
  }: Omit<Toast, 'id'>) => {
    addToast({ title, description, variant });

    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
      const toasts = useToastStore.getState().toasts;
      const toast = toasts[toasts.length - 1];
      if (toast) {
        removeToast(toast.id);
      }
    }, 5000);
  };

  return { toast, toasts, removeToast };
}; 