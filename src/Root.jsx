import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cart from "./Cart";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AuthCallback from "./auth/AuthCallback";


export default function Root() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/callback" element={<AuthCallback />} />
            </Route>
        </Routes>
    );
}
