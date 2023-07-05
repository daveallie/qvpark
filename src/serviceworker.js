const cachePrefix = 'pwa-qvpark';
const version = '1.3.0';

const cacheName = `${cachePrefix}-${version}`;

const urlsToCache = ['/', 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js'];
self.addEventListener('install', async (event) => {
  await self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((cacheNames) => cacheNames.filter((cn) => cn !== cacheName))
      .then(cachesToDelete => Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))))
      .then(() => self.clients.claim())
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
