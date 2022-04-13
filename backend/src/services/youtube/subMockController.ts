import { helpers } from "../../../deps.ts";
import { ITopVideoResult } from "../../api/interfaces/video.ts";
import { IError } from "../../api/interfaces/errors.ts";

export default class subMockController {

  // deno-lint-ignore no-explicit-any
  static getChannelTopVideos(ctx: any): IError|ITopVideoResult {
    const req = helpers.getQuery(ctx, { mergeParams: true });
    const res = ctx.response;
    let count = 3;
    let error: IError;
    if(!req.channelId) {
      res.status = 400;
      error = { err: 'Bad Request: channelId missing'};
      return res.body = error;
    }
    if(!req.token) {
      res.status = 401;
      error = { err: 'Unauthorized: token missing'};
      return res.body = error;
    }
    const topVids: ITopVideoResult = {
      count: 3,
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          channelId: 'UCuAXFkgsw1L7xaCfnd5JJOw',
          snippet: {
            title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
                width: 120,
                height: 90
              },
              medium: {
                url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
                width: 320,
                height: 180
              },
              high: {
                url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
                width: 480,
                height: 360
              },
            }
          },
          stats: {
            views: 1192077071,
            likes: 14037828,
            comments: 2113086,
          }
        },
        {
          videoId: 'JIOPB36ALMM',
          channelId: 'UCuAXFkgsw1L7xaCfnd5JJOw',
          snippet: {
            title: 'Rick Astley - abcdefu (GAYLE Cover)',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/JIOPB36ALMM/default.jpg",
                width: 120,
                height: 90
              },
              medium: {
                url: "https://i.ytimg.com/vi/JIOPB36ALMM/mqdefault.jpg",
                width: 320,
                height: 180
              },
              high: {
                url: "https://i.ytimg.com/vi/JIOPB36ALMM/hqdefault.jpg",
                width: 480,
                height: 360
              },
            }
          },
          stats: {
            views: 592919,
            likes: 42242,
            comments: 4028,
          }
        },
        {
          videoId: '8l7ke2AuNls',
          channelId: 'UCuAXFkgsw1L7xaCfnd5JJOw',
          snippet: {
            title: 'Rick Astley - Love This Christmas (Bloopers)',
            thumbnails: {
              default: {
                url: "https://i.ytimg.com/vi/8l7ke2AuNls/default.jpg",
                width: 120,
                height: 90
              },
              medium: {
                url: "https://i.ytimg.com/vi/8l7ke2AuNls/mqdefault.jpg",
                width: 320,
                height: 180
              },
              high: {
                url: "https://i.ytimg.com/vi/8l7ke2AuNls/hqdefault.jpg",
                width: 480,
                height: 360
              },
            },
          },
          stats: {
            views: 211916,
            likes: 10466,
            comments: 1323,
          }
        }
      ]
    }

    res.status = 200;
    return res.body = topVids;

  }
}
