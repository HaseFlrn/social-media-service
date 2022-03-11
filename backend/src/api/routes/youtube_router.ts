import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from "../connections/YoutubeClient.ts";
import { getSubsriptionInformations } from "../../services/youtube/aboService.ts";

const router = Router();

router
	.get("/v/:token", (req, res) => {
		res.send(`Hello Youtube! ${req.params.token}`);
	})
	.get("/login", (_req, res) => {
		res.redirect(OAuth2Client.code.getAuthorizationUri().toString());
	})
	.get("/auth/callback", async (req, res) => {
		const tokens = await OAuth2Client.code.getToken(req.originalUrl);
		
		res.redirect(`${Deno.env.get("FRONTEND_URL")}youtube?token=${tokens.accessToken}`);
	})
	.get("/subInfo/:token", (req,res) => {
		res.send(getSubsriptionInformations(req.params.token));
	})
//.get("/PATH", (req,res) => {function})

export default router;