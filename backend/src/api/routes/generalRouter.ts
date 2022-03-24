import { Router } from "../../../deps.ts";
import general from "../../services/youtube/general.ts";


const router = new Router();

router
  .get("/", ({response}) => {
    response.body = "This is generalRouter.ts";
  })
  .get("/channelInfos/:token", general.getChannelInfos)
//.get("/PATH", (req,res) => {function})

export default router;