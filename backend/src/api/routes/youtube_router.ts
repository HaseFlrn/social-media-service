import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from "../connections/YoutubeClient.ts";
import { getSubsriptionInformations } from "../../services/youtube/aboService.ts";
import { getAllSubscriptions } from "../../services/youtube/mySubscriptions.ts";

const router = Router();

router
	// Auth Process
	.get("/login", (_req, res) => {
		res.redirect(OAuth2Client.code.getAuthorizationUri().toString());
	})
	.get("/auth/callback", async (req, res) => {
		const tokens = await OAuth2Client.code.getToken(req.originalUrl);
		
		res.redirect(`${Deno.env.get("FRONTEND_URL")}youtube?token=${tokens.accessToken}`);
	})

	// Channel stats API

	// Trends API

	// Subsrciption API
	.get("/subInfo/:token", (req,res) => {
		res.send(getSubsriptionInformations(req.params.token));
	})
	.get("/subscriptions", (req,res) => {
		res.send(getAllSubscriptions(req.params.token));
	})
//.get("/PATH", (req,res) => {function})

export default router;