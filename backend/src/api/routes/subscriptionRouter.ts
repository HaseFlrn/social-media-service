import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { getSubsriptionInformations } from "../../services/youtube/aboService.ts";
import { getAllSubscriptions } from "../../services/youtube/mySubscriptions.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("That's fuckin Obi-Wan-Kenobi!");
  })
	.get("/subInfo/:token", function(req,res) {
		res.send(getSubsriptionInformations(req.params.token));
	})
	.get("/subscriptions", (req,res) => {
		res.send(getAllSubscriptions(req.params.token));
	})
//.get("/PATH", (req,res) => {function})

export default router;