import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from "../connections/InstagramClient.ts";

const router = Router();

router
	.get("/", (_req, res) => {
		res.send("Hello Instagram!");
	})
	.get("/login", (_req, res) => {
		res.redirect(OAuth2Client.code.getAuthorizationUri().toString(),);
	})
	.get("/auth/callback", async (req, res) => {
	 	// Exchange the auth code for an access token
		const code = req.originalUrl.replace("/api/v1/instagram/auth/callback?code=","")

		const body = new FormData();
		body.set("client_id", OAuth2Client.config.clientId as string);
		body.set("client_secret", OAuth2Client.config.clientSecret as string);
		body.set("grant_type", "authorization_code");
		body.set("redirect_uri", OAuth2Client.config.redirectUri as string);
		body.set("code", code);

		const instaAuthResponse = await fetch(OAuth2Client.config.tokenUri, {method: "POST", body: body})
		const instaAuthResJSON = await instaAuthResponse.json();
		
		const access_token = instaAuthResJSON.access_token;
		const user_id = instaAuthResJSON.user_id;

		console.log(user_id);
		console.log(access_token);

		const instaResponse = await fetch(`https://graph.instagram.com/${user_id}?fields=id,username&access_token=${access_token}`)
		const { username } = await instaResponse.json();

		res.send(`Hallo ${username}`);

	})
//	.get("/PATH", (req,res) => {function})

export default router;