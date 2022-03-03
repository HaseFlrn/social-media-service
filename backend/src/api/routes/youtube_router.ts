import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from "../connections/YoutubeClient.ts";

const router = Router();

router
	.get("/v/:token", (req, res) => {
		res.send(`Hello Youtube! ${req.params.token}`);
	})
	.get("/login", (_req, res) => {
		res.redirect(OAuth2Client.code.getAuthorizationUri().toString());
	})
	.get("/auth/callback", async (req, res) => {
		const code = req.originalUrl;
		const token = await OAuth2Client.code.getToken(code);
		
		res.redirect("https://localhost:3000/api/v1/youtube/v/" + token.accessToken)
	})
//.get("/PATH", (req,res) => {function})

export default router;