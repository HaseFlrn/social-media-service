export interface ICountryStats {
    country: string,
    views: number,
    estimatedMinutesWatched: number,
    averageViewDuration: number,
    averageViewPercentage: number,
    subscribersGained : number,
  }

export interface IChannelStats {
    videoCount: number,
    subscriberCount: number,
    viewCount: number,
}

export interface IVideoIds {
    latestVideo: string,
    allVideos: string[],
}

export interface IPlaylistIds {
    latestPlaylist: string,
    allplaylist: string[],
}

export interface IVideoStats {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
    commentCount: number,
}

export interface IPlaylistInfos {
    playlistTitle: string,
    playlistDescription: string,
    playlistPublishedAt: string,
    playlistItemCount: number,
}

export interface IOneMonthStats {
    views: number,
    comments: number,
    likes: number,
    dislikes: number,
    estimatedMinutesWatched: number,
    averageViewDuration: number,
}

export interface IStatsPerMonth {
    january: IOneMonthStats,
    february: IOneMonthStats,
    march: IOneMonthStats,
    april: IOneMonthStats,
    may: IOneMonthStats,
    june: IOneMonthStats,
    july: IOneMonthStats,
    august: IOneMonthStats,
    september: IOneMonthStats,
    october: IOneMonthStats,
    november: IOneMonthStats,
    december: IOneMonthStats,
}

export interface IStatsPerCountry {
    countryStats: ICountryStats[],
}

export interface IUploadesVideosPermonth {
    january: number,
    february: number,
    march: number,
    april: number,
    may: number,
    june: number,
    july: number,
    august: number,
    september: number,
    october: number,
    november: number,
    december: number,
}