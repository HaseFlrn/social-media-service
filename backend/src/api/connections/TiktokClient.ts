import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //loads env
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

export default new OAuth2Client({
  clientId: Deno.env.get("") as string,
  clientSecret: Deno.env.get("") as string,
  redirectUri: "https://localhost:3000/api/v1/tiktok/auth/callback",
  authorizationEndpointUri: "https://open-api.tiktok.com/oauth/access_token/",
  tokenUri: "",
  defaults: {
      scope: "",
  }
})