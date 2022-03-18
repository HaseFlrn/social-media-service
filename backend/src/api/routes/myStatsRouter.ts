import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { getVideoQuantity, getSubscriberQuantity, getAllTimeViews } from "../../services/youtube/myStats.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("This is myStatsRouter.ts");
  })
  .get("/videoQuantity", (req,res) => {
    res.send(getVideoQuantity(req.params.token));
  })
  .get("/subscriberQuantity", (req,res) => {
    res.send(getSubscriberQuantity(req.params.token));
  })
  .get("/allTimeViews", (req,res) => {
    res.send(getAllTimeViews(req.params.token));
  })
//.get("/PATH", (req,res) => {function})

export default router;