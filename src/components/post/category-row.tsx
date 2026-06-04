import type { Category } from "@/entities/category/model/categories";
import { CategoryBadge } from "./category-badge";

type CategoryRowProps = {
  categories: Category[];
};

export function CategoryRow({ categories }: CategoryRowProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <CategoryBadge category={category} key={category.key} />
      ))}
    </div>
  );
}
