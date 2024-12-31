import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { CreditCard, Check, Star, Zap, Download, Clock, AlertCircle } from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Gratuit',
    price: '0€',
    period: 'pour toujours',
    features: [
      'Création de CV basique',
      '3 templates gratuits',
      'Exportation PDF',
      'Stockage limité'
    ],
    current: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '9.99€',
    period: 'par mois',
    features: [
      'Tous les templates premium',
      'Suggestions IA illimitées',
      'Exportation multi-formats',
      'Stockage illimité',
      'Support prioritaire'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    price: 'Sur mesure',
    period: 'annuel',
    features: [
      'Fonctionnalités Pro incluses',
      'API dédiée',
      'Support dédié 24/7',
      'Formation personnalisée',
      'Intégration sur mesure'
    ]
  }
];

export const BillingSettings = () => {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async (planId: string) => {
    setIsProcessing(true);
    try {
      // TODO: Implémenter la logique de paiement
      // await upgradePlan(planId);
      console.log('Upgrade to:', planId);
    } catch (error) {
      console.error('Erreur lors de la mise à niveau:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Plans d'abonnement */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Plans d'abonnement</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-xl border ${
                  plan.popular
                    ? 'border-blue-500/50 bg-blue-500/5'
                    : 'border-gray-800/50 bg-gray-900/50'
                } p-6 space-y-4`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      Populaire
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-blue-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isProcessing || plan.current}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
                    ${plan.current
                      ? 'bg-gray-700 text-gray-300 cursor-default'
                      : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {plan.current ? 'Plan actuel' : 'Choisir ce plan'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Historique de facturation */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Historique de facturation</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-4">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white">Plan Pro - Septembre 2023</p>
                  <p className="text-sm text-gray-400">9.99€ • Carte terminant par 4242</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Download className="w-4 h-4" />
                Facture
              </motion.button>
            </div>
          </div>
        </div>
      </Card>

      {/* Méthode de paiement */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Méthode de paiement</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gray-700">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-white">Visa terminant par 4242</p>
                <p className="text-sm text-gray-400">Expire en 12/2024</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300"
            >
              Modifier
            </motion.button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingSettings; 