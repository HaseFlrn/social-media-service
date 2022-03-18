import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";

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

    static async getChannelName(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const value = data.items[0].snippet.title;
        res.send(value);
    }
    static async getChannelDescription(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const channelDescription = data.items[0].snippet.description;
        res.send(channelDescription);
    }
    static async getChannelPublishedAt(req: OpineRequest, res: OpineResponse) {
        const data = await getChannelInformations(req.params.token);
        const channelPublishedAt = data.items[0].snippet.publishedAt;
        res.send(channelPublishedAt);
    }
}
