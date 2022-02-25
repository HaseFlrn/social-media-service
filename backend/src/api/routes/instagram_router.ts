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
//	.get("/PATH", (req,res) => {function})

export default router;
