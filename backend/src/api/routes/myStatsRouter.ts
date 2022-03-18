import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import myStats from "../../services/youtube/myStats.ts";

const router = Router();

router
  .get("/", (_req, res) => {
    res.send("This is myStatsRouter.ts");
  })
  //Get Channel Quantities
  .get("/videoQuantity/:token", myStats.getVideoQuantity)
  .get("/subscriberQuantity/:token", myStats.getSubscriberQuantity)
  .get("/allTimeViews/:token", myStats.getAllTimeViews)
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
  // Channel Stats in Time Range
  .get("/viewsInTimeRange/:token/:startDate/:endDate", myStats.getViewsInTimeRange)
  .get("/commentsInTimeRange/:token/:startDate/:endDate", myStats.getCommentsInTimeRange)
  .get("/dislikesInTimeRanges/:token/:startDate/:endDate", myStats.getDislikesInTimeRanges)
  .get("/likesInTimeRange/:token/:startDate/:endDate", myStats.getLikesInTimeRange)
  .get("/estimatedMinutesWatchedInTimeRange/:token/:startDate/:endDate", myStats.getEstimatedMinutesWatchedInTimeRange)
  .get("/averageViewDurationInTimeRange/:token/:startDate/:endDate", myStats.getAverageViewDurationInTimeRange)
//.get("/PATH", (req,res) => {function})

export default router;