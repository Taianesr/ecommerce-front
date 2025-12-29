import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";


export default function ProtectedRoute() {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}