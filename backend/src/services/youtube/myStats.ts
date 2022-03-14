// deno-lint-ignore-file
import {getChannelInformations} from './general.ts';
 
//----------------------------------------
//----------Channel Stats-----------------
//----------------------------------------
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

//----------------------------------------
//----------Video Stats-------------------
//----------------------------------------
export async function getVideos(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
}

export async function getVideoStatistics(token:string, videoId:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&access_token=${token}`);
    const res = await response.json();
    return res; 
}

//Get Latest Video Id
export async function getLatestVideo(token:string) {
    const res = await getVideos(token);
    const latestVideo = res.items[0].contentDetails.upload.videoId;
    return latestVideo; 
}

//Get List with all Video ids
export async function getAllVideos(token:string) {
    const res = await getVideos(token);

    var videos = new Array();

    for (let i = 0; i < res.items.length; i++) {
        videos.push(res.items[i].id)
        
    }
    return videos; 
}


//Video Stats
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

//----------------------------------------
//----------Playlist Stats-------------------
//----------------------------------------
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

//Get List with all playlist ids
export async function getAllPlaylists(token:string) {
    const res = await getPlaylists(token);

    let playlists = new Array();

    for (let i = 0; i < res.items.length; i++) {
        playlists.push(res.items[i].id)
    }
    return playlists; 
}

/*
//Video Stats
export async function getVideoViewsQuantity(token:string, videoId:string) {
    const res = await getVideoStatistics(token, videoId);
    const videoViews = res.items[0].statistics.viewCount;
    return videoViews; 
}
*/