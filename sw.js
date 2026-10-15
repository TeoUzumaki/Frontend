// Only handles requests under /Gym/; never removes caches belonging to your other pages.
const CACHE = 'form-gym-v2';
const CORE = ['/Gym/','/Gym/index.html','/Gym/manifest.webmanifest','/Gym/icons/icon-180.png','/Gym/icons/icon-192.png','/Gym/icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('form-gym-') && key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/Gym/')) return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) {const copy=response.clone(); caches.open(CACHE).then(cache => cache.put(req,copy));}
    return response;
  })));
});
