```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  server-->>browser: [{content: "asf", date: "2025-04-16T17:44:28.165Z"}]
```
