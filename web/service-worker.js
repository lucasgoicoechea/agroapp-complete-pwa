self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Basic network-first strategy for API calls (could be expanded)
  event.respondWith(fetch(event.request).catch(function() {
    return caches.match(event.request);
  }));
});
