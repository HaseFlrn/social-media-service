import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import general from "../../services/youtube/general.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("This is generalRouter.ts");
  })
  .get("/channelName/:token", general.getChannelName)
  .get("/channelDescription/:token", general.getChannelDescription)
  .get("/channelPublishedAt/:token", general.getChannelPublishedAt)
//.get("/PATH", (req,res) => {function})

export default router;