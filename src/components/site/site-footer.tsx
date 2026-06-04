export function SiteFooter() {
  return (
    <footer className="border-border-subtle border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-10 text-dim text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>개발하며 배운 것들을 MDX Post로 기록합니다.</p>
        <p className="font-mono text-xs">Static Publication on GitHub Pages</p>
      </div>
    </footer>
  );
}
