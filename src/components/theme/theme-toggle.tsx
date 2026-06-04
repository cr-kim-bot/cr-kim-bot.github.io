"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import type { Theme } from "@/hooks/use-theme";
import { useTheme } from "@/hooks/use-theme";

const CYCLE: Theme[] = ["light", "dark", "system"];
const ICONS: Record<Theme, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = ICONS[theme];

  const handleClick = () => {
    const currentIndex = CYCLE.indexOf(theme);
    const nextIndex = (currentIndex + 1) % CYCLE.length;
    const next = CYCLE[nextIndex] ?? "system";
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={"change theme"}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Icon size={16} />
    </button>
  );
}
