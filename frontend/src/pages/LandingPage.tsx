import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import LoginModal from '../components/auth/LoginModal';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { login } = useAuth();

  const handleLoginSuccess = (response: any) => {
    // In a real application, you would validate the token with your backend
    login({
      id: '1',
      email: 'user@example.com',
      name: 'User',
      preferredLanguage: 'en'
    });
  };

  const handleGetStartedClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onGetStartedClick={handleGetStartedClick} />
        <Features />
        <Pricing onGetStartedClick={handleGetStartedClick} />
        <FAQ />
      </main>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}