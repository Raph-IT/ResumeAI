import { api } from './api';

export const creditService = {
  getBalance: async () => {
    const response = await api.get('/credits/balance');
    return response.data.credits;
  },

  getHistory: async () => {
    const response = await api.get('/credits/history');
    return response.data.history;
  },

  createCheckoutSession: async (packageId: string) => {
    const response = await api.post('/create-checkout-session', { packageId });
    return response.data.sessionId;
  },

  checkPaymentStatus: async (sessionId: string) => {
    const response = await api.get(`/payment/status/${sessionId}`);
    return response.data;
  }
}; 