import { Router } from "../../../deps.ts";
import subController from "../../services/youtube/subController.ts";

const router = new Router();

router
  // deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "That's fuckin Obi-Wan-Kenobi!";
  })
	.get("/subs", subController.getAllSubscriptions)
  .get("/sub/stats", subController.getChannelStats)
  .get("/sub/videos", subController.getChannelVideos)
  .get("/sub/topVideos", subController.getChannelTopVideos)
  .get("/sub/charts", subController.getChannelChartVideos)
//.get("/PATH", (req,res) => {function})

export default router;