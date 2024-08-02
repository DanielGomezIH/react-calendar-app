import React from 'react';
import { Navbar } from '../components';

type CalendarLayoutProps = {
  children: React.ReactNode;
};

export const CalendarLayout = ( { children }: CalendarLayoutProps ) => {
  return (
    <div className="flex min-h-screen w-full flex-col">

      <Navbar />

      <main className="p-4 md:p-6">
        { children }
      </main>

    </div>
  );
};