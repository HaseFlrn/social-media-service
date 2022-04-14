import { Router } from "../../../deps.ts";
import generalChannelInformations from "../../services/youtube/generalChannelInformations.ts";


const router = new Router();

router
  .get("/", ({response}) => {
    response.body = "This is generalRouter.ts";
  })
  .get("/channelInfos/:token", generalChannelInformations.getChannelInfos)
//.get("/PATH", (req,res) => {function})

export default router;