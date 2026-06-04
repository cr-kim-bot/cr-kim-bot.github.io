import type { PostTocItem } from "@/entities/post/model/toc";

type PostTocProps = {
  items: PostTocItem[];
};

export function PostToc({ items }: PostTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-56 overflow-auto pl-8 lg:block">
      <p className="mb-3 font-mono text-dim text-xs">On this page</p>
      <nav aria-label="Post table of contents" className="space-y-2">
        {items.map((item) => (
          <a
            className={`block truncate text-dim text-sm transition-colors hover:text-foreground ${
              item.level === 3 ? "pl-4" : ""
            }`}
            href={`#${item.id}`}
            key={item.id}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
