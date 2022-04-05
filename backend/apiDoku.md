# YouTool REST-API Schnittstelle

Basis-URL: https://localhost:3000/api/v1

## mySubs Services

- URL-Erweiterung: /mySubs
- evtl. werden Rückgaben noch auf wichtiges reduziert

### Subscriptions des eigenen Channels

- URL-Erweiterung: /subs
- GET-Request:
  - querie(required): token={OAuthToken}
- Response:
  - Successful (Statuscode 200):

```yaml
{
  count: number,
  channels: [
    {
      kind: string,
      etag: string,
      id: string,
      snippet: {
        publishedAt: string,
        title: string,
        description: string,
        resourceId: {
          kind: string,
          channelId: string
        }
        channelId: string,
        thumbnails: {
          low: {
            url: string,
            width: number,
            heigth: number
          },
          mid: {
            ...
          },
          high: {
            ...
          }
        }
      }
    }
  ]
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Statistiken eines Channels

- URL-Erweiterung: /stats/basic
  - querie (required): token={OAuthToken}
  - querie (required): channelId={any channelId}
- URL-Erweiterung: /stats/advanced
  - querie (required): token={OAuthToken}
  - querie (required): channelId={any channelId}
  - querie (optional): count={integer} 
    - Anzahl der letzen x Videos über die die Statistiken erstellt werden sollen
    - sollte festgelegt werden, sonst sehr langsam (am besten < 50)

- successful basic Response (Statuscode 200):
```yaml
{
  channelId: string,
  videoCnt: number,
  viewCnt: number,
  subscriberCnt: number,
  forKids: boolean,
  topics: string[]
}
```

- successful advanced Response (Statuscode 200):
```yaml
{
  channelId: string,
  viewsPerVid: number,
  likesPerVid: number,
  commentsPerVid: number
}
```

- error (Statuscode 400(client), 401(client), 502(server)):
```yaml
{
  err: string
}
```


### Videos eines Channels

- URL-Erweiterung: /videos
  - querie (required): token={OAuthToken}
  - querie (required): channelId={any channelId}
  - querie (optional): count={integer}
  - --> Anzahl der gewünschten Videos (Standardmäßig alle)

- successful Response (Statuscode 200):
```yaml
{
  count: number,
  videos: [
    {
      videoId: string,
      channelId: string,
      channelTitle: string,
      snippet: {
        title: string,
        thumbnails: {
          siehe Oben
        }
      }
    }
  ]
}
```

- error (Statuscode 400(client), 401(client), 502(server)):
```yaml
{
  err: string
}
```

### Videos eines Channels mit Stats

- URL-Erweiterung: /videos/stats


### Top Videos eines Channels

- URL-Erweiterung: /videos/charts

### Chart Videos eines Channels

- URL-Erweiterung: /videos/top
  - querie (required): token={OAuthToken}
  - querie (required): channelId={any channelId}

- successful Response (Statuscode 200):
```yaml
[
  {
    videoId: string,
    channelId: string,
    channelTitle: string,
    snippet: {
      title: string,
      thumbnails: {
        siehe Oben
      }
    }
  }
]
```

- error (Statuscode 400, 401, 502): 
```yaml
{
  err: string
}
```

## generalChannelInformations Services

- URL-Erweiterung: /general

### Allgemeine Statistiken des Channels

- URL-Erweiterung: /channelInfos
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200):

```yaml
{
  channelTitle: string,
  channelDescription: string,
  channelPublishedAt: string,
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

## myStats Services

- URL-Erweiterung: /myStats

### Allgemeine Statistiken des Channels

- URL-Erweiterung: /channelStats
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200):

```yaml
{
  videoCount: number,
  subscriberCount: number,
  viewCount: number
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Video ID's

- URL-Erweiterung: /videoIds
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200):

```yaml
{
  latestVideo: string,
  allVideos: string[],
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Statistiken eines bestimmten Videos

- URL-Erweiterung: /videoStats
  - querie(required): token={OAuthToken}
  - querie (required): videoId={any videoId}
  
- successful Response (Statuscode 200):

```yaml
{
  viewCount: number,
  likeCount: number,
  dislikeCount: number,
  commentCount: number,
}
```
- error (Statuscode 400, 401, 502): 
```yaml
{
  err: string
}
```

### Playlist ID's

- URL-Erweiterung: /playlistIds
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200):

```yaml
{
  latestPlaylist: string,
  allPlaylists: string[],
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Infos zu einer bestimmten Playlist

- URL-Erweiterung: /playlistInfos
  - querie(required): token={OAuthToken}
  - querie (required): playlistId={any playlistId}
  
- successful Response (Statuscode 200):

```yaml
{
  playlistTitle: string,
  playlistDescription: string,
  playlistPublishedAt: string,
  playlistItemCount: number,
}
```
- error (Statuscode 400, 401, 502): 
```yaml
{
  err: string
}
```

### Statistiken des Channels pro Monat

- URL-Erweiterung: /channelStatsPerMonth
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200) für jeden Monat:

```yaml
{
  january: {
    views: number,
    comments: number,
    likes: number,
    dislikes: number,
    estimatedMinutesWatched: number,
    averageViewDuration: number,  
  },
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Statistiken des Channels pro Land

- URL-Erweiterung: /statsPerCountry
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200) für jeden Monat:

```yaml
{
  countryStats: {
    country: string,
    views: number,
    estimatedMinutesWatched: number,
    averageViewDuration: number,
    averageViewPercentage: number,
    subscribersGained : number, 
  },
}
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```

### Hochgeladene Videos pro Monat

- URL-Erweiterung: /uploadedVideosPerMonth
  - querie(required): token={OAuthToken}
  
- successful Response (Statuscode 200):

```yaml
{
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
```
  - error (Statuscode 401(client) oder 502(server)):
```yaml
{
  err: string
}
```