import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const hasPrerenderedContent =
  rootElement.hasChildNodes() &&
  rootElement.innerHTML.trim() !== '<!--APP_HTML-->';

if (hasPrerenderedContent) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
