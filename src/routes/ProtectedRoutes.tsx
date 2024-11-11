import { Navigate } from "react-router-dom";
import { useAuthState } from "../context";

interface IProps {
    children: React.ReactNode;
  }
  
const ProtectedRoute = ({ children }: IProps) => {
    const { isAuthenticated, user } = useAuthState();
    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }

    if (user && user.role !== 'admin') {
        return <Navigate to='/' />;
    }
    return children;
}

export default ProtectedRoute;
