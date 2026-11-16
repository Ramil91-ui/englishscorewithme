// EnglishScore & IELTS GoPrep Platform - Professional Offline PWA Service Worker
const CACHE_NAME = 'englishscore-goprep-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/vocabulary_data.js',
  '/icon-192.png',
  '/icon-512.png',
  '/screenshot-mobile.png',
  '/screenshot-desktop.png',
  'https://cdn.tailwindcss.com/3.4.17',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap',
  'https://telegram.org/js/telegram-web-app.js'
];

// Install: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use catch for individual items so one failing external CDN request won't break the whole install
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => {
          return fetch(url, { mode: 'no-cors' })
            .then((res) => cache.put(url, res))
            .catch((err) => console.warn('Pre-cache item skipped:', url, err));
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-First with Cache Fallback for Pages, Cache-First for Assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Navigation requests (HTML pages) -> Network first, fallback to cached root '/'
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', resClone));
          return networkRes;
        })
        .catch(() => {
          return caches.match('/') || caches.match('/index.html');
        })
    );
    return;
  }

  // 2. API requests -> Try network, fallback to offline JSON response
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(req).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            status: 'offline',
            message: "Hozir offline rejimdasiz. Internet paydo bo'lganda serverga avtomatik ulanadi."
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // 3. Static Assets (CSS, JS, Fonts, Icons) -> Cache-First, then Network Update (Stale-While-Revalidate)
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        // Fetch in background to update cache for next time
        fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
            }
          })
          .catch(() => {});
        return cachedRes;
      }

      // If not in cache, fetch and store
      return fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => {
          // Fallback for images if offline
          if (req.destination === 'image') {
            return caches.match('/icon-192.png');
          }
        });
    })
  );
});
