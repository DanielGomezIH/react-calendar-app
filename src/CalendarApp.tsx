import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "sonner";
import { AppRouter } from './router';

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" />
      <AppRouter />
    </BrowserRouter>
  );
};