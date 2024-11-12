import { createContext, ReactNode, useContext, useState } from "react";
import { IProperty } from "../../types";
import axios from "axios";
import { Toast } from "../../components/Toast";

interface IPropertyContext {
    loading: boolean;
    getAllProperties: () => Promise<void>;
    properties: IProperty [];
    getSingleProperty: (id: string) => Promise<void>;
    property: IProperty | null;
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
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<IProperty []>([]);
    const [property, setProperty] = useState<IProperty | null>(null);

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
        } catch (error) {
            console.log(error);
            Toast("error", "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PropertyContext.Provider value={{ 
            loading,
            property,
            properties,
            getSingleProperty,
            getAllProperties,
        }}>
            {children}
        </PropertyContext.Provider>
    )
}

export default PropertyContextProvider;