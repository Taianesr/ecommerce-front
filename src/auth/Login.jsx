import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth.isAuthenticated && !auth.isLoading) {
            auth.signinRedirect();
        }
    }, [auth.isAuthenticated, auth.isLoading]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/");
        }
    }, [auth.isAuthenticated]);

    return <p>Redirecionando para login...</p>;
}

