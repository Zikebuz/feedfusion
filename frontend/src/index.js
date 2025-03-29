import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import HelmetProvider
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Wrap the App with HelmetProvider */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
