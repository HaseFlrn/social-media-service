import startAndenddateForEveryMonth from './startAndenddateForEveryMonth.json' assert { type: "json" };

async function runRequest(params: { token: string, videoId?: string, playlistId?: string }, requestName: string) {

    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2);

    let url = ``;
   switch (requestName) {
        case "ChannelInformations":
            url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${params.token}`
            break;
        case "Videos":
            url = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${params.token}`
            break;
        case "VideoStatistics":
            url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoId}&access_token=${params.token}`
            break;
        case "Playlists":
            url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=${params.token}`
            break;
        case "PlaylistStatistics":
            url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&id=${params.playlistId}&access_token=${params.token}`
            break;
        case "Country":
            url = `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=country&endDate=${currentDate}&ids=channel%3D%3DMINE&metrics=views%2CestimatedMinutesWatched%2CaverageViewDuration%2CaverageViewPercentage%2CsubscribersGained&sort=-estimatedMinutesWatched&startDate=2014-05-01&access_token=${params.token}`
            break;
        default:
            break;
    }
    const response = await fetch(url);
    const result = await response.json();
    return result; 
}

// deno-lint-ignore no-explicit-any
export async function getStatsInTimeRange({params, response}: {params: {token: string}, response: any}, startDate:string, endDate: string) {
    try {
        const response = await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?endDate=${endDate}&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration&startDate=${startDate}&access_token=${params.token}`);
        const res = await response.json();
    return res; 
    } catch (error) {
        console.log(error);
    }

}

//----------------------------------------
//----My Stats In Time Range--------------
//----------------------------------------
// deno-lint-ignore no-explicit-any
async function getValueInTimeRange({params, response}: {params: {token: string}, response: any}, arrayIndex:number, startDate:string, endDate:string) {
    const data = await getStatsInTimeRange({params, response}, startDate, endDate);
    let value
    try {
        value = data.rows[0][arrayIndex];
        return value;
    } catch (error) {
        console.log(error);
    }   
}
// deno-lint-ignore no-explicit-any
async function getStetsPerMonthForCurrentYear({params, response}: {params: {token: string}, response: any}, arrayindex:number) {

    try {
        const currentYear = (new Date()).getFullYear()
        //starts with 0
        const currentMonth = (new Date()).getMonth()
        const currentDay = (new Date()).getDate()
    
        const valuePerMonth = [];
    
        for (let i = 0; i < currentMonth; i++) {
            const tempStartDate = currentYear + "-" + startAndenddateForEveryMonth[i].startdate
            const tempEndDate = currentYear + "-" + startAndenddateForEveryMonth[i].enddate
            valuePerMonth.push(await getValueInTimeRange({params, response}, arrayindex, tempStartDate, tempEndDate))
          }
        const startDateCurrentMonth = currentYear + "-" + startAndenddateForEveryMonth[currentMonth].startdate
        const endDateCurrentMonth = currentYear + "-" + (('0' + (currentMonth + 1)).slice(-2)) + "-" + currentDay
        valuePerMonth.push(await getValueInTimeRange({params, response}, arrayindex, startDateCurrentMonth, endDateCurrentMonth))
        const res = JSON.stringify(valuePerMonth);

        response.status = 200;
        response.body = {data: res};
    } catch (error) {
        console.log(error);
    }

}
// deno-lint-ignore no-explicit-any
 async function getStetsPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}, arrayindex:number) {

    const valuePerDay = [];

    for (let i = 30; i > 0; i--){
        const currentDate = new Date()

        currentDate.setDate(currentDate.getDate()-i);
        const tempStartAndEnddate = currentDate.getFullYear() + "-" + ('0' + (currentDate.getMonth() + 1)).slice(-2) + "-" + ('0' + currentDate.getDate()).slice(-2);

        console.log(tempStartAndEnddate)

        valuePerDay.push([tempStartAndEnddate, await getValueInTimeRange({params, response}, arrayindex, tempStartAndEnddate, tempStartAndEnddate)])
        
    }

    response.body = {data: valuePerDay}
}


export default class myStats{
    //----------------------------------------
    //----------Channel Stats-----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getVideoQuantity({params, response}: {params: {token: string}, response: any}) {
        const data = await runRequest(params, "ChannelInformations");
        const videoQuantity = data.items[0].statistics.videoCount;
        response.body = {data: videoQuantity};
    }
    // deno-lint-ignore no-explicit-any
    static async getSubscriberQuantity({request, response}: {request: any, response: any}) {
        const data = await runRequest(request, "ChannelInformations");
        const subscriberQuantity = data.items[0].statistics.subscriberCount;
        response.body = {data: subscriberQuantity};
    }
    // deno-lint-ignore no-explicit-any
    static async getAllTimeViews({request, response}: {request: any, response: any}) {
        const data = await runRequest(request, "ChannelInformations");
        const allTimeViews = data.items[0].statistics.viewCount;
        response.body = {data: allTimeViews};
    }

    //----------------------------------------
    //----------Video Stats-------------------
    //----------------------------------------

    //Get Latest Video Id
    // deno-lint-ignore no-explicit-any
    static async getLatestVideo({params, response}: {params: {token: string}, response: any}) {
        const data = await runRequest(params, "Videos");
        const latestVideo = data.items[0].contentDetails.upload.videoId;
        response.body = {data: latestVideo};
    }

    // deno-lint-ignore no-explicit-any
    static async getAllVideos({params, response}: {params: {token: string}, response: any}) {
        const data = await runRequest(params, "Videos");

        const videos = [];
        
           
            for (let i = 0; i < data.items.length; i++) {
                videos.push(data.items[i].contentDetails.upload.videoId)
                
            }
        
        response.body = {data: videos};
    }

    //Video Stats
    // deno-lint-ignore no-explicit-any
    static async getVideoViewsQuantity({params, response}: {params: {token: string, videoId: string}, response: any}) {
        const data = await runRequest(params, "VideoStatistics");
        const videoViews = data.items[0].statistics.viewCount;
        response.body = {data: videoViews};
    }
    // deno-lint-ignore no-explicit-any
    static async getVideoLikesQuantity({params, response}: {params: {token: string, videoId: string}, response: any}) {
        const data = await runRequest(params, "VideoStatistics");
        const videoLikes = data.items[0].statistics.likeCount;
        response.body = {data: videoLikes};
    }
    // deno-lint-ignore no-explicit-any
    static async getVideoDislikesQuantity({params, response}: {params: {token: string, videoId: string}, response: any}) {
        const data = await runRequest(params, "VideoStatistics");
        const videoDislikes = data.items[0].statistics.dislikeCount;
        response.body = {data: videoDislikes};
    }
    // deno-lint-ignore no-explicit-any
    static async getVideoCommentQuantity({params, response}: {params: {token: string, videoId: string}, response: any}) {
        const data = await runRequest(params, "VideoStatistics");
        const videoComments = data.items[0].statistics.commentCount;
        response.body = {data: videoComments};
    }

    //----------------------------------------
    //----------Playlist Stats-------------------
    //----------------------------------------

    //Get List with all playlist ids
    // deno-lint-ignore no-explicit-any
    static async getAllPlaylists({params, response}: {params: {token: string}, response: any}) {
        const data = await runRequest(params, "Playlists");

        const playlists = [];

        for (let i = 0; i < data.items.length; i++) {
            playlists.push(data.items[i].id)
            
        }
        response.body = {data: playlists};
    }

    //Playlist Stats
    // deno-lint-ignore no-explicit-any
    static async getPlaylistName({params, response}: {params: {token: string, playlistId: string}, response: any}) {
        const data = await runRequest(params, "PlaylistStatistics");
        const playlistName = data.items[0].snippet.title;
        response.body = {data: playlistName};
    }
    // deno-lint-ignore no-explicit-any
    static async getPlaylistDescription({params, response}: {params: {token: string, playlistId: string}, response: any}) {
        const data = await runRequest(params, "PlaylistStatistics");
        const playlistDescription = data.items[0].snippet.description;
        response.body = {data: playlistDescription};
    }
    // deno-lint-ignore no-explicit-any
    static async getPlaylistPublishedAt({params, response}: {params: {token: string, playlistId: string}, response: any}) {
        const data = await runRequest(params, "PlaylistStatistics");
        const playlistPublishedAt = data.items[0].snippet.publishedAt;
        response.body = {data: playlistPublishedAt};
    }
    // deno-lint-ignore no-explicit-any
    static async getPlaylistVideoQuantity({params, response}: {params: {token: string, playlistId: string}, response: any}) {
        const data = await runRequest(params, "PlaylistStatistics");
        const playlistVideoQuantity = data.items[0].contentDetails.itemCount;
        response.body = {data: playlistVideoQuantity};
    }


    //----------------------------------------
    //-------My Stats Per Month---------------
    //----------------------------------------
// deno-lint-ignore no-explicit-any 
    static getViewsInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 0)
    }
    // deno-lint-ignore no-explicit-any
    static getCommentsInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 1)
    }
    // deno-lint-ignore no-explicit-any
    static getLikesInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 2)
    }
    // deno-lint-ignore no-explicit-any
    static getDislikesInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 3)
    }
    // deno-lint-ignore no-explicit-any
    static getEstimatedMinutesWatchedInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 4)
    }
    // deno-lint-ignore no-explicit-any
    static getAverageViewDurationInMonthForCurrentYear({params, response}: {params: {token: string}, response: any}){
        getStetsPerMonthForCurrentYear({params, response}, 5)
    }

    //----------------------------------------
    //-------My Stats Per Month---------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static getViewsPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 0)
    }
    // deno-lint-ignore no-explicit-any
    static getCommentsPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 1)
    }
    // deno-lint-ignore no-explicit-any
    static getLikesPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 2)
    }
    // deno-lint-ignore no-explicit-any
    static getDislikesPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 3)
    }
    // deno-lint-ignore no-explicit-any
    static getEstimatedMinutesWatchedPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 4)
    }
    // deno-lint-ignore no-explicit-any
    static getAverageViewDurationPerDayLastThirtyDays({params, response}: {params: {token: string}, response: any}){
        getStetsPerDayLastThirtyDays({params, response}, 5)
    }


    //----------------------------------------
    //--------Stats per country---------------
    //----------------------------------------
    static async getUploadedVideosPerMonth({params, response}: {params: {token: string}, response: any}){
        const currentYear = (new Date()).getFullYear()
        const valuePerMonth: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    
        //get all videos
        const data = await runRequest(params, "Videos");
        for (let i = 0; i < data.items.length; i++) {
            //get publishedAt from Video
            const publishedAt = data.items[i].snippet.publishedAt
    
            //check in with month the video has been published and ++ array
            for (let j = 1; j < 13; j++) {
                const startsWith = currentYear + "-" + ('0' + (j)).slice(-2)

                if (publishedAt.startsWith(startsWith)){
                    valuePerMonth[j - 1] = valuePerMonth[j - 1] + 1;
                }
            }        
        }
        response.body = {data: valuePerMonth};
    }
    // deno-lint-ignore no-explicit-any
    static async getStatsPercountry({params, response}: {params: {token: string}, response: any}){
        const data = await runRequest(params, "Country");
        const countryStats = data.rows;
        response.body = {data: countryStats};
    }

}

