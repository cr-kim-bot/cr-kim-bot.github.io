import { PostListItem } from "@/components/post/post-list-item";
import type {
  CategorizedPostSummary,
  Category,
} from "@/entities/category/model/categories";

type CategoryPageCardProps = {
  category: Category;
  posts: CategorizedPostSummary[];
};

export function CategoryPageCard({ category, posts }: CategoryPageCardProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-16">
      <div className="mb-10">
        <p className="mb-3 font-mono text-subdued text-xs uppercase tracking-[0.18em]">
          Category
        </p>
        <h1 className="text-3xl font-semibold text-foreground">
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl text-dim text-sm leading-7">
          {category.description}
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
