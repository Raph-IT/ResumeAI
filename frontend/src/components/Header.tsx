import React, { useState } from 'react';
import { BrainCircuit, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8" />
            <span className="text-2xl font-bold">AICareer</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="hover:text-indigo-200 transition-colors duration-200">How it Works</a>
            <a href="#pricing" className="hover:text-indigo-200 transition-colors duration-200">Pricing</a>
            <a href="#faq" className="hover:text-indigo-200 transition-colors duration-200">FAQ</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden 
          fixed inset-x-0 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          bg-indigo-600 
          mt-4 
          p-4 
          space-y-4
          rounded-b-lg
          shadow-lg
        `}>