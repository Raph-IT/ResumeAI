import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ProfileDropdown } from './ProfileDropdown';

export const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              ResumeAI
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <NavLink to="/resumes">Mes CV</NavLink>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <NavLink to="/templates">Templates</NavLink>
                <NavLink to="/signin">Connexion</NavLink>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/signup"
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#7C3AED_50%,#E2E8F0_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Commencer gratuitement
                    </span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm text-gray-300 hover:text-white transition-colors relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 group-hover:w-full transition-all duration-300" />
  </Link>
); 