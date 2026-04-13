# PWA Setup — ManiBot

ManiBot supports installation as a Progressive Web App (PWA) on Chrome, Edge, and mobile browsers.

## What was added

| File | Purpose |
|------|--------|
| `public/manifest.webmanifest` | App identity, icons, display mode for browser install |
| `public/sw.js` | Service worker — caches app shell, bypasses API routes |
| `public/offline.html` | Shown when user is offline and tries to navigate |
| `components/pwa/ServiceWorkerRegistration.tsx` | Client component that registers the SW on mount |
| `app/layout.tsx` | Updated to include manifest link, viewport, and apple-web-app meta |
| `middleware.ts` | Updated matcher to exclude `/sw.js`, `/manifest.webmanifest`, `/icons`, `/offline.html` |
| `next.config.ts` | Added no-cache headers for `sw.js` so updates propagate immediately |

## Icons still needed

You need to add real icon files at:
- `public/icons/icon-192.png` — 192×192px
- `public/icons/icon-512.png` — 512×512px
- `public/icons/screenshot-wide.png` — 1280×720px (optional, for store listings)
- `public/icons/screenshot-narrow.png` — 390×844px (optional)

Until real icons are added, the app is still installable but will use the browser default icon.

## Caching strategy

The service worker uses **network-first with offline fallback**:
- `/api/*` routes are **never cached** (live AI responses, auth)
- `/_next/static/*` assets are **cache-first** (JS, CSS bundles)
- Navigation requests fall back to `offline.html` when offline
- App shell pages (`/`, `/login`) are pre-cached on SW install

## Testing installation

1. Deploy to Vercel (HTTPS required)
2. Open in Chrome or Edge
3. Look for the install icon (⊕) in the address bar
4. Or: Chrome menu → "Install ManiBot"
5. Test offline behavior via DevTools → Network → Offline
