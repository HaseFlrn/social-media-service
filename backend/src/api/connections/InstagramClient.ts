import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //loads env
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

export default new OAuth2Client({
    clientId: Deno.env.get("INSTAGRAM_CLIENT_ID") as string,
    clientSecret: Deno.env.get("INSTAGRAM_CLIENT_SECRET") as string,
    redirectUri: "https://localhost:3000/api/v1/instagram/auth/callback",
    authorizationEndpointUri: "https://api.instagram.com/oauth/authorize?",
    tokenUri: "https://api.instagram.com/oauth/access_token",
    defaults: {
        scope: "user_profile,user_media",
    }
})