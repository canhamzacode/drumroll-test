import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
import PropertyContextProvider from './context/PropertyContext/PropertyContext.tsx'
import { ModalProvider } from './context/modalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PropertyContextProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PropertyContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
