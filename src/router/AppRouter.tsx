import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/hooks';
import { LoadingPage } from '@/ui/LoadingPage';
import { useEffect } from 'react';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CalendarRoutes } from '../calendar/routes/CalendarRoutes';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect( () => {
    checkAuthToken();
  }, [] );


  if ( status === 'checking' ) {
    return (
      <LoadingPage />
    );
  }

  return (
    <Routes>
      { status === 'authenticated' ? (
        <Route path="/*" element={ <CalendarRoutes /> } />
      ) : (
        <Route path="/auth/*" element={ <AuthRoutes /> } />
      ) }

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  );
};
