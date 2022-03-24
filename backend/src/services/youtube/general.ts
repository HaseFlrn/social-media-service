

async function getChannelInformations(token:string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${token}`);
    const res = await response.json();
    return res; 
}

/*
async function getValue(req: OpineRequest, res: OpineResponse){
    try {  
        const data = await getChannelInformations(req.params.token);
        const value = data.items[0].snippet.title;
        res.json(value);
    } catch (err) {
        console.log("an error occurreddd\n" + err );
        err.setStatus(500).json(err); 
    } 
}
*/

 export default class general{

    // deno-lint-ignore no-explicit-any
    static async getChannelName({params, response}: { params: { token: string }, response: any}) {
        const data = await getChannelInformations(params.token);
        const value = data.items[0].snippet.title;
        response.body = {channelName: value};
    }
    // deno-lint-ignore no-explicit-any
    static async getChannelDescription({params, response}: { params: { token: string }, response: any}) {
        const data = await getChannelInformations(params.token);
        const channelDescription = data.items[0].snippet.description;
        response.body = {channelDescription: channelDescription};
    }
    // deno-lint-ignore no-explicit-any
    static async getChannelPublishedAt({params, response}: { params: { token: string }, response: any}) {
        const data = await getChannelInformations(params.token);
        const channelPublishedAt = data.items[0].snippet.publishedAt;
        response.body = {channelPublishedAt: channelPublishedAt};
    }
}
