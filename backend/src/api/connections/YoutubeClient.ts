import { config } from "../../../deps.ts"; //loads env
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT } = config();

export default new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT,
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  defaults: {
      scope: "https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly",
  }
})