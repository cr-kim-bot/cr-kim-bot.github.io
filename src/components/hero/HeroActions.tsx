import { ArrowDown } from "lucide-react";
import Link from "next/link";

export type HeroAction = {
  href: string;
  label: string;
};

type HeroActionsProps = {
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
};

export function HeroActions({
  primaryAction,
  secondaryAction,
}: HeroActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href={primaryAction.href}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors duration-200"
      >
        {primaryAction.label}
      </Link>
      <Link
        href={secondaryAction.href}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {secondaryAction.label}
        <ArrowDown size={14} />
      </Link>
    </div>
  );
}
