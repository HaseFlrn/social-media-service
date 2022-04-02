import { IChannelSnippet, IReqChannelSnippet } from './snippet.ts';

export interface IChannel {
  kind: string,
  etag: string,
  id: string,
  snippet: IChannelSnippet
}

export interface IReqChannel {
  channelId: string,
  snippet: IReqChannelSnippet
}

export interface IChannels {
  count: number,
  channels: IChannel[]
}

export interface IChannelStats {
  channelId: string,
  videoCnt: number,
  viewCnt: number, 
  subscriberCnt: number,
  forKids: boolean,
  topics: string[]
}

export interface IChannelAdvStats {
  channelId: string,
  viewsPerVid: number,
  likesPerVid: number,
  commentsPerVid: number
}