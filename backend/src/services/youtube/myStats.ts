import {getChannelInformations} from './general.ts';
 
export async function getVideoQuantity(token:String) {
    const res = await getChannelInformations(token);
    const VideoQuantity = res.items[0].statistics.videoCount;
    return VideoQuantity; 
}

export async function getSubscriberQuantity(token:String) {
    const res = await getChannelInformations(token);
    const SubscriberQuantity = res.items[0].statistics.subscriberCount;
    return SubscriberQuantity; 
}

export async function getAllTimeViews(token:String) {
    const res = await getChannelInformations(token);
    const AllTimeViews = res.items[0].statistics.viewCount;
    return AllTimeViews; 
}