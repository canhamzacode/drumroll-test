/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Toast } from "../../components/Toast";
import { ILoginInput, ISignUpInput, IUser } from "../../types";

export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  signup: (data: ISignUpInput) => Promise<void>;
  signin: (data: ILoginInput) => Promise<void>;
  checkAuth: (authToken: string | null) => Promise<void>;
  logout: () => void;
};

interface IProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthState = () => {
    const state = useContext(AuthContext);
    if (!state) {
        throw new Error("AuthContext not found");
    }
    return state;
};

const baseURL = import.meta.env.VITE_BASE_URL;

const AuthContextProvider = ({ children }: IProps) => {
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: ISignUpInput) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/auth/register`, data);
            setToken(res.data.data.token);
            setUser(res.data.data.user);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.data.data.token);
            Toast("success", res.data.msg);
        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed");
            Toast("error", err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const signin = async (data: ILoginInput) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/auth/login`, data);
            setToken(res.data.data.token);
            setUser(res.data.data.user);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.data.data.token);
            Toast("success", res.data.msg);
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            Toast("error", err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const checkAuth = async (authToken: string | null) => {
        setError(null);
        setIsCheckingAuth(true);
        try {
            const res = await axios.get(`${baseURL}/auth/user`, 
                { headers: 
                    {"heri-auth-token": authToken}
                }
            );
            setUser(res.data.data.user);
            setIsAuthenticated(true);
            setIsCheckingAuth(false);
        } catch (err: any) {
            console.log(err);
            setError(null);
            setIsAuthenticated(false);
            // localStorage.removeItem("token");
        } finally {
            setLoading(false);
            setIsCheckingAuth(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        Toast("success", "Logged out successfully");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            checkAuth(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            loading,
            error,
            signup,
            signin,
            checkAuth,
            logout,
            isCheckingAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
