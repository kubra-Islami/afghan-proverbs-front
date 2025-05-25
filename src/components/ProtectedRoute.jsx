import React from "react";
import { Navigate } from "react-router-dom";
import {useOnlineStatus} from "../contexts/OnlineStatusContext.jsx";

const ProtectedRoute = ({ children }) => {
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
