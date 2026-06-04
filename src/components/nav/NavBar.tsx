import { BrandMark } from "@/components/nav/BrandMark";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavMenuItem } from "@/components/nav/NavMenuItem";
import { cn } from "@/lib/utils";

export type SiteNavbarProps = {
  brand: { href: string; label: string };
  menuItems: NavMenuItem[];
  mobileButtonLabel?: string;
  className?: string;
  trailingSlot?: React.ReactNode;
};

export function SiteNavbar({
  brand,
  menuItems,
  mobileButtonLabel = "메뉴",
  className,
  trailingSlot,
}: SiteNavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-5 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-center justify-between bg-surface-overlay backdrop-blur-sm border border-border-subtle rounded-2xl px-5 py-3">
        <BrandMark href={brand.href} label={brand.label} />

        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <NavMenuItem key={item.href} item={item} />
          ))}
          {trailingSlot}
        </nav>

        <MobileMenu buttonLabel={mobileButtonLabel} trailingSlot={trailingSlot}>
          {menuItems.map((item) => (
            <NavMenuItem key={item.href} item={item} forMobile />
          ))}
        </MobileMenu>
      </div>
    </header>
  );
}
