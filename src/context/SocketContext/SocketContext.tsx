import { createContext, useContext, useEffect } from "react";
import { Toast } from "../../components/Toast";
import { socketInstance } from "../../utils/socket";
import { usePropertyState } from "../PropertyContext";
// import { usePropertyState } from "../PropertyContext";

export const SocketContext = createContext({});

export const useSocketState = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error("SocketContext not found");
    }
    return state;
}

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const {setProperties, getAllProperties} = usePropertyState();
    useEffect(() => {
        // Socket connection event
        socketInstance.on('connect', () => {
            console.log('Socket connected:', socketInstance.id);
            Toast('success', 'Connected to WebSocket server');
        });

        // Socket connection error event
        socketInstance.on('connect_error', (error) => {
            console.log('Socket connection error:', error);
            Toast('error', `Failed to connect to WebSocket server ${error}`);
        });

        // Handle property updated event
        socketInstance.on('property_updated', (updatedProperty) => {
            Toast('success', 'Property updated');
            setProperties((prev) => 
                prev.map((prop) => (prop._id === updatedProperty.id ? updatedProperty : prop))
            );
            getAllProperties();
        });

        // Handle property added event
        socketInstance.on('property_added', (newProperty) => {
            Toast('success', 'Property added');
            setProperties((prev) => [newProperty, ...prev]);
            getAllProperties();
        });

        // Handle property deleted event
        socketInstance.on('property_deleted', (propertyId) => {
            Toast('success', 'Property deleted');
            setProperties((prev) => prev.filter((prop) => prop._id !== propertyId));
            getAllProperties();
        });

        // Clean up event listeners when component unmounts
        return () => {
            socketInstance.off('connect');
            socketInstance.off('connect_error');
            socketInstance.off('property_updated');
            socketInstance.off('property_added');
            socketInstance.off('property_deleted');
            // Disconnect socket when component is unmounted
            // socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
