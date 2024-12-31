import { create } from 'zustand';
import { creditService } from '../services/creditService';

interface CreditState {
  credits: number;
  isLoading: boolean;
  error: string | null;
}

interface CreditActions {
  fetchCredits: () => Promise<void>;
  updateCredits: (newAmount: number) => void;
  resetError: () => void;
}

export const useCreditStore = create<CreditState & CreditActions>((set) => ({
  credits: 0,
  isLoading: false,
  error: null,

  fetchCredits: async () => {
    try {
      set({ isLoading: true, error: null });
      const credits = await creditService.getBalance();
      set({ credits, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch credits', isLoading: false });
    }
  },

  updateCredits: (newAmount) => {
    set({ credits: newAmount });
  },

  resetError: () => {
    set({ error: null });
  }
})); 