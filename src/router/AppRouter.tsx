import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CalendarRoutes } from '../calendar/routes/CalendarRoutes';
import { useAuthStore } from '@/hooks';
import { useEffect } from 'react';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect( () => {
    checkAuthToken();
  }, [] );


  if ( status === 'checking' ) {
    return (
      <h3>Loading...</h3>
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
