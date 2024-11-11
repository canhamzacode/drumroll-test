import { Route, Routes } from "react-router-dom";
import { Home, ProductDetail } from "./pages";
import { ModalProvider } from "./context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from "./components/Layout";
import { useAuthState } from "./context/AuthContext/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";



function App() {
  const { isCheckingAuth } = useAuthState();

  if (isCheckingAuth) {
    return <div>Loading...</div>
  }

  return (
    <ModalProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/property/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><ProtectedRoute><div>Dashboard</div></ProtectedRoute></AppLayout>} />
      </Routes>
    </ModalProvider>
  )
}

export default App
