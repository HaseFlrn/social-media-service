import {getChannelInformations} from './general.ts';
 
//Channel Stats
export async function getVideoQuantity(token:string) {
    const res = await getChannelInformations(token);
    const videoQuantity = res.items[0].statistics.videoCount;
    return videoQuantity; 
}

export async function getSubscriberQuantity(token:string) {
    const res = await getChannelInformations(token);
    const subscriberQuantity = res.items[0].statistics.subscriberCount;
    return subscriberQuantity; 
}

export async function getAllTimeViews(token:string) {
    const res = await getChannelInformations(token);
    const allTimeViews = res.items[0].statistics.viewCount;
    return allTimeViews; 
}

//Latest Video
export async function getLatestVideo(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${token}`);
    const res = await response.json();
    const latestVideo = res.items[0].contentDetails.upload.videoId;
    return latestVideo; 
}

//Video Stats
export async function getVideoStatistics(token:string, videoId:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&access_token=${token}`);
    const res = await response.json();
    return res; 
}

export async function getVideoViewsQuantity(token:string, videoId:string) {
    const res = await getVideoStatistics(token, videoId);
    const videoViews = res.items[0].statistics.viewCount;
    return videoViews; 
}

export async function getVideoLikesQuantity(token:string, videoId:string) {
    const res = await getVideoStatistics(token, videoId);
    const videoLikes = res.items[0].statistics.likeCount;
    return videoLikes; 
}

export async function getVideoDislikesQuantity(token:string, videoId:string) {
    const res = await getVideoStatistics(token, videoId);
    const videoDislikes = res.items[0].statistics.dislikeCount;
    return videoDislikes; 
}

export async function getVideoCommentQuantity(token:string, videoId:string) {
    const res = await getVideoStatistics(token, videoId);
    const videoComments = res.items[0].statistics.commentCount;
    return videoComments; 
}