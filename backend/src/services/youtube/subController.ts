import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";


export default class subController {
  //---------------------------------------------------
  //------------general for Subscribers----------------
  //---------------------------------------------------

  static async getAllSubscriptions(req: OpineRequest, res: OpineResponse) {
    //returns all channels, that the current Channels subscribes
    try{
      const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&access_token=${req.params.token}`;
      let finalResult = { 
        channelCount: 0,
        channels: [] 
      };
      let pageToken = '';
      do {
        const response = await fetch((pageToken == '') ? url : (url + '&page_token=' + pageToken));
        const data = await response.json();

        finalResult = {
          channelCount: finalResult.channelCount + data.items.length,
          channels: finalResult.channels.concat(data.items),
        }
        
        pageToken = data.nextPageToken;
      } while(pageToken) 

      res.json(finalResult);
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      res.setStatus(500).json(err);
    }
  }

  static async getChannelStats(req: OpineRequest, res: OpineResponse) {
    try{
      //permission given for: id, statistics, contentDetails(different to subs api), contentOwnerDetails, localizations(no output), snippet(same as subs api), status, topicDetails
      //https://www.googleapis.com/youtube/v3/channels
      if(!req.query.channelId) {
        return res.setStatus(501).json({ err: "channelId missing" });
      }
      const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,statistics,status,topicDetails&id=${req.query.channelId}&access_token=${req.params.token}`);
      const channelData = await channelResponse.json();

      const topics = channelData.items[0].topicDetails;
      const topicNames: string[] = [];

      topics.topicCategories.forEach((e: string) => {
        const parts: string[] = e.split('/');
        topicNames.push(parts[parts.length-1]);
      });

      const returnData = {
        channelId: channelData.items[0].id,
        videoCnt: channelData.items[0].statistics.videoCount,
        viewCnt: channelData.items[0].statistics.viewCount,
        subscriberCnt: channelData.items[0].statistics.subscriberCount,
        forKids: channelData.items[0].status.madeForKids,
        topics: topicNames
      };

      res.send(returnData);
    } catch( err ) {
      console.log("an error occurreddd\n" + err );
      res.setStatus(500).json(err);
    }
  }
  
  //---------------------------------------------------
  //--------Subscriped Channel Information-------------
  //---------------------------------------------------



}







