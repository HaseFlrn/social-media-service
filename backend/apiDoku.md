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
- URL-Erweiterung: /stats/advanced
  - querie (required): token={OAuthToken}
  - querie (required): channelId={any channelId}

- Response:
  - successful basic (Statuscode 200):
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

  - successful advanced (Statuscode 200):
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

### Top Videos eines Channels

- URL-Erweiterung: /videos/charts

### Chart Videos eines Channels

- URL-Erweiterung: /videos/top
