import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IsMobile } from './context/IsMobile.jsx'
import { IsLoder } from './context/IsLoder.jsx'
import { Auth } from './context/Auth.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IsLoder>
    <IsMobile>
      <Auth>
    <App />
    </Auth>
    </IsMobile>
    </IsLoder>
  </StrictMode>,
)
