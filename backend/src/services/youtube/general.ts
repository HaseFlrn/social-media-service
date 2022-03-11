export async function getChannelName(token:String) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${token}`);
    const res = await response.json();
    const channelName = res.items[0].snippet.title;
    return channelName; 
}
