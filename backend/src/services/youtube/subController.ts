import { OpineResponse, OpineRequest } from "https://deno.land/x/opine@2.1.1/mod.ts";


export default class subController {
  //---------------------------------------------------
  //------------general for Subscribers----------------
  //---------------------------------------------------
  static searchUrl = 'https://www.googleapis.com/youtube/v3/search';
  static channelUrl = 'https://www.googleapis.com/youtube/v3/channels';
  static subscptionUrl = 'https://www.googleapis.com/youtube/v3/subscriptions';
  static videoUrl = 'https://www.googleapis.com/youtube/v3/videos';

  static async getAllSubscriptions(req: OpineRequest, res: OpineResponse) {
    if(!req.query.token) {
      res.setStatus(501).json({ err: 'token missing'})
    }
    //returns all channels, that the current Channels subscribes
    try{
      const url = `${subController.subscptionUrl}?part=snippet&mine=true&access_token=${req.query.token}`;
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
    if(!req.query.channelId) {
      return res.setStatus(501).json({ err: "channelId missing" });
    }
    if(!req.query.token) {
      res.setStatus(501).json({ err: 'token missing'})
    }
    try{
      //permission given for: id, statistics, contentDetails(different to subs api), contentOwnerDetails, localizations(no output), snippet(same as subs api), status, topicDetails
      //https://www.googleapis.com/youtube/v3/channels
      const channelResponse = await fetch(`${subController.channelUrl}?part=id,statistics,status,topicDetails&id=${req.query.channelId}&access_token=${req.query.token}`);
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
  
  static async getChannelVideos(req: OpineRequest, res: OpineResponse) {
    let count = 20000000; 
    if(!req.query.channelId) {
      res.setStatus(501).json({ err: 'channelId missing'})
    }
    if(!req.query.token) {
      res.setStatus(501).json({ err: 'token missing'})
    }
    if(req.query.count) {
      count = req.query.count;
    }
    try{
      const url = `${subController.searchUrl}?part=snippet&channelId=${req.query.channelId}&access_token=${req.query.token}`;
      let finalResult = { 
        videoCount: 0,
        videos: [] 
      };
      let pageToken = '';
      do {
        const nextCnt = count > 50 ? 50 : count;
        const response = await fetch((pageToken == '') ? url + `&maxResults=${nextCnt}` : (url + `&maxResults=${nextCnt}` +'&page_token=' + pageToken));
        const data = await response.json();
        
        count = count - data.items.length;

        finalResult = {
          videoCount: finalResult.videoCount + data.items.length,
          videos: finalResult.videos.concat(data.items),
        }
        
        pageToken = data.nextPageToken;
      } while(pageToken && count > 0) 

      res.json(finalResult);
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      res.setStatus(500).json(err);
    }
  }

  static async getChannelTopVideos(_req: OpineRequest, _res: OpineResponse) {

  }

  static async getChannelChartVideos(_req: OpineRequest, _res: OpineResponse) {

  }
}







