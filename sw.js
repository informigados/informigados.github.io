const CACHE_NAME = 'informigados-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './br/index.html',
    './es/index.html',
    './fr/index.html',
    './pt/index.html',
    './assets/img/logo-white.svg',
    './assets/img/flags/br.png',
    './assets/img/flags/us.png',
    './assets/img/flags/es.png',
    './assets/img/flags/fr.png',
    './assets/img/flags/pt.png',
    './assets/img/favicon.svg',
    './assets/img/logo-white.png'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activation and cleanup of old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Request interception (Cache First Strategy)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
