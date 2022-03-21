# Backend

## Set-up

Eine .env erstellen mit folgendem Inhalt:

- PORT=[your Port]
- INSTAGRAM_CLIENT_ID=[instagram-client-id aus Instagram-dev]
- INSTAGRAM_CLIENT_SECRET=[instagram-client-secret aus Instagram-dev]
- YOUTUBE_CLIENT_ID=[google-app id]
- YOUTUBE_PROJECT_ID=[google-project id]
- YOUTUBE_CLIENT_SECRET=[google-app secret]

weitere Properties könnten folgen.

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
- Basis URL: https://www.googleapis.com/youtube/v3/search
- Queries:
    - Required:
        - access_token={OAuth Token}
    - Optional:
        - part=snippet --> Genauere Angaben zu den Videos
        - forMine=true --> zeigt nur Videos vom authentifizierten User
        - channelId={channelId} --> Nur videos von bestimmten Channel werden angezeigt
        - type={video,...} --> Nur anzeige dieses Uploadtypes

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

## Services
Folgend sind die verschiedenen Namen für die Url mit den entsprechenden Paramentern aufgelistet. Die Funktionen haben entsprechend den gleichen Namen nur mit "get" davor.

### General.ts:
Url zum Aufrufen: https://localhost:3000/api/v1/general/(Name der folgenden Funktion)/(Parameter den die Funktion braucht)
</br>

- getChannelInformations/(token) holt sich die alle Channel Informationen des eigenen Channels. Alle weiteren Methoden rufen diese auf und filtern einzelne Daten aus der JSON raus und geben diese zurück
- getChannelName/(token) gibt den Namen des Channels zurück
- getChannelDescription/(token) gibt die Beschreibung des Channels zurück
- getChannelPublishedAt/(token) gibt das Datum zurück, an dem der Cahnnel ertellt wurde

### myStats.ts:
Url zum Aufrufen: https://localhost:3000/api/v1/myStats/

- videoQuantity/(token) -> Gesamtanzahl an Videos auf eigenem Channel 
- subscriberQuantity/(token) -> Gesamtanzahl an Subscribern 
- allTimeViews/(token) -> Gesamtanzahl an Views auf alle Videos
</br>

- latestVideo/(token) -> Liefert die VideoId des neuesten (zuletzt hochgeladenen) Videos
- allVideos/(token) -> Liefert eine Liste mit den Id's aller Videos 
<br/>

- videoViewsQuantity/(token)/(videoId) -> Anzahl an Views auf ausgewähles Video
- videoLikesQuantity/(token)/(videoId) -> Anzahl an Likes auf ausgewähles Video
- videoDislikesQuantity/(token)/(videoId) -> Anzahl an Dislikes auf ausgewähles Video
- videoCommentQuantity/(token)/(videoId) -> Anzahl an Kommentaren auf ausgewähles Video
<br/>

- allPlaylists/(token) -> Liefert eine Liste mit den Id's aller Playlists
<br/>

- playlistName/(token)/(playlistId) -> Name der gewählten Playlist
- playlistDescription/(token)/(playlistId) -> Beschreibung der gewählten Playlist
- playlistPublishedAt/(token)/(playlistId) -> Veröffentlichungsdatum der gewählten Playlist
- playlistVideoQuantity/(token)/(playlistId) -> Anzahl an Videos in der gewählten Playlist
<br/>

- viewsInMonthForCurrentYear/(token) -> Liefert ein Array mit der Anzahl der gemachten Views des jeweiligen Monats. Index 0 ist Januar, usw. Das Array endet im aktuellen Monat und gibt die Views bis zum aktuellen Datum an
- commentsInMonthForCurrentYear/(token) -> Gleich wie Views nur mit Kommentaren
- likesInMonthForCurrentYear/(token) -> Gleich wie Views nur mit Likes
- dislikesInMonthForCurrentYear/(token) -> Gleich wie Views nur mit Dislikes
- estimatedMinutesWatchedInMonthForCurrentYear/(token) -> Gleich wie Views nur mit Geschätzte geschaute Minuten
- averageViewDurationInMonthForCurrentYear/(token) -> Gleich wie Views nur mit Durchschnittliche View Duration