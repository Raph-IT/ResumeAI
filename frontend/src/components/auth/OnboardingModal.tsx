import React from 'react';
import { OnboardingFlow } from '../onboarding/OnboardingFlow';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const OnboardingModal = () => {
  const { user } = useAuth();

  const handleOnboardingComplete = async () => {
    if (!user) return;
    
    // Marquer l'utilisateur comme non-nouveau
    await setDoc(doc(db, 'users', user.uid), {
      isNewUser: false,
      onboardingCompleted: true
    }, { merge: true });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-75" />
        
        <div className="relative bg-gray-900 rounded-lg w-full max-w-3xl mx-4">
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </div>
      </div>
    </div>
  );
};