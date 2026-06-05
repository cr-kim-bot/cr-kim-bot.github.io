import { readFileSync } from "node:fs";
import { join } from "node:path";

// Dev-only: create a Turbopack dependency edge on the generated Velite output
// so that editing content triggers Fast Refresh (auto browser reload). Guarded
// by NODE_ENV so the static export build never pulls the JSON into its bundle —
// production stays on the readFileSync path below.
if (process.env.NODE_ENV !== "production") {
  void import("./velite-dev-watch");
}

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  categories: string[];
  updated?: string;
  tags?: string[];
  draft?: boolean;
  cover?: string;
  canonicalUrl?: string;
};

export type PostSummary = PostMetadata & {
  slug: string;
  routePath: string;
  routeSegments: string[];
};

export type Post = PostSummary & {
  code: string;
  content: string;
};

export type DocumentSectionSummary = {
  title: string;
  description: string;
  routePath: string;
  routeSegments: string[];
};

export type DocumentSection = DocumentSectionSummary & {
  childSections: DocumentSectionSummary[];
  code: string;
  content: string;
  posts: PostSummary[];
};

export type PostNavigationItem = {
  title: string;
  routePath: string;
  routeSegments: string[];
  type: "section" | "post";
  items: PostNavigationItem[];
};

type VelitePost = PostMetadata & {
  path: string;
  code: string;
  content: string;
};

type VeliteDocumentSection = {
  path: string;
  title: string;
  description: string;
  code: string;
  content: string;
};

const veliteOutputDirectory = join(
  /* turbopackIgnore: true */ process.cwd(),
  ".velite",
);

function loadVeliteCollection<T>(filename: string): T[] {
  try {
    return JSON.parse(
      readFileSync(join(veliteOutputDirectory, filename), "utf8"),
    ) as T[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function stripOrderPrefix(segment: string) {
  return segment.replace(/^\d+-/, "");
}

function removePostsPrefix(path: string) {
  return path.replace(/^posts\/?/, "");
}

function toRouteSegments(path: string) {
  return removePostsPrefix(path)
    .split("/")
    .filter(Boolean)
    .map(stripOrderPrefix);
}

function toRoutePath(routeSegments: string[]) {
  return routeSegments.length > 0
    ? `/docs/${routeSegments.join("/")}`
    : "/docs";
}

function toPostSummary(post: VelitePost): PostSummary {
  const routeSegments = toRouteSegments(post.path);

  return {
    slug: routeSegments.at(-1) ?? "",
    routePath: toRoutePath(routeSegments),
    routeSegments,
    title: post.title,
    description: post.description,
    date: post.date,
    categories: post.categories,
    ...(post.updated ? { updated: post.updated } : {}),
    ...(post.tags ? { tags: post.tags } : {}),
    ...(typeof post.draft === "boolean" ? { draft: post.draft } : {}),
    ...(post.cover ? { cover: post.cover } : {}),
    ...(post.canonicalUrl ? { canonicalUrl: post.canonicalUrl } : {}),
  };
}

function toPost(post: VelitePost): Post {
  return {
    ...toPostSummary(post),
    code: post.code,
    content: post.content,
  };
}

function toDocumentSectionSummary(
  section: VeliteDocumentSection,
): DocumentSectionSummary {
  const routeSegments = toRouteSegments(section.path);

  return {
    title: section.title,
    description: section.description,
    routePath: toRoutePath(routeSegments),
    routeSegments,
  };
}

function sameRouteSegments(left: string[], right: string[]) {
  return left.join("/") === right.join("/");
}

function parentRouteSegments(routeSegments: string[]) {
  return routeSegments.slice(0, -1);
}

function sortByRoutePath<T extends { routePath: string }>(items: T[]) {
  return items.toSorted((left, right) =>
    left.routePath.localeCompare(right.routePath),
  );
}

function getVelitePosts() {
  return loadVeliteCollection<VelitePost>("posts.json");
}

function getVeliteDocumentSections() {
  return loadVeliteCollection<VeliteDocumentSection>("documentSections.json");
}

export function getPostSlugs() {
  return getVelitePosts().map((post) => toPostSummary(post).slug);
}

export function getAllPosts({ includeDrafts = false } = {}): PostSummary[] {
  return getVelitePosts()
    .map(toPostSummary)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, { includeDrafts = false } = {}) {
  const post = getVelitePosts()
    .map(toPost)
    .find((candidate) => candidate.slug === slug);

  return post && (includeDrafts || !post.draft) ? post : undefined;
}

export function getAllDocumentSections() {
  return sortByRoutePath(
    getVeliteDocumentSections().map(toDocumentSectionSummary),
  );
}

export function getPostNavigationTree() {
  function getItems(routeSegments: string[]): PostNavigationItem[] {
    const childSections = getAllDocumentSections().filter((section) =>
      sameRouteSegments(
        parentRouteSegments(section.routeSegments),
        routeSegments,
      ),
    );
    const childPosts = sortByRoutePath(getAllPosts()).filter((post) =>
      sameRouteSegments(parentRouteSegments(post.routeSegments), routeSegments),
    );

    return [
      ...childSections.map((section): PostNavigationItem => {
        return {
          title: section.title,
          routePath: section.routePath,
          routeSegments: section.routeSegments,
          type: "section",
          items: getItems(section.routeSegments),
        };
      }),
      ...childPosts.map((post): PostNavigationItem => {
        return {
          title: post.title,
          routePath: post.routePath,
          routeSegments: post.routeSegments,
          type: "post",
          items: [],
        };
      }),
    ];
  }

  return getItems([]);
}

export function getDocumentSectionByRouteSegments(routeSegments: string[]) {
  const source = getVeliteDocumentSections().find((section) =>
    sameRouteSegments(toRouteSegments(section.path), routeSegments),
  );

  if (!source) {
    return undefined;
  }

  const section = toDocumentSectionSummary(source);
  const childSections = getAllDocumentSections().filter((candidate) =>
    sameRouteSegments(
      parentRouteSegments(candidate.routeSegments),
      routeSegments,
    ),
  );
  const posts = sortByRoutePath(getAllPosts()).filter((post) =>
    sameRouteSegments(parentRouteSegments(post.routeSegments), routeSegments),
  );

  return {
    ...section,
    childSections,
    code: source.code,
    content: source.content,
    posts,
  };
}

export function getPostByRouteSegments(
  routeSegments: string[],
  { includeDrafts = false } = {},
) {
  const post = getVelitePosts()
    .map(toPost)
    .find((candidate) =>
      sameRouteSegments(candidate.routeSegments, routeSegments),
    );

  return post && (includeDrafts || !post.draft) ? post : undefined;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}
