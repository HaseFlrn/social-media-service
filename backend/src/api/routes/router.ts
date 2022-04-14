import { Router, config } from "../../../deps.ts";
import OAuth2Client from "../connections/YoutubeClient.ts";
import GeneralChannelInformationsRouter from "./generalChannelInformationsRouter.ts";
import StatsRouter from "./myStatsRouter.ts";
// import TrendsRouter from "./trendsRouter.ts";
 import SubsRouter from "./subscriptionRouter.ts";

const router = new Router();

const { FRONTEND_URL } = config();

router
  .get("/", ({response}) => {
    response.body = "Welcome to the YouTool API";
  })
  // Auth Process
  .get("/login", ({response}) => {
    console.log("executed login");
    response.redirect(OAuth2Client.code.getAuthorizationUri().toString());
  })
  .get("/auth/callback", async ({request, response}) => {
    const tokens = await OAuth2Client.code.getToken(request.url);
    response.redirect(`${FRONTEND_URL}/youtube?token=${tokens.accessToken}`);
  });
 router.use("/general", GeneralChannelInformationsRouter.routes(), GeneralChannelInformationsRouter.allowedMethods());
 router.use("/myStats", StatsRouter.routes(), StatsRouter.allowedMethods());
// router.use("/trends", TrendsRouter.routes(), TrendsRouter.allowedMethods());
 router.use("/mySubs", SubsRouter.routes(), SubsRouter.allowedMethods());

export default router;
