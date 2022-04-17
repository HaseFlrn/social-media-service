
<img src="http://youtol.de/images/YouToolBlank.png" align="right" height="150"/>

# Social Media Service

![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub Issues](https://img.shields.io/github/issues/HaseFlrn/social-media-service.svg)](https://github.com/HaseFlrn/social-media-service/issues)
[![Website up](https://img.shields.io/website-up-down-green-red/http/youtol.de)](http://youtol.de/)
![language count](https://img.shields.io/github/languages/count/HaseFlrn/social-media-service)


Dieses Projekt wurde im Rahmen der Vorlesung "Web-Programmierung" des Wirtschaftsinformatikstudiums an der DHBW Mannheim erstellt.


## Grundlage

Da immmer mehr Soziale Plattformen genutzt werden sind die Betreiber verschiederner Kanäle 
stark daran interresiert ihren Kanal analysieren zu können. Um dies einfach tun zu können
haben wir dieses Tool entwickelt, welches es ermöglicht eine statistischen Auswertung von
verschiedenen sozialen Medien zu erhalten(Zur Zeit nur Youtube).

## Nutzung

Das Tool ist über folgenden Link zu erreichen: [Youtol.de](http://youtol.de/).
Dort könnt ihr euch einfach mit eurem YouTube Konto anmelden und die entsprechenden
Statistiken einsehen.


### Start Project Locally
Starte Backend mit dem folgenden Befehl im [Backend-Ordner](./backend/):

```sh
deno run --allow-read --allow-net --allow-env --lock=bin/start.lock.json --lock-write server.ts
```


Starte Frontend mit folgenden Befehl im [Frontend/App-Ordner](./frontend/app/):
```sh
snel serve
```

oder
```sh
trex run start
```


