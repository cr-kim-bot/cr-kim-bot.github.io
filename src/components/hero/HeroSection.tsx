import { type HeroAction, HeroActions } from "@/components/hero/HeroActions";
import { StatusIndicator } from "@/components/hero/StatusIndicator";

export type HeroSectionProps = {
  id: string;
  status: string;
  title: string;
  highlightedTitle: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
};

export function HeroSection({
  id,
  status,
  title,
  highlightedTitle,
  description,
  primaryAction,
  secondaryAction,
}: HeroSectionProps) {
  return (
    <section id={id} className="w-full flex flex-col justify-center">
      <div className="mb-8">
        <StatusIndicator label={status} />
      </div>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] text-balance mb-6">
        {title}
        <br />
        <span className="text-subdued">{highlightedTitle}</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 text-pretty">
        {description}
      </p>
      <HeroActions
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
    </section>
  );
}
