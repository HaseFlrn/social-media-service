import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { getChannelName, getChannelDescription, getChannelPublishedAt } from "../../services/youtube/general.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("This is generalRouter.ts");
  })
  .get("/channelName/:token", (req,res) => {
    console.log(getChannelName(req.params.token))
    res.send(getChannelName(req.params.token));
  })
  .get("/channelDescription/:token", (req,res) => {
    console.log(getChannelDescription(req.params.token))
    res.send(getChannelDescription(req.params.token));
  })
  .get("/channelPublishedAt/:token", (req,res) => {
    console.log(getChannelDescription(req.params.token))
    res.send(getChannelPublishedAt(req.params.token));
   })
//.get("/PATH", (req,res) => {function})

export default router;