export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || "dev-ex314.us.auth0.com",
  clientId: process.env.AUTH0_CLIENT_ID || "9IvSlBsfxlSM3pZVolyXPUpofrfryPtb", // Updated to match the client ID from the documentation
  authorizationParams: {
    redirect_uri: typeof window !== "undefined" ? window.location.origin : process.env.AUTH0_REDIRECT_URI || "",
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email",
  },
  // Add this line for the namespace used for custom claims
  namespace: process.env.AUTH0_NAMESPACE || "https://ex314.ai",
}
