import './global.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DisclosableRoot } from 'use-disclosable'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <DisclosableRoot />
  </StrictMode>,
)
