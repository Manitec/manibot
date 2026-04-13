// ManiBot Service Worker
// Strategy: Cache-first for static shell assets, network-first for everything else.
// Chat API routes are NEVER cached — always live.

const CACHE_NAME = 'manibot-shell-v1';

// Static assets to pre-cache on install (app shell)
const SHELL_ASSETS = [
  '/',
  '/login',
  '/offline.html',
  '/manifest.webmanifest',
];

// Routes that must NEVER be served from cache
const BYPASS_PATTERNS = [
  /^\/api\//,          // All API routes (chat, login, etc.)
  /\/_next\/data\//,  // Next.js server data
];

// ─── Install: pre-cache the app shell ───────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

// ─── Activate: clean up old caches ──────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch: network-first with offline fallback ──────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Bypass cache entirely for API routes and Next.js data
  const shouldBypass = BYPASS_PATTERNS.some((pattern) =>
    pattern.test(url.pathname)
  );
  if (shouldBypass) return;

  // For navigation requests: network-first, fall back to /offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() =>
          caches.match('/offline.html').then(
            (cached) => cached || new Response('Offline', { status: 503 })
          )
        )
    );
    return;
  }

  // For static Next.js assets (_next/static): cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }

  // Default: network-first
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
