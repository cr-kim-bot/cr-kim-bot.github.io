import type { Category } from "@/entities/category/model/categories";

type CategoryBadgeProps = {
  category: Category;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-md px-2 py-0.5 font-mono text-xs ${category.colorClass}`}
    >
      {category.name}
    </span>
  );
}
