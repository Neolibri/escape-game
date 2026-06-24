/* =====================================================================
   APP-LOGIK   (musst du normalerweise nicht anfassen)
   - Übersicht 1..24
   - Detailansicht je Tag mit aufklappbarem 1. Hinweis / 2. Hinweis / Lösung
   - Freischaltung nach Datum
   - Routing über die Adresse (#/tag/5)  -> funktioniert für QR-Deeplinks
   ===================================================================== */

(function () {
  "use strict";

  // --- Theme aus config.js anwenden ---------------------------------
  const t = (CONFIG.theme || {});
  const r = document.documentElement.style;
  if (t.farbeHintergrund) r.setProperty("--bg", t.farbeHintergrund);
  if (t.farbeKarte)       r.setProperty("--karte", t.farbeKarte);
  if (t.farbeAkzent)      r.setProperty("--akzent", t.farbeAkzent);
  if (t.farbeAkzent2)     r.setProperty("--akzent2", t.farbeAkzent2);
  if (t.farbeText)        r.setProperty("--text", t.farbeText);
  if (t.farbeTextLeise)   r.setProperty("--text-leise", t.farbeTextLeise);

  document.getElementById("titel").textContent = CONFIG.titel;
  document.getElementById("untertitel").textContent = CONFIG.untertitel;
  document.title = CONFIG.titel;
  document.getElementById("footer").textContent = CONFIG.titel;

  const view = document.getElementById("view");

  // --- Freischaltung prüfen -----------------------------------------
  function istFrei(tag) {
    if (CONFIG.testmodus) return true;
    if (!CONFIG.freischaltungNachDatum) return true;
    const heute = new Date();
    const oeffnet = new Date(CONFIG.jahr, 11, tag, 0, 0, 0); // Monat 11 = Dezember
    return heute >= oeffnet;
  }
  function istHeute(tag) {
    const h = new Date();
    return h.getFullYear() === CONFIG.jahr && h.getMonth() === 11 && h.getDate() === tag;
  }

  // --- Übersicht (Gitter 1..24) -------------------------------------
  function renderUebersicht() {
    let html = '<div class="grid">';
    for (let i = 1; i <= 24; i++) {
      const frei = istFrei(i);
      const heute = istHeute(i);
      const klassen = "tile " + (frei ? "offen" : "gesperrt") + (heute ? " heute" : "");
      const onclick = frei ? `onclick="location.hash='#/tag/${i}'"` : "";
      const schloss = frei ? "" : '<span class="lock">🔒</span>';
      html += `<div class="${klassen}" ${onclick}><span class="num">${i}</span>${schloss}</div>`;
    }
    html += "</div>";
    view.innerHTML = html;
    window.scrollTo(0, 0);
  }

  // --- Detailansicht eines Tages ------------------------------------
  function renderTag(tag) {
    const data = INHALTE[tag];
    if (!data) { location.hash = ""; return; }

    if (!istFrei(tag)) {
      view.innerHTML = `
        <button class="zurueck" onclick="location.hash=''">‹ Retour à l'aperçu</button>
        <div class="gesperrt-box">
          <div class="schloss">🔒</div>
          <div>Cette case s'ouvre le <b>${tag} décembre</b>.</div>
        </div>`;
      window.scrollTo(0, 0);
      return;
    }

    const titel = data.titel && data.titel.trim() ? data.titel : ("Jour " + tag);

    view.innerHTML = `
      <div class="detail">
        <button class="zurueck" onclick="location.hash=''">‹ Retour à l'aperçu</button>
        <div class="tag-kopf">
          <div class="badge">${tag}</div>
          <h2>${titel}</h2>
          <div class="datum">${tag} décembre</div>
        </div>

        ${data.hinweis1 && data.hinweis1.trim() ? blockHtml("1er indice", data.hinweis1, "💡", "") : ""}
        ${data.hinweis2 && data.hinweis2.trim() ? blockHtml("2e indice", data.hinweis2, "💡", "") : ""}
        ${blockHtml("Solution", data.loesung, "🗝️", "loesung")}
      </div>`;

    // Aufklapp-Verhalten
    view.querySelectorAll(".reveal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.parentElement.classList.toggle("aktiv");
      });
    });
    window.scrollTo(0, 0);
  }

  function blockHtml(label, inhalt, icon, extra) {
    return `
      <div class="reveal ${extra}">
        <button class="reveal-btn">
          <span>${icon}&nbsp;&nbsp;${label}</span>
          <span class="chev">›</span>
        </button>
        <div class="reveal-body"><div class="inhalt">${inhalt || ""}</div></div>
      </div>`;
  }

  // --- Routing -------------------------------------------------------
  function route() {
    const h = location.hash;
    const m = h.match(/#\/tag\/(\d+)/);
    if (m) {
      const tag = parseInt(m[1], 10);
      if (tag >= 1 && tag <= 24) { renderTag(tag); return; }
    }
    renderUebersicht();
  }

  window.addEventListener("hashchange", route);
  route();

  // --- PWA: Service Worker registrieren -----------------------------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }

  // --- Installations-Tipp (nur iOS Safari, einmal) ------------------
  try {
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.navigator.standalone === true;
    if (isIos && !standalone && !localStorage.getItem("installTipWeg")) {
      const tip = document.getElementById("installTip");
      tip.classList.add("show");
      tip.querySelector(".close").addEventListener("click", () => {
        localStorage.setItem("installTipWeg", "1");
      });
    }
  } catch (e) {}

})();
