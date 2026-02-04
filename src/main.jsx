import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // Strict mode provides additional checks and warnings while development
  <StrictMode>
    <App />
  </StrictMode>,
)
