type StatusIndicatorProps = {
  label: string;
};

export function StatusIndicator({ label }: StatusIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 self-start">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-xs text-dim font-mono tracking-wide">{label}</span>
    </div>
  );
}
