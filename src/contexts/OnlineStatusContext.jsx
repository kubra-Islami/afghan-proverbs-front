// src/context/OnlineStatusContext.js
import React, { createContext, useEffect, useState, useContext } from "react";

const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <OnlineStatusContext.Provider value={isOnline}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export const useOnlineStatus = () => useContext(OnlineStatusContext);
