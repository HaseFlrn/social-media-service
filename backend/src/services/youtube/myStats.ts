import { helpers } from "../../../deps.ts";
import { IError } from "../../api/interfaces/errors.ts";
import { ICountryStats, IChannelStats, IVideoIds, IVideoStats, IPlaylistIds, IPlaylistInfos, IStatsPerMonth, IOneMonthStats, IStatsPerCountry, IUploadesVideosPermonth } from "../../api/interfaces/myStats.ts";

export default class myStats {

    static channelInformationsUrl = `https://youtube.googleapis.com/youtube/v3/channels`
    static videosUrl = `https://youtube.googleapis.com/youtube/v3/activities`
    static videoStatisticsUrl = `https://youtube.googleapis.com/youtube/v3/videos`
    static playlistsUrl = `https://youtube.googleapis.com/youtube/v3/playlists`
    static playlistStatisticsUrl = `https://youtube.googleapis.com/youtube/v3/playlists`
    static reportsUrl = `https://youtubeanalytics.googleapis.com/v2/reports`


    //----------------------------------------
    //------Own Channel Stats-----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getChannelStats(ctx: any): Promise<IError | IChannelStats> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const response = await fetch(`${myStats.channelInformationsUrl}?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${req.token}`);
            const data = await response.json();
            let finalResult: IChannelStats = {} as IChannelStats;

            if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
                finalResult = {
                    videoCount: +data.items[0].statistics.videoCount,
                    subscriberCount: +data.items[0].statistics.subscriberCount,
                    viewCount: +data.items[0].statistics.viewCount
                };

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("1 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //----------Video ID's-----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getVideoIds(ctx: any): Promise<IError | IVideoIds> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const response = await fetch(`${myStats.videosUrl}?part=snippet%2CcontentDetails&maxResults=1000&mine=true&access_token=${req.token}`);
            const data = await response.json();
            let finalResult: IVideoIds = {} as IVideoIds;

            if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
                finalResult = {
                    latestVideo: data.items[0].contentDetails.upload.videoId,
                    allVideos: [],
                };

                for (let i = 0; i < data.items.length; i++) {
                    finalResult.allVideos.push(data.items[i].contentDetails.upload.videoId)
                }

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("2 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //----------Video Stats-----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getVideoStats(ctx: any): Promise<IError | IVideoStats> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.videoId) {
            res.status = 400;
            error = { err: 'Bad Request: channelId missing' };
            return res.body = error;
        }
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const response = await fetch(`${myStats.videoStatisticsUrl}?part=snippet%2CcontentDetails%2Cstatistics&id=${req.videoId}&access_token=${req.token}`);
            const data = await response.json();
            let finalResult: IVideoStats = {} as IVideoStats;

            if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
                finalResult = {
                    viewCount: +data.items[0].statistics.viewCount,
                    likeCount: +data.items[0].statistics.likeCount,
                    dislikeCount: +data.items[0].statistics.dislikeCount,
                    commentCount: +data.items[0].statistics.commentCount
                };

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("3 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //----------Playlist ID's-----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getPlaylistIds(ctx: any): Promise<IError | IPlaylistIds> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const response = await fetch(`${myStats.playlistsUrl}?part=snippet%2CcontentDetails&mine=true&access_token=${req.token}`);
            const data = await response.json();
            let finalResult: IPlaylistIds = {} as IPlaylistIds;

            if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
                finalResult = {
                    latestPlaylist: data.items[0].id,
                    allplaylist: [],
                };

                for (let i = 0; i < data.items.length; i++) {
                    finalResult.allplaylist.push(data.items[i].id)
                }

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("4 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //----------Playlist Infos----------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getPlaylistInfos(ctx: any): Promise<IError | IPlaylistInfos> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.playlistId) {
            res.status = 400;
            error = { err: 'Bad Request: channelId missing' };
            return res.body = error;
        }
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }


        try {
            const response = await fetch(`${myStats.playlistStatisticsUrl}?part=snippet%2CcontentDetails&id=${req.playlistId}&access_token=${req.token}`);
            const data = await response.json();
            let finalResult: IPlaylistInfos = {} as IPlaylistInfos;

            if ("items" in data && Array.isArray(data.items) && data.items.length != 0) {
                finalResult = {
                    playlistTitle: data.items[0].snippet.title,
                    playlistDescription: data.items[0].snippet.description,
                    playlistPublishedAt: data.items[0].snippet.publishedAt,
                    playlistItemCount: data.items[0].contentDetails.itemCount
                };

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("5 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //-------My Stats Per Month---------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getChannelStatsPerMonth(ctx: any): Promise<IError | IStatsPerMonth> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const currentYear = (new Date()).getFullYear();
            //starts with 0
            const currentMonth = (new Date()).getMonth();

            let oneMonthStats: IOneMonthStats = {} as IOneMonthStats;
            const emptyYear = [oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats, oneMonthStats];

            let finalResult: IStatsPerMonth = {} as IStatsPerMonth;

            for (let i = 0; i <= currentMonth; i++) {
                const tempStartDate = currentYear + "-" + ('0' + (i + 1)).slice(-2) + "-01";

                const lastDayInMonth = new Date(currentYear, i + 1, 0);
                const tempEndDate = lastDayInMonth.getFullYear() + "-" + ('0' + (lastDayInMonth.getMonth() + 1)).slice(-2) + "-" + ('0' + lastDayInMonth.getDate()).slice(-2);

                const response = await fetch(`${myStats.reportsUrl}?endDate=${tempEndDate}&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration&startDate=${tempStartDate}&access_token=${req.token}`);
                const data = await response.json();

                if (data.rows && data.rows.length != 0) {
                    oneMonthStats = {
                        views: data.rows[0][0],
                        comments: data.rows[0][1],
                        likes: data.rows[0][2],
                        dislikes: data.rows[0][3],
                        estimatedMinutesWatched: data.rows[0][4],
                        averageViewDuration: data.rows[0][5]
                    };
                    emptyYear[i] = oneMonthStats;
                }
            }

            finalResult = {
                january: emptyYear[0],
                february: emptyYear[1],
                march: emptyYear[2],
                april: emptyYear[3],
                may: emptyYear[4],
                june: emptyYear[5],
                july: emptyYear[6],
                august: emptyYear[7],
                september: emptyYear[8],
                october: emptyYear[9],
                november: emptyYear[10],
                december: emptyYear[11]
            };

            res.status = 200;
            return res.body = finalResult;
        } catch (err) {
            console.log("6 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }

    //----------------------------------------
    //--------Stats per country---------------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getStatsPerCountry(ctx: any): Promise<IError | IStatsPerCountry> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {

            const tempDate = new Date();
            const currentDate = tempDate.getFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + tempDate.getDate()).slice(-2);

            const url = `${myStats.reportsUrl}?dimensions=country&endDate=${currentDate}&ids=channel%3D%3DMINE&metrics=views%2CestimatedMinutesWatched%2CaverageViewDuration%2CaverageViewPercentage%2CsubscribersGained&sort=-estimatedMinutesWatched&startDate=2014-05-01&access_token=${req.token}`;

            const finalResult: IStatsPerCountry = {
                countryStats: []
            };

            const response = await fetch(url);
            const data = await response.json();

            if ("items" in data && Array.isArray(data.items)) {
                for (let i = 0; i < data.rows.length; i++) {
                    let tempCountryStats: ICountryStats = {} as ICountryStats;
                    tempCountryStats = {
                        country: data.rows[i][0],
                        views: data.rows[i][1],
                        estimatedMinutesWatched: data.rows[i][2],
                        averageViewDuration: data.rows[i][3],
                        averageViewPercentage: data.rows[i][4],
                        subscribersGained: data.rows[i][5]
                    }
                    finalResult.countryStats.push(tempCountryStats);
                }

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("7 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }


    //----------------------------------------
    //-----Uploaded Videos per Month----------
    //----------------------------------------

    // deno-lint-ignore no-explicit-any
    static async getUploadedVideosPerMonth(ctx: any): Promise<IError | IUploadesVideosPermonth> {
        const req = helpers.getQuery(ctx, { mergeParams: true });
        const res = ctx.response;
        let error: IError;
        if (!req.token) {
            res.status = 401;
            error = { err: 'Unauthorized: token missing' };
            return res.body = error;
        }

        try {
            const currentYear = (new Date()).getFullYear();
            const videoCountPerMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            const response = await fetch(`${myStats.videosUrl}?part=snippet%2CcontentDetails&maxResults=25&mine=true&access_token=${req.token}`);
            const data = await response.json();

            let finalResult: IUploadesVideosPermonth = {} as IUploadesVideosPermonth;

            if ("items" in data && Array.isArray(data.items)) {
                for (let i = 0; i < data.items.length; i++) {
                    //get publishedAt from Video
                    const publishedAt = data.items[i].snippet.publishedAt;

                    //check in with month the video has been published and ++ array
                    for (let j = 1; j < 13; j++) {
                        const startsWith = currentYear + "-" + ('0' + (j)).slice(-2);
                        if (publishedAt.startsWith(startsWith)) {
                            videoCountPerMonth[j - 1] = videoCountPerMonth[j - 1] + 1;
                        }
                    }
                }

                finalResult = {
                    january: videoCountPerMonth[0],
                    february: videoCountPerMonth[1],
                    march: videoCountPerMonth[2],
                    april: videoCountPerMonth[3],
                    may: videoCountPerMonth[4],
                    june: videoCountPerMonth[5],
                    july: videoCountPerMonth[6],
                    august: videoCountPerMonth[7],
                    september: videoCountPerMonth[8],
                    october: videoCountPerMonth[9],
                    november: videoCountPerMonth[10],
                    december: videoCountPerMonth[11]
                };

                res.status = 200;
                return res.body = finalResult;
            } else {
                res.status = 200;
                return res.body = finalResult;
            }
        } catch (err) {
            console.log("8 an error occurreddd\n" + err);
            res.status = 502;
            error = { err: 'Bad Gateway' };
            return res.body = error;
        }
    }
}