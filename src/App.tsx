import { Route, Routes } from "react-router-dom";
import { Home, ProductDetail } from "./pages";
import { ModalProvider } from "./context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from "./components/Layout";
import AuthContextProvider from "./context/AuthContext/AuthContext";

function App() {

  return (
    <ModalProvider>
      <AuthContextProvider>
        <ToastContainer />
        <Routes>
            <Route
              path='/'
              element={
                <AppLayout>
                  <Home />
                </AppLayout>
              }
            />
            <Route
              path='/:id'
              element={
                <AppLayout>
                  <ProductDetail />
                </AppLayout>
              }
            />
        </Routes>
      </AuthContextProvider>
    </ModalProvider>
  )
}

export default App
