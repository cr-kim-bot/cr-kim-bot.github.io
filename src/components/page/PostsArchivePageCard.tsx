import { PostListItem } from "@/components/post/post-list-item";
import type { PostSummary } from "@/entities/post/model/posts";

type PostsArchivePageCardProps = {
  posts: PostSummary[];
};

export function PostsArchivePageCard({ posts }: PostsArchivePageCardProps) {
  return (
    <div className="w-full px-0 py-10 lg:px-5 lg:py-16">
      <div className="mb-10">
        <p className="mb-3 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
          Archive
        </p>
        <h1 className="text-3xl font-semibold text-foreground">모든 글</h1>
        <p className="mt-3 max-w-2xl text-dim text-sm leading-7">
          최신순으로 정리한 개발 기록입니다. 검색은 아직 두지 않고 Category
          Browsing으로 흐름을 따라갑니다.
        </p>
      </div>
      <div className="divide-y divide-border-subtle">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
