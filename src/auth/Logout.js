import { authConfig } from "../config/authConfig";

export function signOutRedirect() {
    const { clientId, cognitoDomain, logoutUri } = authConfig;

    window.location.href =
        `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
}
