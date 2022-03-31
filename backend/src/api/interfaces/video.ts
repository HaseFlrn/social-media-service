import { IVideoId } from './IDs.ts';
import { IVideoSnippet, IReqVideoSnippet } from './snippet.ts';

export interface IVideo {
  kind: string,
  etag: string,
  id: IVideoId,
  snippet: IVideoSnippet,
  channelTitle: string,
  liveBroadcastContent: string,
  publishTime: string
}

export interface IStatsVideo {
  kind: string,
  etag: string,
  id: string,
  statistics: { 
    viewCount: string,
    likeCount: string,
    favoriteCount: string,
    commentCount: string
  }
}

export interface IReqVideo {
  videoId: string,
  channelId: string,
  channelTitle: string,
  snippet: IReqVideoSnippet
}

export interface IVideoResult {
  count: number,
  videos: IReqVideo[]
}