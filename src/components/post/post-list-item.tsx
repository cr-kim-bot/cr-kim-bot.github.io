import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { withCategoryDetails } from "@/entities/category/model/categories";
import type { PostSummary } from "@/entities/post/model/posts";
import { formatPostDate } from "@/entities/post/model/posts";
import { CategoryRow } from "./category-row";

type PostListItemProps = {
  post: PostSummary;
};

export function PostListItem({ post }: PostListItemProps) {
  const categorizedPost = withCategoryDetails(post);

  return (
    <Link className="transition-colors hover:text-icon" href={post.routePath}>
      <article className="flex flex-col gap-3 rounded-xl px-3 py-5 transition-colors hover:bg-surface-subtle sm:flex-row sm:items-start sm:gap-6">
        <span className="shrink-0 font-mono text-dim text-xs sm:w-24">
          {formatPostDate(post.date)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1">
            <CategoryRow categories={categorizedPost.categoryDetails} />
          </div>
          <h3 className="mb-1 font-semibold text-foreground text-sm leading-snug">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-dim text-sm leading-relaxed">
            {post.description}
          </p>
        </div>
        <span className="mt-0.5 hidden shrink-0 text-muted transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-icon sm:block">
          <ArrowUpRight aria-hidden="true" size={16} />
        </span>
      </article>
    </Link>
  );
}
