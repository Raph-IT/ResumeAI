import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BackgroundBeams } from './BackgroundBeams';

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/0 pointer-events-none" />
      <div className="relative">
        <nav className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
              <div className="relative flex items-center px-7 py-4 bg-black rounded-lg leading-none">
                <span className="flex items-center space-x-2">
                  <span className="text-white font-bold text-xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    ResumeAI
                  </span>
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group px-4 py-2 rounded-lg transition duration-200 ${
                        isActive('/') ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      <span className="relative">
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-lg blur-sm" />
                        <span className="relative flex items-center gap-2">
                          <Home className="w-5 h-5" />
                          Accueil
                        </span>
                      </span>
                    </motion.button>
                  </Link>
                  <Link to="/resumes">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group px-4 py-2 rounded-lg transition duration-200 ${
                        isActive('/resumes') ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      <span className="relative">
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-lg blur-sm" />
                        <span className="relative flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Mes CV
                        </span>
                      </span>
                    </motion.button>
                  </Link>
                  <Link to="/profile">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group px-4 py-2 rounded-lg transition duration-200 ${
                        isActive('/profile') ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      <span className="relative">
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-lg blur-sm" />
                        <span className="relative flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Profil
                        </span>
                      </span>
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="group px-4 py-2 rounded-lg text-gray-400 transition duration-200"
                  >
                    <span className="relative">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-lg blur-sm" />
                      <span className="relative flex items-center gap-2">
                        <LogOut className="w-5 h-5" />
                        Déconnexion
                      </span>
                    </span>
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 text-gray-300 hover:text-white transition duration-200"
                    >
                      Connexion
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                      <div className="relative px-6 py-2 bg-black rounded-lg">
                        <span className="text-white">Inscription</span>
                      </div>
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar; 