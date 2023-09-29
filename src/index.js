import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './components/App';
import './css/main-css.css';

export const AppConnector = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<AppConnector />);
