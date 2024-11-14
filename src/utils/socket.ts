import { io } from "socket.io-client";

export const socketInstance = io("https://heristays.onrender.com", {
    path: '/',
    reconnectionAttempts: 5,
    timeout: 20000,
});