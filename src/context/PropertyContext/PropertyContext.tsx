import { createContext, ReactNode, useContext, useState } from "react";
import { IProperty } from "../../types";
import axios from "axios";
import { Toast } from "../../components/Toast";
import { useAuthState } from "../AuthContext";

interface IPropertyContext {
    loading: boolean;
    getAllProperties: () => Promise<void>;
    properties: IProperty [];
    getSingleProperty: (id: string) => Promise<void>;
    property: IProperty | null;
    createProperty: (data: FormData) => Promise<void>;
    initializePayment: (charge: number, booking: IProperty) => Promise<void>;
    initializingPayment: boolean;
}

interface IProps {
    children: ReactNode;
}

export const PropertyContext = createContext<IPropertyContext | undefined>(undefined);

export const usePropertyState = () => {
    const state = useContext(PropertyContext);
    if (!state) {
        throw new Error("PropertyContext not found");
    }
    return state;
}

const PropertyContextProvider = ({ children }: IProps) => {
    const {token} = useAuthState();
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<IProperty []>([]);
    const [property, setProperty] = useState<IProperty | null>(null);
    const [initializingPayment, setInitializingPayment] = useState(false)

    const getAllProperties = async () =>{
        setLoading(true);
        try {
            const res = await axios.get("/property/all");
            setProperties(res.data.data.property);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
            Toast("error", "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    }

    const getSingleProperty = async (id: string) => {
        setLoading(true);
        try {
            const res = await axios.get(`/property/one/${id}`);
            setProperty(res.data.data);
            console.log(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            Toast("error", error.data.msg || error.data.message || "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    }
    

    const initializePayment = async (charge: number, booking: IProperty) => {
        setInitializingPayment(true);
        try {
            const res = await axios.post(
                "/payment/card/start",
                { booking, charge },
                { headers: { "heri-auth-token": token } }
            );
    
            const authorizationUrl = res.data.data.data.authorization_url;
            console.log(authorizationUrl);
            Toast("success", res.data.msg);
    
            // Open this URL in a new tab
            window.open(authorizationUrl, '_blank');
        } catch (error) {
            console.error("Payment Initialization Error:", error);
            Toast("error", "Failed to initialize payment. Please try again.");
        } finally {
            setInitializingPayment(false);
        }
    };

    const createProperty = async (data: FormData) => {
        console.log(token);
        setLoading(true);
        try {
            const res = await axios.post("/property/add", data, {
                headers: {
                    "heri-auth-token": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            Toast("success", res.data.msg);
        } catch (error) {
            Toast("error", "Failed to create property");
            setLoading(false);
            console.error("Error:", error);
        }
    };

    return (
        <PropertyContext.Provider value={{ 
            loading,
            property,
            initializingPayment,
            properties,
            getSingleProperty,
            getAllProperties,
            createProperty,
            initializePayment
        }}>
            {children}
        </PropertyContext.Provider>
    )
}

export default PropertyContextProvider;