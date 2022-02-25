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
	// .get("/auth/callback", async (req, res) => {
	// 	// Exchange the auth code for an access token
	// 	const tokens = await OAuth2Client.code.getToken(req.originalUrl);
		
	// 	// Use the access token to make an authenticate API request
	// 	const userResponse = await (`https://graph.instagram.com/${tokens.}?fields=id,username&access_token=${access-token}`)

	// })
//	.get("/PATH", (req,res) => {function})

export default router;
