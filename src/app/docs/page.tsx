import type { Metadata } from "next";
import { DocsShellPageCard } from "@/components/page/DocsShellPageCard";
import { PostsArchivePageCard } from "@/components/page/PostsArchivePageCard";
import {
  getAllPosts,
  getPostNavigationTree,
} from "@/entities/post/model/posts";

export const metadata: Metadata = {
  title: "Docs",
  description: "모든 MDX Post를 docs-style hierarchy로 모아둔 페이지입니다.",
};

export default function DocsPage() {
  const posts = getAllPosts();

  return (
    <DocsShellPageCard
      activeRouteSegments={[]}
      navigationItems={getPostNavigationTree()}
    >
      <PostsArchivePageCard posts={posts} />
    </DocsShellPageCard>
  );
}
