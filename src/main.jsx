import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";


const queryClient = new QueryClient();

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_CxYPhC5xq",
    client_id: "54jjd5ooujof3dnuop10gcs5c7",
    redirect_uri: window.location.origin,
    response_type: "code",
    scope: "email openid phone",
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider {...cognitoAuthConfig}>
                <Root />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
