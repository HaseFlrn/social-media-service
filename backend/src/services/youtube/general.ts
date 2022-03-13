export async function getChannelInformations(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
}

export async function getChannelName(token:string) {
    const res = await getChannelInformations(token);
    const channelName = res.items[0].snippet.title;
    return channelName; 
}

export async function getChannelDescription(token:string) {
    const res = await getChannelInformations(token);
    const channelDescription = res.items[0].snippet.description;
    return channelDescription; 
}

export async function getChannelPublishedAt(token:string) {
    const res = await getChannelInformations(token);
    const channelPublishedAt = res.items[0].snippet.publishedAt;
    return channelPublishedAt; 
}