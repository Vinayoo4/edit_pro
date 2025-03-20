import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" attribute="class">
      <App />
    </ThemeProvider>
  </StrictMode>
);