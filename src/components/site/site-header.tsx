import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-border-subtle border-b bg-surface-overlay backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
        <Link
          className="flex items-center gap-2 font-semibold text-sm"
          href="/"
        >
          <span className="grid size-7 place-items-center rounded-lg border border-border bg-surface-inset font-mono text-icon text-xs">
            cr
          </span>
          <span>Developer Blog</span>
        </Link>
        <nav
          className="flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              className="rounded-lg px-3 py-2 text-dim text-sm transition-colors hover:bg-surface-subtle hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
