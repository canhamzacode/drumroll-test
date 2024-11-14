import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { IBooking, IProperty, IPropertyFilter, IPropertySummary } from "../../types";
import axios from "axios";
import { Toast } from "../../components/Toast";
import { useAuthState } from "../AuthContext";
import { socketInstance } from "../../utils/socket";


interface IPropertyContext {
    loading: boolean;
    getAllProperties: () => Promise<void>;
    properties: IProperty [];
    setProperties: Dispatch<SetStateAction<IProperty []>>;
    getSingleProperty: (id: string) => Promise<void>;
    property: IProperty | null;
    createProperty: (data: FormData) => Promise<void>;
    initializePayment: (charge: number, booking: IProperty) => Promise<void>;
    initializingPayment: boolean;
    deleteProperty: (id: string) => Promise<void>;
    editProperty: (id: string, data: FormData)  => Promise<void>;
    searchProperties: (data: IPropertyFilter) => Promise<void>;
    getAllSummary: () => Promise<void>;
    getAllBookings: () => Promise<void>;
    summary: IPropertySummary | null;
    booking: IBooking [];
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
    const [initializingPayment, setInitializingPayment] = useState(false);
    const [summary, setSummary] = useState<IPropertySummary | null>(null);
    const [booking, setBookings] = useState<IBooking []>([]);

    const getAllProperties = async () =>{
        setLoading(true);
        try {
            const res = await axios.get("/property/all");
            setProperties(res.data.data.property);
        } catch {
            Toast("error", "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    }

    const searchProperties = async (data: IPropertyFilter) => {
        setLoading(true);
        try {
            const { location, guests } = data;
            const queryParams = new URLSearchParams({
                location,
                guests: guests.toString(),
            }).toString();
    
            const res = await axios.get(`/auth/search?${queryParams}`);
            setProperties(res.data.data.properties);
        } catch {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            Toast("error", error.data.msg || error.data.message || "Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    }
    
    const getAllSummary = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/property/dashboard/summary", {
                headers: {
                    "heri-auth-token": token,
                },
            });
            setSummary(res.data.data);
        } catch {
            Toast("error", "Failed to fetch properties");
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
            Toast("success", res.data.msg);
    
            // Open this URL in a new tab
            window.open(authorizationUrl, '_blank');
        } catch {
            Toast("error", "Failed to initialize payment. Please try again.");
        } finally {
            setInitializingPayment(false);
        }
    };

    const createProperty = async (data: FormData) => {
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
            const newProperty = res.data.data;
            getAllSummary();
            setProperties((prev) => [newProperty, ...prev]);
            socketInstance.emit("propertyAdded", data);
        } catch {
            Toast("error", "Failed to create property");
            setLoading(false);
        }
    };

    const editProperty = async (id: string, data: FormData) => {
        setLoading(true);
        try {
            const res = await axios.put(`/property/update/one/${id}`, data, {
                headers: {
                    "heri-auth-token": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            Toast("success", res.data.msg);
            // const updatedProperty = res.data.data;
            // setProperties((prev) => 
            //     prev.map((prop) => (prop._id === updatedProperty.id ? updatedProperty : prop))
            // );
            getAllProperties();
            socketInstance.emit("propertyUpdated", data);
        } catch {
            Toast("error", "Failed to edit property");
            setLoading(false);
        }
    };

    const deleteProperty = async (id: string) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/property/delete/one/${id}`, {
                headers: {
                    "heri-auth-token": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            Toast("success", res.data.msg);
            setProperties((prev) => prev.filter((prop) => prop._id !== id));
            socketInstance.emit("propertyDeleted", {
                message: "Property deleted",
            });
        } catch {
            Toast("error", `Failed to delete property`);
            setLoading(false);
        }
    }

    const getAllBookings = async () => {
        setLoading(true);
            try {
                const res = await axios.get("/booking/all", {
                    headers: {
                        "heri-auth-token": token,
                    },
                });
                setBookings(res.data.data);
            } catch {
                Toast("error", "Failed to fetch bookings");
            } finally {
                setLoading(false);
        }
    }

    return (
        <PropertyContext.Provider value={{ 
            loading,
            property,
            initializingPayment,
            properties,
            summary,
            booking,
            getSingleProperty,
            getAllProperties,
            createProperty,
            initializePayment,
            editProperty,
            deleteProperty,
            searchProperties,
            getAllSummary,
            getAllBookings,
            setProperties
        }}>
            {children}
        </PropertyContext.Provider>
    )
}

export default PropertyContextProvider;