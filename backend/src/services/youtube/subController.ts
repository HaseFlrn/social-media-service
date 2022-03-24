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
  static async getAllSubscriptions(ctx: any) {
    //returns all channels, that the current Channels subscribes
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    if(!req.token) {
      res.status = 401
      res.body = { err: 'Unauthorized: token missing' }
    }
    try{
      const url = `${subController.subscptionUrl}?part=snippet&mine=true&access_token=${req.token}`;

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

      res.status = 200;
      res.body = finalResult;
    } catch (err) {
      console.log(err);
      res.status = 502;
      res.body = { err: '502: Bad Gateway'}
    }
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelStats(ctx: any) {
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    if(!req.channelId) {
      res.status = 400;
      res.body = { err: "Bad Request: channelId missing" };
    }
    if(!req.token) {
      res.status = 401;
      res.body = { err: 'Unauthorized: token missing' };
    }
    try{
        const channelResponse = await fetch(`${subController.channelUrl}?part=id,statistics,status,topicDetails&id=${req.channelId}&access_token=${req.token}`);
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
          res.body = {data: returnData};
        } else {
          res.status = 200;
          res.body = [];
        }
      } catch( err ) {
        console.log("an error occurreddd\n" + err );
        res.status = 502;
        res.body = { err: 'Bad Gateway' };
      }
  }
  
  // deno-lint-ignore no-explicit-any
  static async getChannelVideos(ctx: any) {
    let count = 20000000; 
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    if(!req.channelId) {
      res.status = 400;
      res.body = { err: 'Bad Request: channelId missing'};
    }
    if(!req.token) {
      res.status = 401;
      res.body = { err: 'Unauthorized: token missing'};
    }
    if(req.count) {
      count = parseInt(req.count);
    }
    try{
      const url = `${subController.searchUrl}?part=snippet&channelId=${req.channelId}&access_token=${req.token}`;
      let finalResult: {
        videoCount: number,
        videos: {
          id: {
            kind: string,
            videoId: string
          },
          snippet: Record<string, unknown>,
          publishTime: string
        }[]
      } = { 
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

      if(req.onlyIds) {
        const videoIds: {videoCount: number, videoIds: string[]} = {
          videoCount: finalResult.videoCount,
          videoIds: [] 
        };
        finalResult.videos.forEach(element => {
          videoIds.videoIds.push(element.id.videoId)
        });

        return res.json(videoIds);
      }

      res.json(finalResult);
    } catch (err) {
      console.log("an error occurreddd\n" + err );
      res.status = 502;
      res.body = { err: 'Bad Gateway' };
    }
  }

  

  
  // deno-lint-ignore no-explicit-any no-unused-vars
  static async getChannelTopVideos({request, response} : {request: any, response: any}) {
  
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelChartVideos(ctx: any) {
    const req = helpers.getQuery(ctx, { mergeParams: true})
    const res = ctx.response;

    if(!req.channelId) {
      res.status = 400;
      res.body = { err: 'Bad Request: channelId missing'};
    }
    if(!req.token) {
      res.status = 401;
      res.body = { err: 'Unauthorized: token missing'};
    }
    try{
      const response = await fetch(`${subController.videoUrl}&access_token=${req.token}&onlyIds=true`);
      const data = await response.json();


    } catch (err) {
      console.log("an error occurreddd\n" + err);
      res.status = 502;
      res.body = { err: 'Bad Gateway' };
    }
  }

  //---------------------------------------------------
  //--------Subscriped Channel Information-------------
  //---------------------------------------------------
}







