import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Toast } from "../../components/Toast";
import { ILoginInput, ISignUpInput } from "../../types";

export type AuthContextType = {
  token: string | null;
  signup: (data: ISignUpInput) => void;
  signin: (data: ILoginInput) => void;
  loading: boolean;
  isAuthenticated: boolean;
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
}

const baseURL = import.meta.env.VITE_BASE_URL;

const AuthContextProvider = ({ children }: IProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signup = async (data: ISignUpInput) => {
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/auth/register`, data);
            console.log(res.data);

            Toast("success", res.data.msg);
            localStorage.setItem("token", res.data.data.token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }   catch (error: any) {
            console.log(error.data.msg);
        }
    }

    const signin = async (data: ILoginInput) => {
        try {
            const res = await axios.post(`${baseURL}/auth/login`, data);
            console.log(res.data);

            Toast("success", res.data.msg);
            localStorage.setItem("token", res.data.data.token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }   catch (error: any) {
            console.log(error.data.msg);
        }
    }
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        setToken(token);
        }
        setLoading(false);
    }, []);
    
    const isAuthenticated = !!token;
    
    return (
        <AuthContext.Provider value={{ 
            token, 
            loading, 
            isAuthenticated,
            signup,
            signin,
        }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;