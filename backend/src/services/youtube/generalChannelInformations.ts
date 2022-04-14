import { helpers } from "../../../deps.ts";
import { IError } from "../../api/interfaces/errors.ts";

export default class generalChannelInformations {
  //----------------------------------------
  //--------General Channel Infos-----------
  //----------------------------------------

  // deno-lint-ignore no-explicit-any
  static async getChannelInfos(ctx: any): Promise<IError | IGeneralStats> {
    // 
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.token) {
      res.status = 401;
      error = { err: 'Unauthorized: token missing' };
      return res.body = error;
    }

    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${req.token}`);
      const data = await response.json();
      let finalResult: IGeneralStats = {} as IGeneralStats;

      if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
        finalResult = {
          channelTitle: data.items[0].snippet.title,
          channelDescription: data.items[0].snippet.description,
          channelPublishedAt: data.items[0].snippet.publishedAt,
        };

        res.status = 200;
        return res.body = finalResult;
      } else {
        res.status = 200;
        return res.body = finalResult;
      }
    } catch (err) {
      console.log("1.1 an error occurreddd\n" + err);
      res.status = 502;
      error = { err: 'Bad Gateway' };
      return res.body = error;
    }
  }
}

export interface IGeneralStats {
  channelTitle: string,
  channelDescription: string,
  channelPublishedAt: string,
}
