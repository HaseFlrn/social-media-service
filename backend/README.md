# Backend

## Set-up

Eine .env erstellen mit folgendem Inhalt:

- PORT=[your Port]
- FRONTEND_URL=[url zum frontend]
- CLIENT_ID=[google-app id]
- REDIRECT=[url zur callback route]
- PROJECT_ID=[google-project id]
- CLIENT_SECRET=[google-app secret]
- SSL_PATH=[path to cert and key]

weitere Properties könnten folgen.

## Youtube  

[Vollständige API Reference](https://developers.google.com/youtube/v3/docs)

`https://www.googleapis.com/youtube/v3/channels?access_token={access_token}&part=snippet&mine=true`

Rückgabe: Channel Informationen

`https://www.googleapis.com/youtube/v3/channels?contentdDetails&access_token={access_token}part=brandingSettings&mine=true`

Rückgabe: Channel Branding Settings

`https://www.googleapis.com/youtube/v3/activities?[mine=true or channelId={channelId} or home=true]&access_token={access_token}&part=snippet`

Rückgabe: Activity Liste

- mine=true => authenticated users activities
- channelId => activities des Channels mit der ID channelId
- home=true => activities of subscribed channels

<img src="code.png" alt="example response" style="width:400px;"/>

### [Youtube Search API](https://developers.google.com/youtube/v3/docs/search/list)

- Basis URL: <https://www.googleapis.com/youtube/v3/search>
- Queries:
  - Required:
    - access_token={OAuth Token}
  - Optional:
    - part=snippet --> Genauere Angaben zu den Videos
    - forMine=true --> zeigt nur Videos vom authentifizierten User (type=video required)
    - channelId={channelId} --> Nur videos von bestimmten Channel werden angezeigt
    - type={video,...} --> Nur anzeige dieses Uploadtypes

### [Youtube Video API](https://developers.google.com/youtube/v3/docs/videos/list)

- Basis URL: <https://www.googleapis.com/youtube/v3/videos>
- Queries:
  - Requires:
    - access_token={OAuth Token}
    - part={siehe googel dokumentation}
  - Filters (genau 1):
    - chart=mostPopular --> bekanntesten videos für Region und Videoart
    - id={videoIds Liste} --> Infos zu entsprechenden Videos
    - myRating={like|dislike} --> Zeigt videos an, die der User gelikes/disliked hat
  - Optional:
    - regionCode={DE, ...} --> Nach ISO 3166-1 2 Buchstaben, nur mit chart-Filter nutzbar
    - videoCategoryId={0,1,...} --> default 0, nur mit chart-Filter nutzbar

### Youtube Report API

### Youtube Channel API

### Youtube Subscriptions API

## Scripts

Alle Scripts aus /backend starten!

### ./bin/start

- Startet den server lokal ohne imports neu zu cachen
- funktioniert mit alten Versionen
- statisch

### ./bin/devstart

- überprüft imports mit quelle
- holt neue imports hinzu
- startet in watchmode --> Hot Reload

### ./bin/reload

- holt neueste Updates für imports

## Instagram Basic API

`https://graph.instagram.com/{user_id}?fields=[id,username,media]`

Rückgabe:

- id: user_id
- username: username
- media: ein data Array mit den Ids zu den Medien

`https://graph.instagram.com/{media_id}?fields=[id,caption,media_type,media_url,permalink,timestamp,username,children]`

Rückgabe:

- caption: caption
- media_type: media_type in Uppercase => IMAGE,VIDEO,CAROUSEL_ALBUM
- media_url: Link zum Datenbankeintrag
- media_count: Anzahl an Medien
- permalink: Link zum content
- timestamp: timestamp zum Upload
- username: username
- children: NUR BEI CAROUSEL_ALBUM => ids der einzelnen Medien im Album