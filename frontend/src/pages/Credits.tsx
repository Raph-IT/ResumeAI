import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCreditStore } from '../stores/creditStore';
import { creditService } from '../services/creditService';
import { useToast } from '../hooks/useToast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CREDIT_PACKAGES = {
  basic: {
    id: 'basic',
    name: 'Pack Basique',
    credits: 50,
    price: 4.99,
    description: '50 crédits pour commencer'
  },
  pro: {
    id: 'pro',
    name: 'Pack Pro',
    credits: 200,
    price: 14.99,
    description: '200 crédits pour les utilisateurs réguliers'
  },
  unlimited: {
    id: 'unlimited',
    name: 'Pack Illimité',
    credits: 1000,
    price: 49.99,
    description: '1000 crédits pour une utilisation intensive'
  }
};

export const Credits = () => {
  const { credits } = useCreditStore();
  const { showToast } = useToast();

  const handlePurchase = async (packageId: keyof typeof CREDIT_PACKAGES) => {
    try {
      const sessionId = await creditService.createCheckoutSession(packageId);
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId
      });

      if (error) {
        showToast(error.message, 'error');
      }
    } catch (err) {
      showToast('Une erreur est survenue', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vos Crédits</h1>
        <p className="text-xl">Solde actuel : {credits} crédits</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Object.values(CREDIT_PACKAGES).map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <div className="text-3xl font-bold mb-4">{pkg.credits} crédits</div>
            <div className="text-2xl font-bold mb-6">{pkg.price}€</div>
            <button
              onClick={() => handlePurchase(pkg.id as keyof typeof CREDIT_PACKAGES)}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Acheter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 