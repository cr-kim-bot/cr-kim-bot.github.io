import { getAllPosts, type PostSummary } from "@/entities/post/model/posts";

export type Category = {
  key: string;
  name: string;
  description: string;
  colorClass: string;
};

export type CategorizedPostSummary = PostSummary & {
  categoryDetails: Category[];
};

export const categories = [
  {
    key: "typescript",
    name: "TypeScript",
    description: "타입 시스템, 언어 설계, 실전 패턴 기록입니다.",
    colorClass: "bg-tag-typescript-bg text-tag-typescript-text",
  },
  {
    key: "react",
    name: "React",
    description: "React와 UI 아키텍처 기록입니다.",
    colorClass: "bg-tag-react-bg text-tag-react-text",
  },
  {
    key: "nextjs",
    name: "Next.js",
    description:
      "Next.js, Static Publication, 라우팅과 렌더링 전략 기록입니다.",
    colorClass: "bg-tag-system-design-bg text-tag-system-design-text",
  },
  {
    key: "craft",
    name: "Craft",
    description: "개발자로 일하고 생각을 다듬는 방식에 대한 기록입니다.",
    colorClass: "bg-tag-craft-bg text-tag-craft-text",
  },
] satisfies Category[];

const categoryMap = new Map(
  categories.map((category) => [category.key, category]),
);

export function getCategory(key: string) {
  return categoryMap.get(key);
}

export function getCategoryOrFallback(key: string): Category {
  return (
    getCategory(key) ?? {
      key,
      name: key,
      description: "아직 정의되지 않은 Category입니다.",
      colorClass: "bg-muted text-icon",
    }
  );
}

export function withCategoryDetails(post: PostSummary): CategorizedPostSummary {
  return {
    ...post,
    categoryDetails: post.categories.map(getCategoryOrFallback),
  };
}

export function getPostsByCategory(categoryKey: string) {
  return getAllPosts()
    .filter((post) => post.categories.includes(categoryKey))
    .map(withCategoryDetails);
}

export function getUsedCategories() {
  const usedKeys = new Set(getAllPosts().flatMap((post) => post.categories));
  return categories.filter((category) => usedKeys.has(category.key));
}
