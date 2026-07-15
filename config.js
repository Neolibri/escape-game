/* =====================================================================
   KONFIGURATION  –  hier kannst du die wichtigsten Einstellungen ändern
   ===================================================================== */

const CONFIG = {

  /* --- Titel & Texte -------------------------------------------------- */
  titel:        "Calendrier de l'Avent Escape Room",
  untertitel:   "Le secret de l'expédition polaire",

  /* --- Freischaltung -------------------------------------------------- */
  // true  = Türchen öffnen sich erst am jeweiligen Dezember-Tag (echter Kalender)
  // false = alle 24 Tage sind sofort offen (gut zum Testen / Nachholen)
  freischaltungNachDatum: true,

  // Jahr, in dem der Kalender läuft. Tag X öffnet ab dem X. Dezember dieses Jahres.
  jahr: 2026,

  /* --- Testmodus ------------------------------------------------------ */
  // true  = alles ist freigeschaltet, egal welches Datum (zum Ausprobieren!)
  // Vor dem echten Einsatz im Dezember auf false stellen.
  testmodus: false,

  /* --- Design (Schnellwahl) ------------------------------------------
     Feinere Anpassungen findest du in  css/styles.css  ganz oben.       */
  theme: {
    farbeHintergrund: "#0e1116",   // Seiten-Hintergrund
    farbeKarte:       "#171c24",   // Kacheln / Karten
    farbeAkzent:      "#c8a24b",   // Gold-Akzent (Buttons, Zahlen)
    farbeAkzent2:     "#7a1f2b",   // zweiter Akzent (rot/weihnachtlich)
    farbeText:        "#f2efe6",   // Schriftfarbe
    farbeTextLeise:   "#9aa0aa"    // gedämpfte Schrift
  }
};
