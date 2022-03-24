import { Router } from "../../../deps.ts";
import general from "../../services/youtube/general.ts";


const router = new Router();

router
  .get("/", ({response}) => {
    response.body = "This is generalRouter.ts";
  })
  .get("/channelName/:token", general.getChannelName)
  .get("/channelDescription/:token", general.getChannelDescription)
  .get("/channelPublishedAt/:token", general.getChannelPublishedAt)
//.get("/PATH", (req,res) => {function})

export default router;