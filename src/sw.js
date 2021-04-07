var cacheName = 'hello-pwa';
var filesToCache = [
  // This is so the browser caches index.html even if the user doesn’t
  // directly type in that file name.
  '/',
  '/index.html',
  '/style.css',
  '/bundle.js',
  '/coffee1.jpg'
];

// Next, we add a function to install the service worker and create the
// browser cache using `cacheName`

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    console.log('**install**', e)
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (ev) {
    console.log('**fetch**', ev)

    ev.respondWith(
        caches.match(ev.request).then(function (response) {
            // console.log('**caches.match response**', response)
            if (ev.request.url.includes('offee')) {
                console.log('ooofff', ev.request)
            }
            console.log('**caches.match image coffee response**', response)
            if (response === undefined) {
                console.log('undefined cache response', ev.request)
            }
            return response || fetch(ev.request);
        })
    );
});

