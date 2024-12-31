import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignInForm } from '../components/auth/SignInForm';
import { useAuth } from '../contexts/AuthContext';

export const SignIn: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirection si déjà connecté
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from || '/resumes';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  );
};

export default SignIn; 