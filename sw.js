// Hooper's Path service worker - offline-first caching
const CACHE_NAME = 'hoopers-path-v15';
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

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Never cache Firebase / Google auth / Apple endpoints - always go to network
  if (url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebase.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('apple.com') ||
      url.hostname.includes('appleid.apple.com')) {
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
    );
  }
});
