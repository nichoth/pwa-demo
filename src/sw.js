var cacheName = 'hello-pwa';
var filesToCache = [
  // This is so the browser caches index.html even if the user doesn’t
  // directly type in that file name.
  '/',
  '/index.html',
  '/style.css',
  '/bundle.js',
  '/coffee1.jpg',
  '/favicon.ico'
];

// Next, we add a function to install the service worker and create the
// browser cache using `cacheName`

/* Start the service worker and cache all of the app's content */
//  it's only called once per service worker
self.addEventListener('install', function (ev) {
    console.log('**install**', ev)
    ev.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (ev) {
    console.log('**fetch**', ev)

    //  Then we attach respondWith() to prevent the browser's default
    //  response. Instead it returns a promise because the fetch action
    //  can take time to finish.
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

// ------------------------------------------------------

import {ExpirationPlugin} from 'workbox-expiration';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

// Cache Google Fonts with a stale-while-revalidate strategy, with
// a maximum number of entries.
registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' ||
               url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        new ExpirationPlugin({maxEntries: 20}),
      ],
    }),
);

