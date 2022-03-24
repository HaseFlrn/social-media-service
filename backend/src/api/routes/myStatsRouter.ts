import { Router } from "../../../deps.ts";
import myStats from "../../services/youtube/myStats.ts";

const router = new Router();

router
// deno-lint-ignore no-explicit-any
  .get("/", ({response}: {response: any}) => {
    response.body = "This is myStatsRouter.ts";
  })
  //Get Channel Quantities
  .get("/channelStats/:token", myStats.getChannelStats)
  //Get Video ID's
  .get("/latestVideo/:token", myStats.getLatestVideo)
  .get("/allVideos/:token", myStats.getAllVideos)
  // Get Video Stats
  .get("/videoViewsQuantity/:token/:videoId", myStats.getVideoViewsQuantity)
  .get("/videoLikesQuantity/:token/:videoId", myStats.getVideoLikesQuantity)
  .get("/videoDislikesQuantity/:token/:videoId", myStats.getVideoDislikesQuantity)
  .get("/videoCommentQuantity/:token/:videoId", myStats.getVideoCommentQuantity)
  //Get Playlist ID's
  .get("/allPlaylists/:token", myStats.getAllPlaylists)
  //Get Playlist Stats
  .get("/playlistName/:token/:playlistId", myStats.getPlaylistName)
  .get("/playlistDescription/:token/:playlistId", myStats.getPlaylistDescription)
  .get("/playlistPublishedAt/:token/:playlistId", myStats.getPlaylistPublishedAt)
  .get("/playlistVideoQuantity/:token/:playlistId", myStats.getPlaylistVideoQuantity)
  // Channel Stats per Month in current Year
  .get("/viewsInMonthForCurrentYear/:token", myStats.getViewsInMonthForCurrentYear)
  .get("/commentsInMonthForCurrentYear/:token", myStats.getCommentsInMonthForCurrentYear)
  .get("/likesInMonthForCurrentYear/:token", myStats.getLikesInMonthForCurrentYear)
  .get("/dislikesInMonthForCurrentYear/:token", myStats.getDislikesInMonthForCurrentYear)
  .get("/estimatedMinutesWatchedInMonthForCurrentYear/:token", myStats.getEstimatedMinutesWatchedInMonthForCurrentYear)
  .get("/averageViewDurationInMonthForCurrentYear/:token", myStats.getAverageViewDurationInMonthForCurrentYear)
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