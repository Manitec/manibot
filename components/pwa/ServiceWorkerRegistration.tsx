"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js on mount (client-only).
 * Silently skips if the browser doesn't support service workers.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        console.log("[ManiBot SW] Registered:", reg.scope);
      })
      .catch((err) => {
        console.warn("[ManiBot SW] Registration failed:", err);
      });
  }, []);

  return null;
}
