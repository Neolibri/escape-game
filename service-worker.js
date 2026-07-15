/* PWA Service Worker – macht die App offline-fähig.
   Bei Inhaltsänderungen die CACHE-Version hochzählen (v1 -> v2 ...),
   damit Nutzer die neue Version bekommen. */

const CACHE = "adventskalender-v4";
const DATEIEN = [
  "./",
  "./index.html",
  "./styles.css",
  "./config.js",
  "./inhalte.js",
  "./app.js",
  "./manifest.json",
  "./schild.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
