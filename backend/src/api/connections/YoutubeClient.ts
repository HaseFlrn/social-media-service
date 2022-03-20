import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //loads env
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

export default new OAuth2Client({
  clientId: Deno.env.get("YOUTUBE_CLIENT_ID") as string,
  clientSecret: Deno.env.get("YOUTUBE_CLIENT_SECRET") as string,
  redirectUri: "https://localhost:3000/api/v1/auth/callback",
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  defaults: {
      scope: "https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly",
  }
})