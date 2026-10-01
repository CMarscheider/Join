# Join

Ein Kanban-Board zur Aufgabenverwaltung im Team, angelehnt an Tools wie Trello. Aufgaben können angelegt, Kontakten zugewiesen und per Drag & Drop zwischen den Spalten "To Do", "In Progress", "Await Feedback" und "Done" verschoben werden.

Hinweis: Team-Projekt.

**Live-Demo:** https://cmarscheider.github.io/Join/

## Features

- Board mit Drag & Drop zwischen Aufgaben-Status
- Aufgaben mit Titel, Beschreibung, Fälligkeitsdatum, Priorität und Kategorie anlegen
- Kontaktverwaltung
- Modulare Seitenstruktur (Board, Add Task, Contacts, Help, Legal Notice)

## Tech-Stack

- Vanilla JavaScript, HTML, CSS
- Bootstrap für Basis-Styling
- Komponenten-Includes über ein eigenes `w3-include-html`-Pattern

## Lokal starten

Da das Projekt ohne Build-Step auskommt, reicht ein einfacher statischer Server:

```bash
npx serve .
```

Anschließend `index.html` im Browser öffnen.
