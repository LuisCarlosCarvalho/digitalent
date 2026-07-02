import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Bloquear botão direito do rato (context menu)
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Bloquear atalhos de teclado de cópia, impressão e inspeção
document.addEventListener('keydown', (e) => {
  if (
    e.ctrlKey &&
    (e.key === 'c' || e.key === 'C' || 
     e.key === 'p' || e.key === 'P' || 
     e.key === 's' || e.key === 'S' || 
     e.key === 'u' || e.key === 'U')
  ) {
    e.preventDefault();
  }
  // Bloquear Print Screen
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
