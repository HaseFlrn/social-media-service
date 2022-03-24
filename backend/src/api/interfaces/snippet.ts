import { IResourceId } from './IDs.ts';

export interface IVideoSnippet {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: Record<string, undefined>,
}

export interface IReqVideoSnippet {
  title: string,
  thumbnails: Record<string, undefined>
}

export interface IChannelSnippet {
  publishedAt: string,
  title: string,
  description: string,
  resourceId: IResourceId,
  channelId: string,
  thumbnails: Record<string, undefined>
}

export interface IReqChannelSnippet {
  title: string,
  thumbnails: Record<string, undefined>
}