import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import { Routes } from './Routes';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
};