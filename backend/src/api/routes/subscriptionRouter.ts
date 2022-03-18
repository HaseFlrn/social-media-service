import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import subController from "../../services/youtube/subController.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("That's fuckin Obi-Wan-Kenobi!");
  })
	.get("/subs/:token", subController.getAllSubscriptions)
//.get("/PATH", (req,res) => {function})

export default router;