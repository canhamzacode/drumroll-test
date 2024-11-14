import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext/AuthContext.tsx'
import PropertyContextProvider from './context/PropertyContext/PropertyContext.tsx'
import { ModalProvider } from './context/modalContext.tsx'
import { SectionProvider } from './context/SectionContext/SectionContext.tsx'
import SocketContextProvider from './context/SocketContext/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <PropertyContextProvider>
            <ModalProvider>
              <SectionProvider>
                  <App />
              </SectionProvider>
            </ModalProvider>
          </PropertyContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
