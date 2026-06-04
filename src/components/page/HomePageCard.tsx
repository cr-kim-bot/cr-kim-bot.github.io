import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero/HeroSection";
import { CategoryRow } from "@/components/post/category-row";
import { PostListItem } from "@/components/post/post-list-item";
import { withCategoryDetails } from "@/entities/category/model/categories";
import type { PostSummary } from "@/entities/post/model/posts";
import { formatPostDate } from "@/entities/post/model/posts";

type HomePageCardProps = {
  featuredPost?: PostSummary;
  recentPosts: PostSummary[];
};

export function HomePageCard({ featuredPost, recentPosts }: HomePageCardProps) {
  return (
    <div className="mx-auto w-full px-5">
      <div className="py-10">
        <HeroSection
          id={"about"}
          status={"available for work"}
          title={"Writing about code,"}
          highlightedTitle={"craft & clarity."}
          description={
            "A developer's notebook on software engineering, system design, and the quiet art of building things that last. No noise - just signal."
          }
          primaryAction={{ href: "docs", label: "Read the Docs" }}
          secondaryAction={{ href: "about", label: "About me" }}
        />
      </div>

      {featuredPost ? (
        <section className="pb-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
                Featured
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                먼저 읽을 글
              </h2>
            </div>
            <Link
              className="hidden items-center gap-1.5 text-dim text-sm transition-colors hover:text-foreground sm:inline-flex"
              href="/docs"
            >
              모든 글 보기 <ArrowUpRight size={14} />
            </Link>
          </div>

          <article className="rounded-2xl border border-border bg-surface-card p-6 transition-all hover:border-ring hover:bg-surface-card-hover">
            <Link
              className="transition-colors hover:text-icon"
              href={featuredPost.routePath}
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CategoryRow
                  categories={withCategoryDetails(featuredPost).categoryDetails}
                />
                <span className="font-mono text-dim text-xs">
                  {formatPostDate(featuredPost.date)}
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-foreground">
                {featuredPost.title}
              </h3>
              <p className="max-w-3xl text-dim text-sm leading-7">
                {featuredPost.description}
              </p>
            </Link>
          </article>
        </section>
      ) : null}

      <section className="pb-24">
        <div className="mb-8">
          <p className="mb-2 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
            Recent
          </p>
          <h2 className="text-2xl font-semibold text-foreground">최근 글</h2>
        </div>
        <div className="divide-y divide-border-subtle">
          {recentPosts.slice(0, 5).map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
