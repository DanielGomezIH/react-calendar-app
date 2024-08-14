import React from 'react';
import ReactDOM from 'react-dom/client';

import { CalendarApp } from './CalendarApp';
import { ReduxProvider } from './store';
import './index.css';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <ReduxProvider>
      <CalendarApp />
    </ReduxProvider>
  </React.StrictMode>
);
