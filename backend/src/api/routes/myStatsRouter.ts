import { Router } from "../../../deps.ts";
import myStats from "../../services/youtube/myStats.ts";

const router = new Router();

router
// deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "This is myStatsRouter.ts";
  })
  // Channel Quantities
  .get("/channelStats/:token", myStats.getChannelStats)
  // Video ID's
  .get("/videoIds/:token", myStats.getVideoIds)
  // Video Stats
  .get("/videoStats/:token/:videoId", myStats.getVideoStats)
  // Playlist ID's
  .get("/playlistIds/:token", myStats.getPlaylistIds)
  // Playlist Infos
  .get("/playlistInfos/:token/:playlistId", myStats.getPlaylistInfos)
  // Channel Stats per Month in current Year
  .get("/channelStatsPerMonth/:token", myStats.getChannelStatsPerMonth)
  // Channel Stats per Day last 30 days
  .get("/viewsPerDayLastThirtyDays/:token", myStats.getViewsPerDayLastThirtyDays)
  .get("/commentsPerDayLastThirtyDays/:token", myStats.getCommentsPerDayLastThirtyDays)
  .get("/likesPerDayLastThirtyDays/:token", myStats.getLikesPerDayLastThirtyDays)
  .get("/dislikesPerDayLastThirtyDays/:token", myStats.getDislikesPerDayLastThirtyDays)
  .get("/estimatedMinutesWatchedPerDayLastThirtyDays/:token", myStats.getEstimatedMinutesWatchedPerDayLastThirtyDays)
  .get("/averageViewDurationPerDayLastThirtyDays/:token", myStats.getAverageViewDurationPerDayLastThirtyDays)
  // Channel Stats per Country
  .get("/statsPerCountry/:token", myStats.getStatsPerCountry)
  // Uploaded Videos Per Month
  .get("/uploadedVideosPerMonth/:token", myStats.getUploadedVideosPerMonth)
//.get("/PATH", (req,res) => {function})

export default router;