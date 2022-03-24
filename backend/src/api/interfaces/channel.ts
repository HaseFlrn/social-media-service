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