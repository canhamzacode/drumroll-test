import { createContext, useContext, useEffect } from "react";
import { Toast } from "../../components/Toast";
import { socketInstance } from "../../utils/socket";


export const SocketContext = createContext({});

export const useSocketState = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error("SocketContext not found");
    }
    return state;
}

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        socketInstance.on('connect', () => {
            console.log('Socket connected:', socketInstance.id);
            Toast('success', 'Connected to WebSocket server');
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            Toast('error', 'Failed to connect to WebSocket server');
        });

        // Handle property updated event
        socketInstance.on('propertyUpdated', (updatedProperty) => {
            console.log('Property updated:', updatedProperty);
            Toast('success', 'Property updated');
        });

        // Handle properties fetched event
        socketInstance.on('propertiesFetched', (data) => {
            console.log('Properties fetched:', data);
            Toast('success', 'Properties fetched');
        });

        // Handle property fetched event
        socketInstance.on('propertyFetched', (property) => {
            console.log('Property fetched:', property);
            Toast('success', 'Property fetched');
        });

        // Handle property added event
        socketInstance.on('propertyAdded', (newProperty) => {
            console.log('Property added:', newProperty);
            Toast('success', 'Property added');
        });

        // Handle property deleted event
        socketInstance.on('propertyDeleted', (propertyId) => {
            console.log('Property deleted:', propertyId);
            Toast('success', 'Property deleted');
        });

        // Clean up the socket connection on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, [socketInstance]);

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
