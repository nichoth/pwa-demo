var cacheName = 'hello-pwa';
var filesToCache = [
  // This is so the browser caches index.html even if the user doesn’t
  // directly type in that file name.
  '/',
  '/index.html',
  '/style.css',
  '/bundle.js'
];

// Next, we add a function to install the service worker and create the
// browser cache using `cacheName`

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    console.log('**install**', e)
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    console.log('**fetch**', e)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

