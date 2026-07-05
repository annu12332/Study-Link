const CACHE_NAME = 'studylink-cache-v1';

// Install Event
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Fetch Event - Fixing the "Failed to convert value to Response" error
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Network fail hole jeno error na dey, tai cache theke khuje dekha
            return caches.match(event.request);
        })
    );
});