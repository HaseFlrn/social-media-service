import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from "../connections/YoutubeClient.ts";
import StatsRouter from "./myStatsRouter.ts";
import TrendsRouter from "./trendsRouter.ts";
import SubsRouter from "./subscriptionRouter.ts";

const router = Router();


router
  .get("/", (_req, res) => {
    res.send("Welcome to the YouTool API");
  })
  // Auth Process
  .get("/login", (_req, res) => {
    console.log("executed login");
    res.redirect(OAuth2Client.code.getAuthorizationUri().toString());
  })
  .get("/auth/callback", async (req, res) => {
    const tokens = await OAuth2Client.code.getToken(req.originalUrl);
    res.redirect(`${Deno.env.get("FRONTEND_URL")}youtube?token=${tokens.accessToken}`);
  });
router.use("/myStats", StatsRouter);
router.use("/trends", TrendsRouter);
router.use("/mySubs", SubsRouter);

export default router;
