import Link from "next/link";

export type BrandMarkProps = {
  href: string;
  label: string;
};

export function BrandMark({ href, label }: BrandMarkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold tracking-tight text-foreground font-mono"
    >
      {label}
    </Link>
  );
}
