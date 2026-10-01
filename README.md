# Join

Ein Kanban-Board zur Aufgabenverwaltung im Team, angelehnt an Tools wie Trello. Aufgaben können angelegt, Kontakten zugewiesen und per Drag & Drop zwischen den Spalten "To Do", "In Progress", "Await Feedback" und "Done" verschoben werden.

Hinweis: Team-Projekt.

**Live-Demo:** https://cmarscheider.github.io/Join/

## Features

- Login/Registrierung sowie Gast-Login
- Board mit Drag & Drop zwischen Aufgaben-Status
- Aufgaben mit Titel, Beschreibung, Fälligkeitsdatum, Priorität und Kategorie anlegen
- Kontaktverwaltung
- Modulare Seitenstruktur (Summary, Board, Add Task, Contacts, Help, Legal Notice)

## Tech-Stack

- Vanilla JavaScript, HTML, CSS
- Komponenten-Includes über ein eigenes `w3-include-html`-Pattern
- Datenhaltung über eine kleine Backend-Abstraktion (`script/mini_backend.js`, als Vorlage übernommen, nicht selbst geschrieben), die Daten als ein JSON-Objekt liest/schreibt

> Hinweis: Der ursprüngliche Übungsserver ist nicht mehr erreichbar. Die Live-Demo nutzt stattdessen ein eigenes Supabase-Projekt als Ersatz-Backend (ohne Änderungen an der restlichen App-Logik), daher sind Login, Registrierung und Speichern funktionsfähig. Es gibt keine echte Nutzer-Authentifizierung auf Server-Seite – das war schon im ursprünglichen Übungsprojekt so.

## Lokal starten

Da das Projekt ohne Build-Step auskommt, reicht ein einfacher statischer Server:

```bash
npx serve .
```

Anschließend `login.html` im Browser öffnen.
