import { io } from "socket.io-client";
export const socketInstance = io(`${import.meta.env.VITE_SERVER_URL}`, {
    path: '/socket.io',
    reconnectionAttempts: 5,
    timeout: 20000,
    transports: ['websocket', 'polling'],
});
