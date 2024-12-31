import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onGetStartedClick?: () => void;
}

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "5 job applications per month",
      "Basic AI optimization",
      "Job matching",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$29/month",
    features: [
      "Unlimited applications",
      "Advanced AI optimization",
      "Priority job matching",
      "24/7 support",
      "Expert application review",
      "Interview preparation"
    ],
    highlighted: true
  }
];

export default function Pricing({ onGetStartedClick }: PricingProps) {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105'
                  : 'bg-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-8">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStartedClick}
                className={`w-full py-3 rounded-full font-bold ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}