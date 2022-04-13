import { Router } from "../../../deps.ts";
// import TrendsRouter from "./trendsRouter.ts";
 import SubsRouter from "./subscriptionRouter.ts";

const router = new Router();

router
  .get("/", ({response}) => {
    response.body = "Welcome to the YouTool mock API";
  })
 router.use("/mySubs", SubsRouter.routes(), SubsRouter.allowedMethods());

export default router;
