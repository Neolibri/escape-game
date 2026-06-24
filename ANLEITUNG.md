# Escape-Adventskalender – Anleitung

Eine kleine App (PWA) für deinen Escape-Room-Adventskalender. Pro Tag können
die Leute **1. Hinweis**, **2. Hinweis** und **Lösung** aufklappen. Darüber
liegt eine Übersicht mit allen Tagen **1.–24. Dezember**.

Komplett kostenlos über **GitHub Pages**. Kein Google Drive, kein Server, keine
laufenden Kosten.

---

## Was liegt in diesem Ordner?

| Datei / Ordner        | Wofür                                                              |
|-----------------------|--------------------------------------------------------------------|
| `index.html`          | Die App selbst                                                     |
| `inhalte.js`          | **HIER deine Texte eintragen** (Hinweise + Lösungen, 24 Tage)      |
| `config.js`           | Einstellungen: Titel, Farben (grob), Testmodus, Freischaltung      |
| `styles.css`          | Design im Detail (Farben, Rundungen, Schrift)                     |
| `app.js`              | Technik – musst du normalerweise nicht anfassen                   |
| `manifest.json`, `service-worker.js` | Machen die Seite zur installierbaren App           |
| `icon-192.png`, `icon-512.png` | App-Icons (Platzhalter, kannst du später austauschen)    |
| `qr-generator.html`   | Erzeugt alle QR-Codes, wenn deine Adresse steht                   |

Alle Dateien liegen direkt nebeneinander (keine Unterordner).

---

## 1) Deine Texte eintragen

Öffne `inhalte.js` mit einem beliebigen Texteditor. Für jeden Tag stehen
dort vier Felder. Trage einfach deine echten Texte zwischen die
Anführungszeichen ein:

```js
1: {
  titel:    "Der verschwundene Schlüssel",
  hinweis1: "Schau dir die Zahlen auf Seite 3 genauer an.",
  hinweis2: "Lies nur jede zweite Zahl.",
  loesung:  "Der Code lautet 7-2-9."
},
```

- `titel` darf leer sein: `titel: ""`
- Zeilenumbruch im Text: `<br>`
- Fett: `<b>...</b>`
- Bild einfügen: lade das Bild ins Repository und schreibe
  `<img src="tag1.jpg">` in den Text.

> Wenn du mir die Texte schickst, trage ich sie auch gern für dich ein.

---

## 2) Einstellungen (`js/config.js`)

- `titel` / `untertitel` – die Überschrift oben.
- `testmodus: true` – **alle Tage offen, egal welches Datum** (zum Ausprobieren).
  Vor dem Echteinsatz im Dezember auf `false` stellen.
- `freischaltungNachDatum: true` – Tag X öffnet erst am X. Dezember.
- `jahr: 2026` – auf das Jahr stellen, in dem der Kalender läuft.
- `theme: { ... }` – schnelle Farbwahl. Feiner geht es oben in `styles.css`.

---

## 3) Design später anpassen (wenn dein Cover da ist)

**Cover einsetzen:** Bild (z.B. `cover.jpg`) ins Repository hochladen.
In `index.html` die Zeile mit `<div class="cover" ...>` ersetzen durch:

```html
<div class="cover"><img src="cover.jpg" alt="Cover"></div>
```

**Farben:** in `styles.css` ganz oben im Block `:root` ändern – oder
schneller in `config.js` unter `theme`.

**App-Icon:** `icon-192.png` und `icon-512.png` durch eigene
Bilder gleicher Größe ersetzen.

---

## 4) Online stellen mit GitHub Pages (kostenlos)

1. Auf <https://github.com> ein kostenloses Konto anlegen (falls nicht vorhanden).
2. Oben rechts **+ → New repository**. Name z.B. `escape-adventskalender`,
   auf **Public** lassen, **Create repository**.
3. Auf der neuen Seite **„uploading an existing file“** anklicken und
   **alle Dateien aus diesem Ordner** hineinziehen. **Commit changes**.
4. Im Repository oben auf **Settings → Pages**.
5. Unter **Branch** `main` und `/ (root)` wählen, **Save**.
6. Nach ~1 Minute erscheint dort deine Adresse, z.B.
   `https://deinname.github.io/escape-adventskalender/`.

Diese Adresse ist deine fertige App. Öffne sie zum Testen am Handy.

> Wichtig: Nach Änderungen an den Dateien lädst du die geänderten Dateien
> wieder im Repository hoch (gleicher Weg). Im `service-worker.js` zusätzlich
> die Zeile `const CACHE = "adventskalender-v1";` hochzählen (`v2`, `v3` …),
> damit alle die neue Version bekommen.

---

## 5) QR-Code erstellen

1. Öffne `qr-generator.html` (Doppelklick öffnet sie im Browser).
2. Trage oben **deine GitHub-Pages-Adresse** ein (mit `/` am Ende).
3. **QR-Code erzeugen** klicken.
4. Du bekommst **einen QR-Code**, der immer die Übersicht (1.–24. Dezember)
   öffnet.
5. Als PNG herunterladen oder **„Drucken / als PDF speichern“** – dann ins
   Buch einsetzen.

---

## So fühlt es sich für deine Gäste an

QR-Code scannen → die App öffnet sich im Vollbild → sie sehen die Übersicht
1.–24. → tippen auf den Tag → dann auf **1. Hinweis**, später **2. Hinweis**,
und zum Schluss **Lösung**. Optional „Zum Startbildschirm hinzufügen“, dann
liegt der Kalender wie eine echte App auf dem Handy.
