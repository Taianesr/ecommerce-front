export const authConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1cxyphc5xq",
    client_id: "54jjd5ooujof3dnuop10gcs5c7",
    redirect_uri: "https://d84l1y8p4kdic.cloudfront.net/callback",
    response_type: "code",
    scope: "openid email profile",
    automaticSilentRenew: true,
    loadUserInfo: false
};