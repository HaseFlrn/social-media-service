import { Router } from "../../../deps.ts";
import subController from "../../services/youtube/subController.ts";

const router = new Router();

router
  // deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "That's fuckin Obi-Wan-Kenobi!";
  })
	.get("/subs/:token", subController.getAllSubscriptions)
  .get("/stats/:token", subController.getChannelStats)
//.get("/PATH", (req,res) => {function})

export default router;