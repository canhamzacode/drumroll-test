import { Route, Routes } from "react-router-dom";
import { Home, ProductDetail } from "./pages";
import { ModalProvider } from "./context";
import { AppLayout } from "./components/Layout";

function App() {

  return (
    <ModalProvider>
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
    </ModalProvider>
  )
}

export default App
