import { Navigate, Route, Routes } from 'react-router-dom';

import { CalendarRoutes } from '../calendar/routes/CalendarRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRouter = () => {
  const authStatus = 'authenticated';
  return (
    <Routes>
      { authStatus !== 'authenticated' ? (
        <Route path="/*" element={ <CalendarRoutes /> } />
      ) : (
        <Route path="/auth/*" element={ <AuthRoutes /> } />
      ) }

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  );
};
