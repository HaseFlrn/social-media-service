export async function getSubsriptionInformations(token:string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?mine=true&token=${token}&part=subscriberSnippet,contentDetails`);
    const res = await response.json();
    return res;
}