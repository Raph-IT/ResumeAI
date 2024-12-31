import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  setUser: (user) => {
    set({ user, isLoading: false });
  },

  setError: (error) => {
    set({ error });
  },

  signOut: async () => {
    try {
      await auth.signOut();
      set({ user: null, error: null });
    } catch (error) {
      set({ error: 'Failed to sign out' });
    }
  }
}));

// Écouter les changements d'authentification
auth.onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
}); 