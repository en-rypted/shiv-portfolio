import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IsMobile } from './context/IsMobile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IsMobile>
    <App />
    </IsMobile>
  </StrictMode>,
)
