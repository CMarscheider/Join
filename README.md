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
- Datenhaltung über ein kleines eigenes Backend (`script/mini_backend.js`, als Vorlage von der Developer Akademie, nicht selbst geschrieben)

> Hinweis: Der ursprüngliche Übungsserver für das Backend ist nicht mehr erreichbar, daher funktionieren Login/Speichern in der Live-Demo aktuell nicht – die Oberfläche lässt sich aber vollständig ansehen.

## Lokal starten

Da das Projekt ohne Build-Step auskommt, reicht ein einfacher statischer Server:

```bash
npx serve .
```

Anschließend `login.html` im Browser öffnen.
