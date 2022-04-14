import { helpers } from "../../../deps.ts";
import {
  IChannelAdvStats,
  IChannels,
  IChannelStats,
} from "../../api/interfaces/channel.ts";
import {
  IReqVideo,
  IStatsVideo,
  IVideo,
  IVideoResult,
} from "../../api/interfaces/video.ts";
import { IReqVideoSnippet } from "../../api/interfaces/snippet.ts";
import { IError } from "../../api/interfaces/errors.ts";
import countries from "./countries.json" assert { type: "json" };

export default class subController {
  //---------------------------------------------------
  //------------general for Subscribers----------------
  //---------------------------------------------------
  static searchUrl = "https://www.googleapis.com/youtube/v3/search";
  static channelUrl = "https://www.googleapis.com/youtube/v3/channels";
  static subscptionUrl = "https://www.googleapis.com/youtube/v3/subscriptions";
  static videoUrl = "https://www.googleapis.com/youtube/v3/videos";

  // deno-lint-ignore no-explicit-any
  static async getAllSubscriptions(ctx: any): Promise<IError | IChannels> {
    //returns all channels, that the current Channels subscribes
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.token) {
      res.status = 401;
      error = { err: "Unauthorized: token missing" };
      return res.body = error;
    }
    try {
      const url =
        `${subController.subscptionUrl}?part=snippet&mine=true&access_token=${req.token}`;

      let finalResult: IChannels = {
        count: 0,
        channels: [],
      };
      let pageToken = "";
      do {
        const response = await fetch(
          (pageToken == "") ? url : (url + "&page_token=" + pageToken),
        );
        const data = await response.json();

        if ("items" in data && Array.isArray(data.items)) {
          finalResult = {
            count: finalResult.count + data.items.length,
            channels: finalResult.channels.concat(data.items),
          };
        }

        pageToken = data.nextPageToken;
      } while (pageToken);

      res.status = 200;
      return res.body = finalResult;
    } catch (err) {
      console.log(err);
      error = { err: "502: Bad Gateway" };
      res.status = 502;
      return res.body = error;
    }
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelBasicStats(ctx: any): Promise<IChannelStats | IError> {
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.channelId) {
      res.status = 400;
      error = { err: "Bad Request: channelId missing" };
      return res.body = error;
    }
    if (!req.token) {
      res.status = 401;
      error = { err: "Unauthorized: token missing" };
      return res.body = error;
    }
    try {
      const channelResponse = await fetch(
        `${subController.channelUrl}?part=id,statistics,status,topicDetails&id=${req.channelId}&access_token=${req.token}`,
      );
      const channelData = await channelResponse.json();
      let returnData: IChannelStats = {} as IChannelStats;
      if (channelData.items) {
        const topics = channelData.items[0].topicDetails;
        const topicNames: string[] = [];

        topics.topicCategories.forEach((e: string) => {
          const parts: string[] = e.split("/");
          topicNames.push(parts[parts.length - 1]);
        });

        returnData = {
          channelId: channelData.items[0].id,
          videoCnt: channelData.items[0].statistics.videoCount,
          viewCnt: channelData.items[0].statistics.viewCount,
          subscriberCnt: channelData.items[0].statistics.subscriberCount,
          forKids: channelData.items[0].status.madeForKids,
          topics: topicNames,
        };
        return res.body = returnData;
      }
      res.status = 200;
      return res.body = returnData;
    } catch (err) {
      console.log("an error occurreddd\n" + err);
      res.status = 502;
      error = { err: "Bad Gateway" };
      return res.body = error;
    }
  }

  static async getChannelAdvStats(
    ctx: any,
  ): Promise<IError | IChannelAdvStats> {
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.channelId) {
      res.status = 400;
      error = { err: "Bad Request: channelId missing" };
      return res.body = error;
    }
    if (!req.token) {
      res.status = 401;
      error = { err: "Unauthorized: token missing" };
      return res.body = error;
    }
    try {
      const allVideos: IError | IVideoResult = await subController
        .getChannelVideos(ctx);
      if (allVideos) {
        if ("err" in allVideos) {
          res.status = 502;
          return res.body = allVideos;
        } else {
          console.log(subController.videoUrl);
          const url =
            `${subController.videoUrl}?part=statistics&access_token=${req.token}`;
          let totalViews = 0;
          let totalLikes = 0;
          let totalComments = 0;

          for (let i = 0; i < allVideos.count; i++) {
            const result = await fetch(
              `${url}&id=${allVideos.videos[i].videoId}`,
            );
            const data = await result.json();
            const vid: IStatsVideo = data.items[0];
            totalViews = totalViews + +vid.statistics.viewCount;
            totalLikes = totalLikes + +vid.statistics.likeCount;
            totalComments = totalComments + +vid.statistics.commentCount;
          }

          res.status = 200;
          const finalResult: IChannelAdvStats = {
            channelId: req.channelId,
            viewsPerVid: totalViews / allVideos.count,
            likesPerVid: totalLikes / allVideos.count,
            commentsPerVid: totalComments / allVideos.count,
          };
          return res.body = finalResult;
        }
      } else {
        res.status = 502;
        error = { err: "Bad Gateway hier" };
        return res.body = error;
      }
    } catch (err) {
      console.log("2 An error occurrredd\n" + err);
      res.status = 502;
      error = { err: "Bad Gateway" };
      return res.body = error;
    }
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelVideos(ctx: any): Promise<IError | IVideoResult> {
    let count = 20000000; //20.000.000
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.channelId) {
      res.status = 400;
      error = { err: "Bad Request: channelId missing" };
      return res.body = error;
    }
    if (!req.token) {
      res.status = 401;
      error = { err: "Unauthorized: token missing" };
      return res.body = error;
    }
    if (req.count) {
      count = parseInt(req.count);
    }
    try {
      const url =
        `${subController.searchUrl}?part=snippet&order=date&channelId=${req.channelId}&access_token=${req.token}`;
      const finalResult: IVideoResult = {
        count: 0,
        videos: [],
      };
      let pageToken = "";
      do {
        const nextCnt = count > 50 ? 50 : count;
        const response = await fetch(
          (pageToken == "")
            ? url + `&maxResults=${nextCnt}`
            : (url + `&maxResults=${nextCnt}` + "&page_token=" + pageToken),
        );
        const data = await response.json();

        pageToken = data.nextPageToken;

        for (let i = 0; i < data.items.length; i++) {
          const currElement: IVideo = data.items[i];
          if (currElement.id.kind == "youtube#video") {
            finalResult.videos.push(subController.parseIReqVid(currElement));
            finalResult.count++;
            count--;
          }
        }
      } while (pageToken && count > 0);

      res.status = 200;
      return res.body = finalResult;
    } catch (err) {
      console.log("an error occurreddd\n" + err);
      res.status = 502;
      error = { err: "Bad Gateway" };
      return res.body = error;
    }
  }

  static isAlpha2Region(region: string): boolean {
    countries.forEach((element) => {
      if (element["alpha-2"] == region) {
        return true;
      }
    });
    return false;
  }

  static parseIReqVid(video: IVideo): IReqVideo {
    const tempSnippet: IReqVideoSnippet = {
      title: video.snippet.title,
      thumbnails: video.snippet.thumbnails,
    };
    const reqVideo = {
      videoId: video.id.videoId,
      channelId: video.snippet.channelId,
      channelTitle: video.channelTitle,
      snippet: tempSnippet,
    };
    return reqVideo;
  }

  // deno-lint-ignore no-explicit-any
  static async getChannelChartVideos(ctx: any): Promise<IError | IReqVideo[]> {
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let error: IError;
    if (!req.channelId) {
      res.status = 400;
      error = { err: "Bad Request: channelId or region missing" };
      return res.body = error;
    }
    if (!req.token) {
      res.status = 401;
      error = { err: "Unauthorized: token missing" };
      return res.body = error;
    }
    try {
      const region = subController.isAlpha2Region(req.region)
        ? req.region
        : "DE";
      let pageToken = "";
      let result: IVideo[] = [];
      do {
        const url =
          `${subController.videoUrl}?chart=mostPopular&regionCode=${region}&maxResults=50&part=snippet&access_token=${req.token}`;
        const response = await fetch(
          pageToken == "" ? url : url + `page_token=${pageToken}`,
        );
        const data = await response.json();

        result = result.concat(data.items);
        pageToken = data.nextPageToken;
      } while (pageToken);

      console.log(result);

      const chartVideos: IReqVideo[] = [];
      result.forEach((element) => {
        if (element) {
          //console.log("parsing first snippet");
          if (element.snippet.channelId == req.channelId) {
            chartVideos.push(subController.parseIReqVid(element));
          }
        }
      });

      res.status = 200;
      return res.body = chartVideos;
    } catch (err) {
      console.log("an error occurreddd\n" + err);
      res.status = 502;
      error = { err: "Bad Gateway" };
      return res.body = error;
    }
  }
}
