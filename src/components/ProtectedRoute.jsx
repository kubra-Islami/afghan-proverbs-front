import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isOnline, children }) => {
    if (!isOnline) {
        // Redirect to home or show a blank screen
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
