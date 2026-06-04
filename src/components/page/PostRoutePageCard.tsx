import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryRow } from "@/components/post/category-row";
import { PostContent } from "@/components/post/post-content";
import { PostToc } from "@/components/post/post-toc";
import type { CategorizedPostSummary } from "@/entities/category/model/categories";
import type { Post, PostSummary } from "@/entities/post/model/posts";
import { formatPostDate } from "@/entities/post/model/posts";
import { extractPostToc } from "@/entities/post/model/toc";

type PostRoutePageCardProps = {
  post: Post;
  categorizedPost: CategorizedPostSummary;
  previousPost?: PostSummary;
  nextPost?: PostSummary;
};

export async function PostRoutePageCard({
  post,
  categorizedPost,
  previousPost,
  nextPost,
}: PostRoutePageCardProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-10 px-0 py-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:px-5 lg:py-14">
      <article className="min-w-0">
        <header className="mb-10">
          <div className="mb-5">
            <CategoryRow categories={categorizedPost.categoryDetails} />
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-dim leading-8">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 font-mono text-dim text-xs">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updated ? (
              <span>Updated {formatPostDate(post.updated)}</span>
            ) : null}
          </div>
        </header>

        <div className="prose">
          <PostContent code={post.code} />
        </div>

        <nav className="mt-14 grid gap-3 border-border-subtle border-t pt-8 sm:grid-cols-2">
          {previousPost ? (
            <Link className="post-nav-link" href={previousPost.routePath}>
              <ArrowLeft size={16} />
              <span>
                <span className="post-nav-kicker">이전 글</span>
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextPost ? (
            <Link
              className="post-nav-link justify-end text-right"
              href={nextPost.routePath}
            >
              <span>
                <span className="post-nav-kicker">다음 글</span>
                {nextPost.title}
              </span>
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </nav>
      </article>
      <PostToc items={extractPostToc(post.content)} />
    </div>
  );
}
