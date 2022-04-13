import { Router } from "../../../deps.ts";
// import TrendsRouter from "./trendsRouter.ts";
import subMockController from "../../services/youtube/subMockController.ts";

const router = new Router();

router
  .get("/", ({response}) => {
    response.body = "Welcome to the YouTool mock API";
  })
 router.get("/mySubs/videos/top", subMockController.getChannelTopVideos);

export default router;
