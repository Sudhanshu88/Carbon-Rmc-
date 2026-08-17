// Carbon RMC — Service Worker v1.0
const CACHE_NAME = 'carbon-rmc-v1';
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/offices',
  '/contact',
  '/manifest.json',
  '/logo.jpg',
];

// ── Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Silently fail for individual assets
      });
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external URLs
  if (
    event.request.method !== 'GET' ||
    !event.request.url.startsWith(self.location.origin)
  ) return;

  // Skip API requests — always network
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/');
        });
      })
  );
});
