import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { getVideoQuantity, getSubscriberQuantity, getAllTimeViews } from "../../services/youtube/myStats.ts";
import { getLatestVideo, getAllVideos } from "../../services/youtube/myStats.ts";
import { getVideoViewsQuantity, getVideoLikesQuantity, getVideoDislikesQuantity, getVideoCommentQuantity } from "../../services/youtube/myStats.ts";
import { getAllPlaylists, getPlaylistName, getPlaylistDescription, getPlaylistPublishedAt, getPlaylistVideoQuantity } from "../../services/youtube/myStats.ts";
import { getViewsInTimeRange, getCommentsInTimeRange, getLikesInTimeRange, getDislikesInTimeRange, getEstimatedMinutesWatchedInTimeRange, getAverageViewDurationInTimeRange } from "../../services/youtube/myStats.ts";


const router = Router();

router
  .get("/", (_req, res) => {
    res.send("This is myStatsRouter.ts");
  })
  //Get Channel Quantities
  .get("/videoQuantity/:token", (req,res) => {
    res.send(getVideoQuantity(req.params.token));
  })
  .get("/subscriberQuantity/:token", (req,res) => {
    res.send(getSubscriberQuantity(req.params.token));
  })
  .get("/allTimeViews/:token", (req,res) => {
    res.send(getAllTimeViews(req.params.token));
  })
  //Get Video ID's
  .get("/latestVideo/:token", (req,res) => {
    res.send(getLatestVideo(req.params.token));
  })
  .get("/allVideos/:token", (req,res) => {
    res.send(getAllVideos(req.params.token));
  })
  //Get Video Stats
  .get("/videoViewsQuantity/:token/:videoId", (req,res) => {
    res.send(getVideoViewsQuantity(req.params.token, req.params.videoId));
  })
  .get("/videoLikesQuantity/:token/:videoId", (req,res) => {
    res.send(getVideoLikesQuantity(req.params.token, req.params.videoId));
  })
  .get("/videoDislikesQuantity/:token/:videoId", (req,res) => {
    res.send(getVideoDislikesQuantity(req.params.token, req.params.videoId));
  })
  .get("/videoCommentQuantity/:token/:videoId", (req,res) => {
    res.send(getVideoCommentQuantity (req.params.token, req.params.videoId));
  })
  //Get Playlist ID's
  .get("/allPlaylists/:token", (req,res) => {
    res.send(getAllPlaylists(req.params.token));
  })
  //Get Playlist Stats
  .get("/playlistName/:token/:playlistId", (req,res) => {
    res.send(getPlaylistName(req.params.token, req.params.playlistId));
  })
  .get("/playlistDescription/:token/:playlistId", (req,res) => {
    res.send(getPlaylistDescription(req.params.token, req.params.playlistId));
  })
  .get("/playlistPublishedAt/:token/:playlistId", (req,res) => {
    res.send(getPlaylistPublishedAt(req.params.token, req.params.playlistId));
  })
  .get("/playlistVideoQuantity/:token/:playlistId", (req,res) => {
    res.send(getPlaylistVideoQuantity (req.params.token, req.params.playlistId));
  })
  // Channel Stats in Time Range
  .get("/viewsInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getViewsInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
  .get("/commentsInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getCommentsInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
  .get("/likesInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getLikesInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
  .get("/dislikesInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getDislikesInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
  .get("/estimatedMinutesWatchedInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getEstimatedMinutesWatchedInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
  .get("/averageViewDurationInTimeRange/:token/:startDate/endDate", (req,res) => {
    res.send(getAverageViewDurationInTimeRange(req.params.token, req.params.startDate, req.params.endDate));
  })
//.get("/PATH", (req,res) => {function})

export default router;