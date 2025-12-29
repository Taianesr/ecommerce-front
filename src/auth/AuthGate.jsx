import { useAuth } from "react-oidc-context";

export default function AuthGate({ children }) {
    const auth = useAuth();

    if (auth.isLoading) return <div>Carregando...</div>;
    if (auth.error) return <div>Erro: {auth.error.message}</div>;

    if (!auth.isAuthenticated) {
        return (
            <button onClick={() => auth.signinRedirect()}>
                Login
            </button>
        );
    }

    return children;
}