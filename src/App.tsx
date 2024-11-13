import { Route, Routes } from "react-router-dom";
import { Dashboard, Home, ProductDetail } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from "./components/Layout";
import { useAuthState } from "./context/AuthContext/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
// import ProtectedRoute from "./routes/ProtectedRoutes";



function App() {
  const { isCheckingAuth } = useAuthState();

  if (isCheckingAuth) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/property/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
        <Route path="/dashboard/*" element={<AppLayout>
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
        </AppLayout>} />
      </Routes>
    </>
  )
}

export default App
