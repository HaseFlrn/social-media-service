import { Router } from "../../../deps.ts";
import subController from "../../services/youtube/subController.ts";

const router = new Router();

router
  // deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "That's fuckin Obi-Wan-Kenobi!";
  })
	.get("/subs", subController.getAllSubscriptions)
  .get("/stats/basic", subController.getChannelBasicStats)
  .get("/stats/advanced", subController.getChannelAdvStats)
  .get("/videos", subController.getChannelVideos)
  .get("/videos/top", subController.getChannelTopVideos)
  .get("/videos/charts", subController.getChannelChartVideos)
//.get("/PATH", (req,res) => {function})

export default router;