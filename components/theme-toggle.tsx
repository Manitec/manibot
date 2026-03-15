"use client";

import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("manibot_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("manibot_theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="text-lg hover:scale-110 transition-transform duration-150"
      title="Toggle dark/light mode"
      aria-label="Toggle dark/light mode"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};
