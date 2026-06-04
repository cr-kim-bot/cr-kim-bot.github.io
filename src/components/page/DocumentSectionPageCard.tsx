import { ArrowUpRight, FolderTree } from "lucide-react";
import Link from "next/link";
import { PostContent } from "@/components/post/post-content";
import type {
  DocumentSection,
  DocumentSectionSummary,
} from "@/entities/post/model/posts";
import { PostListItem } from "../post/post-list-item";

type DocumentSectionPageCardProps = {
  section: DocumentSection;
};

function SectionListItem({ section }: { section: DocumentSectionSummary }) {
  return (
    <article className="-mx-3 flex flex-col gap-3 rounded-xl px-3 py-5 transition-colors hover:bg-surface-subtle sm:flex-row sm:items-start sm:gap-6">
      <span className="flex shrink-0 items-center gap-2 font-mono text-dim text-xs sm:w-24">
        <FolderTree aria-hidden="true" size={14} />
        Section
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 font-semibold text-foreground text-sm leading-snug">
          <Link
            className="transition-colors hover:text-icon"
            href={section.routePath}
          >
            {section.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-dim text-sm leading-relaxed">
          {section.description}
        </p>
      </div>
      <Link
        aria-label={`${section.title} 섹션 보기`}
        className="mt-0.5 hidden shrink-0 text-muted transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-icon sm:block"
        href={section.routePath}
      >
        <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}

export function DocumentSectionPageCard({
  section,
}: DocumentSectionPageCardProps) {
  const hasContents =
    section.childSections.length > 0 || section.posts.length > 0;

  return (
    <div className="w-full px-0 py-10 lg:px-5 lg:py-16">
      <header className="mb-10">
        <p className="mb-3 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
          Docs
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {section.title}
        </h1>
        <p className="mt-4 max-w-3xl text-dim text-sm leading-7">
          {section.description}
        </p>
      </header>

      {section.content.trim().length > 0 ? (
        <div className="prose mb-12">
          <PostContent code={section.code} />
        </div>
      ) : null}

      {hasContents ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">콘텐츠</h2>
          <div className="divide-y divide-border-subtle">
            {section.childSections.map((childSection) => (
              <SectionListItem
                key={childSection.routePath}
                section={childSection}
              />
            ))}
            {section.posts.map((post) => (
              <PostListItem key={post.routePath} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
