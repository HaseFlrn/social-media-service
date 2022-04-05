import { helpers } from "../../../deps.ts";

export default class general{
    //----------------------------------------
    //--------General Channel Infos-----------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getChannelInfos(ctx: any) {
        // 
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        if(!req.token) {
          res.status = 401
          res.body = { err: 'Unauthorized: token missing' }
        }

        try{
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${req.token}`);
            const data = await response.json();
            
            if(data.items[0]){
                const finalResult= { 
                    channelTitle: data.items[0].snippet.title,
                    channelDescription: data.items[0].snippet.description,
                    channelPublishedAt: data.items[0].snippet.publishedAt,
                };
                    
                res.status = 200;
                res.body = finalResult;
            }else{
                res.status = 200;
                res.body = [];
            }
        } catch (err) {
          console.log(err);
          res.status = 502;
          res.body = { err: '502: Bad Gateway'}
        }
      }
    }
