"use client";

import type { ReactNode } from "react";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

const VALID_THEMES: Theme[] = ["light", "dark", "system"];

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme): void {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  if (theme === "system") {
    localStorage.removeItem("theme");
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API는 Firefox/Safari 미지원으로 SSR 테마 감지가 불가하여 document.cookie 직접 사용
    document.cookie = "theme=; path=/; max-age=0; SameSite=Lax";
  } else {
    localStorage.setItem("theme", theme);
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API는 Firefox/Safari 미지원으로 SSR 테마 감지가 불가하여 document.cookie 직접 사용
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem("theme");
    return VALID_THEMES.includes(stored as Theme)
      ? (stored as Theme)
      : "system";
  } catch {
    return "system";
  }
}

function getInitialTheme(initialTheme?: Theme): Theme {
  return initialTheme ?? "system";
}

function getInitialResolvedTheme(initialTheme?: Theme): "light" | "dark" {
  return initialTheme === "light" || initialTheme === "dark"
    ? initialTheme
    : "light";
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const initialClientSafeTheme = useMemo(
    () => getInitialTheme(initialTheme),
    [initialTheme],
  );
  const initialClientSafeResolvedTheme = useMemo(
    () => getInitialResolvedTheme(initialTheme),
    [initialTheme],
  );
  const [theme, setThemeState] = useState<Theme>(initialClientSafeTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    () => initialClientSafeResolvedTheme,
  );

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setResolvedTheme(resolveTheme(next));
    applyTheme(next);
  }, []);

  useEffect(() => {
    const storedTheme = initialTheme ?? getStoredTheme();
    setThemeState(storedTheme);
    setResolvedTheme(resolveTheme(storedTheme));
    applyTheme(storedTheme);
  }, [initialTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const isDark = mq.matches;
      document.documentElement.classList.toggle("dark", isDark);
      setResolvedTheme(isDark ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme, resolvedTheme } },
    children,
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
