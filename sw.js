// Hooper's Path service worker - network-first for HTML, cache-first for assets
const CACHE_NAME = 'hoopers-path-v26';
const ASSETS = [
  './',
  './index.html',
  './drills-data.js',
  './diagrams.js',
  './firebase-config.js',
  './feature-flags.js',
  './auth.js',
  './sync.js',
  './manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Never touch Firebase / Apple / Google endpoints — always go to network
  if (url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebase.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('apple.com') ||
      url.hostname.includes('appleid.apple.com')) {
    return;
  }

  if (url.origin !== location.origin) return;

  // NETWORK-FIRST for HTML files (so refreshes always pick up new versions)
  // If network fails, fall back to cache (for offline)
  const isHTML = e.request.mode === 'navigate' ||
                 url.pathname.endsWith('/') ||
                 url.pathname.endsWith('.html');

  if (isHTML) {
    e.respondWith(
      fetch(e.request).then(response => {
        // Update cache with fresh copy in the background
        const copy = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return response;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // CACHE-FIRST for other assets (JS, images, etc.) — fast and offline-capable
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
