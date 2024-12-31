import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStartedClick?: () => void;
}

export default function Hero({ onGetStartedClick }: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-30">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </div>

      <div className="container mx-auto px-6 text-center relative">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 relative inline-block">
            Land Your Dream AI Job
            <Sparkles className="inline-block ml-2 h-12 w-12 animate-pulse" />
            <div className="absolute -inset-1 bg-white/20 rounded-lg blur-lg group-hover:blur-xl transition-all" />
          </h1>
        </div>

        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-indigo-100 animate-fade-in-up delay-200">
          Use AI to optimize your job applications and increase your chances of getting hired in the AI industry.
        </p>

        <button 
          onClick={onGetStartedClick}
          className="group bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg 
                   hover:bg-indigo-100 transition-all duration-300 
                   hover:shadow-lg hover:scale-105 
                   flex items-center mx-auto
                   animate-fade-in-up delay-400"
        >
          Start Applying Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
  );
}