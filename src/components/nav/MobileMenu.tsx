"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

type MobileNavigationProps = {
  buttonLabel: string;
  children: React.ReactNode;
  trailingSlot?: React.ReactNode;
};

export function MobileMenu({
  buttonLabel,
  children,
  trailingSlot,
}: MobileNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      {trailingSlot}
      <button
        type="button"
        className="text-icon hover:text-foreground transition-colors"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={buttonLabel}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <nav className="absolute top-full left-0 right-0 mx-0 mt-2 rounded-2xl border border-border-subtle bg-surface-overlay-strong backdrop-blur-sm px-5 py-4 flex flex-col gap-3">
          {children}
        </nav>
      )}
    </div>
  );
}
