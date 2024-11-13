import { Navigate } from "react-router-dom";
import { useAuthState } from "../context";

interface IProps {
    children: React.ReactNode;
  }
  
const ProtectedRoute = ({ children }: IProps) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthState();
    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }

    if (!isCheckingAuth && user && user.role !== 'admin') {
        return <Navigate to='/' />;
    }
    return children;
}

export default ProtectedRoute;
