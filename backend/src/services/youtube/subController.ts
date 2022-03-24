import { helpers } from "../../../deps.ts"

export default class subController {
  //---------------------------------------------------
  //------------general for Subscribers----------------
  //---------------------------------------------------

  static searchUrl = 'https://www.googleapis.com/youtube/v3/search';
  static channelUrl = 'https://www.googleapis.com/youtube/v3/channels';
  static subscptionUrl = 'https://www.googleapis.com/youtube/v3/subscriptions';
  static videoUrl = 'https://www.googleapis.com/youtube/v3/videos';

  // deno-lint-ignore no-explicit-any
  static async getAllSubscriptions({params, response}: {params: {token: string}, response: any}) {
    //returns all channels, that the current Channels subscribes
    try{
      const url = `${subController.subscptionUrl}?part=snippet&mine=true&access_token=${params.token}`;
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

      response.body = finalResult;
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      response.status = 500;
      response.body = {msg: err.toString()};
    }
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelStats(ctx: any) {
    
    const  response  = ctx.response;
    const  params  = ctx.params;

    try{
      //permission given for: id, statistics, contentDetails(different to subs api), contentOwnerDetails, localizations(no output), snippet(same as subs api), status, topicDetails
      //https://www.googleapis.com/youtube/v3/channels
      if(!helpers.getQuery(ctx, {mergeParams: true}).channelId) {
        response.status = 501; 
        response.body = { err: "channelId missing" };
      } else {
        const { channelId } = helpers.getQuery(ctx);
        const channelResponse = await fetch(`${subController.channelUrl}part=id,statistics,status,topicDetails&id=${channelId}&access_token=${params.token}`);
        const channelData = await channelResponse.json();
        if (channelData.items){
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
  
        response.body = {data: returnData};
      } else {
        response.status = 200;
        response.body = [];
      }
      }
    } catch( err ) {
      console.log("an error occurreddd\n" + err );
      response.status = 500;
      response.body = { msg: err.toString()}
    }
  }
  
  static async getChannelVideos(ctx: any) {
    let count = 20000000; 

    const query = helpers.getQuery(ctx, {mergeParams: true});
    const response = ctx.response;

    if(!query.channelId) {
      response.status = 501;
      response.body = { msg: 'channelId missing'};
    }
    if(!query.token) {
      response.status = 501;
      response.body = { msg: 'token missing'};
    }
    if(query.count) {
      count = parseInt(query.count);
    }
    try{
      const url = `${subController.searchUrl}?part=snippet&channelId=${query.channelId}&access_token=${query.token}`;
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

      response.status = 200;
      response.body = {data: finalResult};
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      response.status = 500;
      response.body = {msg: err.toString};
    }
  }

  
  
  // deno-lint-ignore no-explicit-any no-unused-vars
  static async getChannelTopVideos({request, response} : {request: any, response: any}) {

  }
  // deno-lint-ignore no-explicit-any no-unused-vars
  static async getChannelChartVideos({request, response} : {request: any, response: any}) {

  }

  //---------------------------------------------------
  //--------Subscriped Channel Information-------------
  //---------------------------------------------------



}







