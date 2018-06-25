var cacheName = 'my-cache-v1';
var cacheFiles = [
  './',
  '/index.html',
  '/restaurant.html',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/css/styles.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/small_1.jpg',
  '/img/small_2.jpg',
  '/img/small_3.jpg',
  '/img/small_4.jpg',
  '/img/small_5.jpg',
  '/img/small_6.jpg',
  '/img/small_7.jpg',
  '/img/small_8.jpg',
  '/img/small_9.jpg',
  '/img/small_10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching files');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetching ', event.request.url);
  event.respondWith(caches.match(event.request).then(function(response) {

    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();

        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match(event.request);
      });
    }
  }));
});
