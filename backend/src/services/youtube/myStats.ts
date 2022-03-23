import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";
import startAndenddateForEveryMonth from './startAndenddateForEveryMonth.json' assert { type: "json" };

async function runRequest(req: OpineRequest, requestName:string) {

    let url = ``;

    switch (requestName) {
        case "ChannelInformations":
            url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${req.params.token}`
            break;
        case "Videos":
            url = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${req.params.token}`
            break;
        case "VideoStatistics":
            url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${req.params.videoId}&access_token=${req.params.token}`
            break;
        case "Playlists":
            url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=${req.params.token}`
            break;
        case "PlaylistStatistics":
            url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&id=${req.params.playlistId}&access_token=${req.params.token}`
            break;
        default:
            break;
    }
    const response = await fetch(url);
    const result = await response.json();
    return result; 
}


export async function getStatsInTimeRange(token:string, startDate:string, endDate: string) {
    const response = await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?endDate=${endDate}&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration&startDate=${startDate}&access_token=${token}`);
    const res = await response.json();
    return res; 
}

//----------------------------------------
//----My Stats In Time Range--------------
//----------------------------------------
async function getValueInTimeRange(req: OpineRequest, arrayIndex:number, startDate:string, endDate:string) {
    const data = await getStatsInTimeRange(req.params.token, startDate, endDate);
    let value
    try {
        value = data.rows[0][arrayIndex];
    } catch (error) {
        console.log(error)
    }
    
    return value;
}

async function getStetsPerMonthForCurrentYear(req: OpineRequest, res: OpineResponse, arrayindex:number) {

    const currentYear = (new Date()).getFullYear()
    //starts with 0
    const currentMonth = (new Date()).getMonth()
    const currentDay = (new Date()).getDate()

    const valuePerMonth = [];

    for (let i = 0; i < currentMonth; i++) {
        const tempStartDate = currentYear + "-" + startAndenddateForEveryMonth[i].startdate
        const tempEndDate = currentYear + "-" + startAndenddateForEveryMonth[i].enddate
        valuePerMonth.push(await getValueInTimeRange(req, arrayindex, tempStartDate, tempEndDate))
      }
    const startDateCurrentMonth = currentYear + "-" + startAndenddateForEveryMonth[currentMonth].startdate
    const endDateCurrentMonth = currentYear + "-" + (('0' + (currentMonth + 1)).slice(-2)) + "-" + currentDay
    valuePerMonth.push(await getValueInTimeRange(req, arrayindex, startDateCurrentMonth, endDateCurrentMonth))

    res.send(valuePerMonth)
}

 async function getStetsPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse, arrayindex:number) {

    const valuePerDay = [];

    for (let i = 30; i > 0; i--){
        const currentDate = new Date()

        currentDate.setDate(currentDate.getDate()-i);
        const tempStartAndEnddate = currentDate.getFullYear() + "-" + ('0' + (currentDate.getMonth() + 1)).slice(-2) + "-" + ('0' + currentDate.getDate()).slice(-2);

        console.log(tempStartAndEnddate)

        valuePerDay.push([tempStartAndEnddate, await getValueInTimeRange(req, arrayindex, tempStartAndEnddate, tempStartAndEnddate)])
        
    }

    res.send(valuePerDay)
}

export default class myStats{
    //----------------------------------------
    //----------Channel Stats-----------------
    //----------------------------------------

    static async getVideoQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "ChannelInformations");
        const videoQuantity = data.items[0].statistics.videoCount;
        res.send(videoQuantity);
    }
    static async getSubscriberQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "ChannelInformations");
        const subscriberQuantity = data.items[0].statistics.subscriberCount;
        res.send(subscriberQuantity);
    }
    static async getAllTimeViews(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "ChannelInformations");
        const allTimeViews = data.items[0].statistics.viewCount;
        res.send(allTimeViews);
    }

    //----------------------------------------
    //----------Video Stats-------------------
    //----------------------------------------

    //Get Latest Video Id
    static async getLatestVideo(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "Videos");
        const latestVideo = data.items[0].contentDetails.upload.videoId;
        res.send(latestVideo);
    }

    static async getAllVideos(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "Videos");

        const videos = [];

        for (let i = 0; i < data.items.length; i++) {
            videos.push(data.items[i].contentDetails.upload.videoId)
            
        }
        res.send(videos);
    }

    //Video Stats
    static async getVideoViewsQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "VideoStatistics");
        const videoViews = data.items[0].statistics.viewCount;
        res.send(videoViews);
    }
    static async getVideoLikesQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "VideoStatistics");
        const videoLikes = data.items[0].statistics.likeCount;
        res.send(videoLikes);
    }
    static async getVideoDislikesQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "VideoStatistics");
        const videoDislikes = data.items[0].statistics.dislikeCount;
        res.send(videoDislikes);
    }
    static async getVideoCommentQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "VideoStatistics");
        const videoComments = data.items[0].statistics.commentCount;
        res.send(videoComments);
    }

    //----------------------------------------
    //----------Playlist Stats-------------------
    //----------------------------------------

    //Get List with all playlist ids
    static async getAllPlaylists(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "Playlists");

        const playlists = [];

        for (let i = 0; i < data.items.length; i++) {
            playlists.push(data.items[i].id)
            
        }
        res.send(playlists);
    }

    //Playlist Stats
    static async getPlaylistName(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "PlaylistStatistics");
        const playlistName = data.items[0].snippet.title;
        res.send(playlistName);
    }
    static async getPlaylistDescription(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "PlaylistStatistics");
        const playlistDescription = data.items[0].snippet.description;
        res.send(playlistDescription);
    }
    static async getPlaylistPublishedAt(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "PlaylistStatistics");
        const playlistPublishedAt = data.items[0].snippet.publishedAt;
        res.send(playlistPublishedAt);
    }
    static async getPlaylistVideoQuantity(req: OpineRequest, res: OpineResponse) {
        const data = await runRequest(req, "PlaylistStatistics");
        const playlistVideoQuantity = data.items[0].contentDetails.itemCount;
        res.send(playlistVideoQuantity);
    }


    //----------------------------------------
    //-------My Stats Per Month---------------
    //----------------------------------------

    static getViewsInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 0)
    }
    static getCommentsInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 1)
    }
    static getLikesInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 2)
    }
    static getDislikesInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 3)
    }
    static getEstimatedMinutesWatchedInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 4)
    }
    static getAverageViewDurationInMonthForCurrentYear(req: OpineRequest, res: OpineResponse){
        getStetsPerMonthForCurrentYear(req, res, 5)
    }

    //----------------------------------------
    //-------My Stats Per Month---------------
    //----------------------------------------

    static getViewsPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 0)
    }
    static getCommentsPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 1)
    }
    static getLikesPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 2)
    }
    static getDislikesPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 3)
    }
    static getEstimatedMinutesWatchedPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 4)
    }
    static getAverageViewDurationPerDayLastThirtyDays(req: OpineRequest, res: OpineResponse){
        getStetsPerDayLastThirtyDays(req, res, 5)
    }

}

