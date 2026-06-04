import Link from "next/link";

export type NavMenuItem = {
  href: string;
  label: string;
  variant?: NavMenuItemVariant;
};

type NavMenuItemVariant = "fill" | "outline" | "link";

const variantClassMap: Record<NavMenuItemVariant, string> = {
  link: "text-sm text-muted-foreground hover:text-foreground transition-colors",
  fill: "text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-lg font-medium hover:bg-primary-hover transition-colors",
  outline:
    "text-sm border border-border-strong text-icon px-4 py-1.5 rounded-lg font-medium hover:border-ring transition-colors",
};

export function NavMenuItem({
  item,
  forMobile = false,
}: {
  item: NavMenuItem;
  forMobile?: boolean;
}) {
  const variant = forMobile ? "link" : (item.variant ?? "link");
  const className = variantClassMap[variant];
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}
