# YouTool REST-API Schnittstelle

Basis-URL: https://localhost:3000/api/v1

## mySubs Services

- URL-Erweiterung: /mySubs

### Subscriptions des eigenen Channels

- URL-Erweiterung: /subs
- GET-Request:
  - querie: token={OAuthToken}
- Response:
  - Successful (Statuscode 200):

```json
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

### Statistiken eines Channels

- URL-Erweiterung: /stats/basic
- URL-Erweiterung: /stats/advanced

### Videos eines Channels

- URL-Erweiterung: /videos

### Top Videos eines Channels

- URL-Erweiterung: /videos/charts

### Chart Videos eines Channels

- URL-Erweiterung: /videos/top
