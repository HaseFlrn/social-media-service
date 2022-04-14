import { Router } from "../../../deps.ts";
import myStats from "../../services/youtube/myStats.ts";

const router = new Router();

router
// deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "This is myStatsRouter.ts";
  })
  .get("/channelStats/:token", myStats.getChannelStats)
  .get("/videoIds/:token", myStats.getVideoIds)
  .get("/videoStats/:token/:videoId", myStats.getVideoStats)
  .get("/playlistIds/:token", myStats.getPlaylistIds)
  .get("/playlistInfos/:token/:playlistId", myStats.getPlaylistInfos)
  .get("/channelStatsPerMonth/:token", myStats.getChannelStatsPerMonth)
  .get("/statsPerCountry/:token", myStats.getStatsPerCountry)
  .get("/uploadedVideosPerMonth/:token", myStats.getUploadedVideosPerMonth)
//.get("/PATH", (req,res) => {function})

export default router;