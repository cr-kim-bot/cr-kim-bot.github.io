import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShellPageCard } from "@/components/page/DocsShellPageCard";
import { DocumentSectionPageCard } from "@/components/page/DocumentSectionPageCard";
import { PostRoutePageCard } from "@/components/page/PostRoutePageCard";
import { withCategoryDetails } from "@/entities/category/model/categories";
import {
  getAllDocumentSections,
  getAllPosts,
  getDocumentSectionByRouteSegments,
  getPostByRouteSegments,
  getPostNavigationTree,
} from "@/entities/post/model/posts";

type DocsPostPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return [
    ...getAllDocumentSections().map((section) => ({
      slug: section.routeSegments,
    })),
    ...getAllPosts().map((post) => ({ slug: post.routeSegments })),
  ];
}

export async function generateMetadata({
  params,
}: DocsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getDocumentSectionByRouteSegments(slug);

  if (section) {
    return {
      title: section.title,
      description: section.description,
    };
  }

  const post = getPostByRouteSegments(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: post.canonicalUrl
      ? { canonical: post.canonicalUrl }
      : undefined,
  };
}

export default async function DocsPostPage({ params }: DocsPostPageProps) {
  const { slug } = await params;
  const section = getDocumentSectionByRouteSegments(slug);

  if (section) {
    return (
      <DocsShellPageCard
        activeRouteSegments={slug}
        navigationItems={getPostNavigationTree()}
      >
        <DocumentSectionPageCard section={section} />
      </DocsShellPageCard>
    );
  }

  const post = getPostByRouteSegments(slug);

  if (!post) {
    notFound();
  }

  const posts = getAllPosts();
  const index = posts.findIndex((candidate) => candidate.slug === post.slug);
  const previousPost = posts[index + 1];
  const nextPost = posts[index - 1];
  const categorizedPost = withCategoryDetails(post);

  return (
    <DocsShellPageCard
      activeRouteSegments={slug}
      navigationItems={getPostNavigationTree()}
    >
      <PostRoutePageCard
        categorizedPost={categorizedPost}
        nextPost={nextPost}
        post={post}
        previousPost={previousPost}
      />
    </DocsShellPageCard>
  );
}
