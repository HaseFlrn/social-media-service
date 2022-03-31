# Learnings im web-programmieren Projekt Youtool

## Generell

- Deno kennen- und nutzen gelernt
- Server-Hosting
- Domain Besorgung und DNS-Registrierung (GoDaddy.com)

## Backend

- Middleware-Frameworks
  - opine: Anfangs verwendet, hat irgendwann Probleme bei listenAndServeTLS bekommen 
  - oak: Aus opine übersetzt, aktuelle Wahl
- Nutzen von genormten http-Statuscodes
- Nutzung von .env-Files zum Schutz von Daten

## Frontend

- Snel und Svelte erlernt
  - svelte routing umgesetzt
  - snel build macht hin und wieder mal Probleme
- Hosting
  - GitHub-Pages: Anfangs verwendet, nicht kompatibel mit svelte-routing
  - nginx: als Container auf eigenem Server und für SPA konfiguriert -> redirect auf index.html
