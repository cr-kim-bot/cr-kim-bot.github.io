import type { ReactNode } from "react";
import { PostsDirectorySidebar } from "@/components/post/posts-directory-sidebar";
import type { PostNavigationItem } from "@/entities/post/model/posts";

type DocsShellPageCardProps = {
  activeRouteSegments: string[];
  children: ReactNode;
  navigationItems: PostNavigationItem[];
};

export function DocsShellPageCard({
  activeRouteSegments,
  children,
  navigationItems,
}: DocsShellPageCardProps) {
  return (
    <div className="flex w-full flex-col gap-6 pt-4 pb-12 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:pt-0 lg:pb-0">
      <PostsDirectorySidebar
        activeRouteSegments={activeRouteSegments}
        items={navigationItems}
      />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
