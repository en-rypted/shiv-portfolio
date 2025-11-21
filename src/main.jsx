import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IsMobile } from './context/IsMobile.jsx'
import { IsLoder } from './context/IsLoder.jsx'
import { Auth } from './context/Auth.jsx'


createRoot(document.getElementById('root')).render(
  <IsLoder>
    <IsMobile>
      <Auth>
        <AlertProvider>
          <App />
        </AlertProvider>
      </Auth>
    </IsMobile>
  </IsLoder>,
)
