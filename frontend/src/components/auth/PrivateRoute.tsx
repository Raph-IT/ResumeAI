import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = () => {
  const { user, loading } = useAuth();

  console.log('PrivateRoute:', {
    isLoading: loading,
    hasUser: !!user,
    userId: user?.uid,
    currentTimestamp: new Date().toISOString()
  });

  if (loading) {
    console.log('PrivateRoute: Still loading auth state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    console.log('PrivateRoute: No user, redirecting to signin');
    return <Navigate to="/signin" />;
  }

  console.log('PrivateRoute: User authenticated, rendering protected route');
  return <Outlet />;
}; 