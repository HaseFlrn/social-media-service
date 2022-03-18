import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";

async function getChannelInformations(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
}
 
async function getVideos(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
}

async function getVideoStatistics(token:string, videoId:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&access_token=${token}`);
    const res = await response.json();
    return res; 
}

export async function getPlaylists(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
} 

export async function getPlaylistStatistics(token:string, playlistId:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&id=${playlistId}&access_token=${token}`);
    const res = await response.json();
    return res; 
} 

export async function getStatsInTimeRange(token:string, startDate:string, endDate: string) {
    const response = await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?endDate=${endDate}&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration&startDate=${startDate}&access_token=${token}`);
    const res = await response.json();
    return res; 
}


export default class myStats{
    //----------------------------------------
    //----------Channel Stats-----------------
    //----------------------------------------

    static async getVideoQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const videoQuantity = data.items[0].statistics.videoCount;
        res.send(videoQuantity);
    }
    static async getSubscriberQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const subscriberQuantity = data.items[0].statistics.subscriberCount;
        res.send(subscriberQuantity);
    }
    static async getAllTimeViews(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const allTimeViews = data.items[0].statistics.viewCount;
        res.send(allTimeViews);
    }

    //----------------------------------------
    //----------Video Stats-------------------
    //----------------------------------------

    //Get Latest Video Id
    static async getLatestVideo(req: OpineRequest, res: OpineResponse) {
        const data = await getVideos(req.params.token);
        const latestVideo = data.items[0].contentDetails.upload.videoId;
        res.send(latestVideo);
    }

    static async getAllVideos(req: OpineRequest, res: OpineResponse) {
        const data = await getVideos(req.params.token);

        const videos = [];

        for (let i = 0; i < data.items.length; i++) {
            videos.push(data.items[i].contentDetails.upload.videoId)
            
        }
        res.send(videos);
    }

    //Video Stats
    static async getVideoViewsQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getVideoStatistics(req.params.token, req.params.videoId);
        const videoViews = data.items[0].statistics.viewCount;
        res.send(videoViews);
    }
    static async getVideoLikesQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getVideoStatistics(req.params.token, req.params.videoId);
        const videoLikes = data.items[0].statistics.likeCount;
        res.send(videoLikes);
    }
    static async getVideoDislikesQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getVideoStatistics(req.params.token, req.params.videoId);
        const videoDislikes = data.items[0].statistics.dislikeCount;
        res.send(videoDislikes);
    }
    static async getVideoCommentQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getVideoStatistics(req.params.token, req.params.videoId);
        const videoComments = data.items[0].statistics.commentCount;
        res.send(videoComments);
    }

    //----------------------------------------
    //----------Playlist Stats-------------------
    //----------------------------------------

    //Get List with all playlist ids
    static async getAllPlaylists(req: OpineRequest, res: OpineResponse) {
        const data = await getPlaylists(req.params.token);

        const playlists = [];

        for (let i = 0; i < data.items.length; i++) {
            playlists.push(data.items[i].id)
            
        }
        res.send(playlists);
    }

    //Playlist Stats
    static async getPlaylistName(req: OpineRequest, res: OpineResponse) {
        const data = await getPlaylistStatistics(req.params.token, req.params.playlistId);
        const playlistName = data.items[0].snippet.title;
        res.send(playlistName);
    }
    static async getPlaylistDescription(req: OpineRequest, res: OpineResponse) {
        const data = await getPlaylistStatistics(req.params.token, req.params.playlistId);
        const playlistDescription = data.items[0].snippet.description;
        res.send(playlistDescription);
    }
    static async getPlaylistPublishedAt(req: OpineRequest, res: OpineResponse) {
        const data = await getPlaylistStatistics(req.params.token, req.params.playlistId);
        const playlistPublishedAt = data.items[0].snippet.publishedAt;
        res.send(playlistPublishedAt);
    }
    static async getPlaylistVideoQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await getPlaylistStatistics(req.params.token, req.params.playlistId);
        const playlistVideoQuantity = data.items[0].contentDetails.itemCount;
        res.send(playlistVideoQuantity);
    }

    //----------------------------------------
    //----My Stats In Time Range--------------
    //----------------------------------------

    static async getViewsInTimeRange(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const viewsInTimeRange = data.rows[0][0];
        res.send(viewsInTimeRange);
    }
    static async getCommentsInTimeRange(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const commentsInTimeRange = data.rows[0][1];
        res.send(commentsInTimeRange);
    }
    static async getLikesInTimeRange(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const likesInTimeRange = data.rows[0][2];
        res.send(likesInTimeRange);
    }
    static async getDislikesInTimeRanges(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const dislikesInTimeRange = data.rows[0][3];
        res.send(dislikesInTimeRange);
    }
    static async getEstimatedMinutesWatchedInTimeRange(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const estimatedMinutesWatchedInTimeRange = data.rows[0][4];
        res.send(estimatedMinutesWatchedInTimeRange);
    }
    static async getAverageViewDurationInTimeRange(req: OpineRequest, res: OpineResponse) {
        const data = await getStatsInTimeRange(req.params.token, req.params.startDate, req.params.endDate);
        const averageViewDurationInTimeRange = data.rows[0][5];
        res.send(averageViewDurationInTimeRange);
    }
}