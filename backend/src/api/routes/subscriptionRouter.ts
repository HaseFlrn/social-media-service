import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { getSubsriptionInformations } from "../../services/youtube/aboService.ts";
import { getAllSubscriptions } from "../../services/youtube/mySubscriptions.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("That's fuckin Obi-Wan-Kenobi!");
  })
	.get("/subInfo/:token", (req,res) => {
		console.log("subInfo called");
    res.send(req.params.token);
    //res.send(getSubsriptionInformations(req.params.token));
	})
	.get("/subscriptions", (req,res) => {
    console.log("subscriptions called");
		res.send(getAllSubscriptions(req.params.token));
	})
//.get("/PATH", (req,res) => {function})

export default router;