import React from 'react';

export const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Nos offres</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Forfait Gratuit */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Gratuit</h2>
          <p className="text-3xl font-bold mb-6">0€</p>
          <ul className="space-y-3 mb-6">
            <li>✓ 1 CV</li>
            <li>✓ Templates de base</li>
            <li>✓ Export PDF</li>
          </ul>
        </div>

        {/* Forfait Pro */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-lg border-2 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4">Pro</h2>
          <p className="text-3xl font-bold mb-6">9.99€/mois</p>
          <ul className="space-y-3 mb-6">
            <li>✓ CV illimités</li>
            <li>✓ Tous les templates</li>
            <li>✓ Suggestions AI</li>
            <li>✓ Support prioritaire</li>
          </ul>
        </div>

        {/* Forfait Entreprise */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Entreprise</h2>
          <p className="text-3xl font-bold mb-6">Sur devis</p>
          <ul className="space-y-3 mb-6">
            <li>✓ Tout Pro +</li>
            <li>✓ API access</li>
            <li>✓ Support dédié</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 