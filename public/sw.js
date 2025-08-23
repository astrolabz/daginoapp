// Service Worker for Ristorante Da Gino PWA
// Note: bump CACHE_VERSION to invalidate old caches when deploying breaking updates
const CACHE_VERSION = 'v5';
const CACHE_NAME = `da-gino-${CACHE_VERSION}`;
const OFFLINE_URL = '/';

// List of resources to cache for offline access
const CACHE_URLS = [
  // Do NOT pre-cache '/': it causes stale index.html issues. Let the browser/network fetch it fresh.
  // Avoid caching manifest.json to ensure the latest is always fetched by the browser.
  // Add other core, version-agnostic assets here if needed (icons, etc.)
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching core resources');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) return;

  const acceptHeader = event.request.headers.get('accept') || '';
  const isHTMLNavigation = event.request.mode === 'navigate' || acceptHeader.includes('text/html');

  if (isHTMLNavigation) {
    // Network-first for HTML to avoid stale index.html
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Optionally cache a copy for offline usage
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy).catch(() => {}));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          // Fallback to previously cached OFFLINE_URL if available
          const offline = await caches.match(OFFLINE_URL);
          return offline || new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  // For non-HTML assets, use cache-first with background revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy).catch(() => {}));
          }
          return response;
        })
        .catch(() => cachedResponse); // if network fails, use cache if present

      // Return cache immediately if present, else wait for network
      return cachedResponse || networkFetch;
    })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});