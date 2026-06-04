import { afterEach, beforeEach, expect, test } from "bun:test";
import { execFile } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import {
  getAllPosts,
  getDocumentSectionByRouteSegments,
  getPost,
  getPostByRouteSegments,
  getPostNavigationTree,
} from "./posts";

const execFileAsync = promisify(execFile);
const contentDirectory = join(process.cwd(), "content", "posts");
const slugs = ["test-older-note", "test-newer-note", "test-draft-note"];
const nestedTestDirectory = join(
  contentDirectory,
  "01-app",
  "01-getting-started",
);

beforeEach(async () => {
  await mkdir(nestedTestDirectory, { recursive: true });

  await writeFile(
    join(contentDirectory, "test-older-note.mdx"),
    `---
title: "Older note"
description: "First public note"
date: "2026-01-01"
categories:
  - nextjs
tags:
  - static-export
updated: "2026-01-02"
canonicalUrl: "https://example.com/older-note"
---

## Hello

Older body.
`,
  );

  await writeFile(
    join(contentDirectory, "test-newer-note.mdx"),
    `---
title: "Newer note"
description: "Latest public note"
date: "2026-02-01"
categories:
  - react
cover: "/covers/newer.png"
---

Newer body.
`,
  );

  await writeFile(
    join(contentDirectory, "test-draft-note.mdx"),
    `---
title: "Draft note"
description: "Hidden note"
date: "2026-03-01"
categories:
  - craft
draft: true
---

Draft body.
`,
  );

  await writeFile(
    join(contentDirectory, "01-app", "index.mdx"),
    `---
title: "App"
description: "App section summary"
---

App section body.
`,
  );

  await writeFile(
    join(nestedTestDirectory, "index.mdx"),
    `---
title: "Getting Started"
description: "Getting started section summary"
---

Getting started section body.
`,
  );

  await writeFile(
    join(nestedTestDirectory, "01-docs-route-note.mdx"),
    `---
title: "Docs route"
description: "Nested docs-style route"
date: "2026-04-01"
categories:
  - nextjs
---

Docs route body.
`,
  );

  await execFileAsync("bunx", ["velite", "--clean"]);
});

afterEach(async () => {
  await Promise.all(
    slugs.map((slug) =>
      rm(join(contentDirectory, `${slug}.mdx`), { force: true }),
    ),
  );
  await rm(join(contentDirectory, "01-app"), { force: true, recursive: true });
  await execFileAsync("bunx", ["velite", "--clean"]);
});

test("published MDX Posts are loaded newest first from source", () => {
  const posts = getAllPosts().filter((post) => post.slug.startsWith("test-"));

  expect(posts.map((post) => post.slug)).toEqual([
    "test-newer-note",
    "test-older-note",
  ]);
  expect(posts[0]).toMatchObject({
    title: "Newer note",
    description: "Latest public note",
    date: "2026-02-01",
    categories: ["react"],
    cover: "/covers/newer.png",
  });
  expect(posts[1]).toMatchObject({
    tags: ["static-export"],
    updated: "2026-01-02",
    canonicalUrl: "https://example.com/older-note",
  });
});

test("individual MDX Post lookup returns content and metadata by stable slug", () => {
  const post = getPost("test-older-note");

  expect(post).toMatchObject({
    slug: "test-older-note",
    routePath: "/docs/test-older-note",
    routeSegments: ["test-older-note"],
    title: "Older note",
    description: "First public note",
    categories: ["nextjs"],
  });
  expect(post?.content).toContain("Older body.");
});

test("individual MDX Post lookup returns content by docs-style route segments", () => {
  const post = getPostByRouteSegments([
    "app",
    "getting-started",
    "docs-route-note",
  ]);

  expect(post).toMatchObject({
    slug: "docs-route-note",
    routePath: "/docs/app/getting-started/docs-route-note",
    routeSegments: ["app", "getting-started", "docs-route-note"],
    title: "Docs route",
  });
  expect(post?.content).toContain("Docs route body.");
});

test("Document Section lookup returns section summary with immediate cards", () => {
  const section = getDocumentSectionByRouteSegments(["app"]);

  expect(section).toMatchObject({
    title: "App",
    description: "App section summary",
    routePath: "/docs/app",
    routeSegments: ["app"],
  });
  expect(section?.content).toContain("App section body.");
  expect(section?.childSections.map((child) => child.routePath)).toEqual([
    "/docs/app/getting-started",
  ]);
  expect(section?.posts.map((post) => post.routePath)).toEqual([]);
});

test("nested Document Section lookup returns immediate Posts as cards", () => {
  const section = getDocumentSectionByRouteSegments(["app", "getting-started"]);

  expect(section).toMatchObject({
    title: "Getting Started",
    routePath: "/docs/app/getting-started",
  });
  expect(section?.posts.map((post) => post.routePath)).toEqual([
    "/docs/app/getting-started/docs-route-note",
  ]);
});

test("Post navigation tree follows the content directory hierarchy", () => {
  const appSection = getPostNavigationTree().find(
    (item) => item.routePath === "/docs/app",
  );

  expect(appSection).toMatchObject({
    title: "App",
    type: "section",
    routeSegments: ["app"],
  });
  expect(appSection?.items).toEqual([
    expect.objectContaining({
      routePath: "/docs/app/getting-started",
      type: "section",
      items: [
        expect.objectContaining({
          routePath: "/docs/app/getting-started/docs-route-note",
          type: "post",
        }),
      ],
    }),
  ]);
});
