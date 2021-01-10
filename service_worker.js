import {registerRoute} from 'workbox-routing';
import {CacheFirst, NetworkFirst, StaleWhileRevalidate,} from 'workbox-strategies';

// Used for filtering matches based on status code, header, or both
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import {ExpirationPlugin} from 'workbox-expiration';
import {RangeRequestsPlugin} from 'workbox-range-requests';
import {precacheAndRoute} from 'workbox-precaching';

/* global self, workbox, precacheManifest */
precacheAndRoute(precacheManifest);

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({request}) => request.mode === 'navigate',
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// In your service worker:
// It's up to you to either precache or explicitly call cache.add('movie.mp4')
// to populate the cache.
//
// This route will go against the network if there isn't a cache match,
// but it won't populate the cache at runtime.
// If there is a cache match, then it will properly serve partial responses.
registerRoute(
  ({url}) => url.pathname.endsWith('.mp4'),
  new NetworkFirst({
    cacheName: 'mp4-cache',
    plugins: [
      new CacheableResponsePlugin({statuses: [200]}),
      new RangeRequestsPlugin(),
    ],
  }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({request}) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({request, url}) => request.destination === 'image' && !url.pathname.endsWith('.mp4'),
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);

