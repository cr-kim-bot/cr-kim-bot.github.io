import { afterEach, beforeEach, expect, test } from "bun:test";
import { execFile } from "node:child_process";
import { rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import {
  getCategory,
  getCategoryOrFallback,
  getPostsByCategory,
} from "./categories";

const execFileAsync = promisify(execFile);
const contentDirectory = join(process.cwd(), "content", "posts");
const slugs = ["test-react-note", "test-next-note"];

beforeEach(async () => {
  await writeFile(
    join(contentDirectory, "test-react-note.mdx"),
    `---
title: "React note"
description: "React category note"
date: "2026-02-01"
categories:
  - react
---

React body.
`,
  );

  await writeFile(
    join(contentDirectory, "test-next-note.mdx"),
    `---
title: "Next note"
description: "Next category note"
date: "2026-01-01"
categories:
  - nextjs
  - unknown-topic
---

Next body.
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
  await execFileAsync("bunx", ["velite", "--clean"]);
});

test("Categories are flat browsing groups with display metadata", () => {
  expect(getCategory("react")).toMatchObject({
    key: "react",
    name: "React",
    description: expect.any(String),
    colorClass: expect.any(String),
  });
});

test("unknown Category keys resolve to fallback display metadata", () => {
  expect(getCategoryOrFallback("unknown-topic")).toEqual({
    key: "unknown-topic",
    name: "unknown-topic",
    description: "아직 정의되지 않은 Category입니다.",
    colorClass: "bg-muted text-icon",
  });
});

test("Category Browsing returns matching published Posts newest first", () => {
  const posts = getPostsByCategory("nextjs").filter((post) =>
    post.slug.startsWith("test-"),
  );

  expect(posts.map((post) => post.slug)).toEqual(["test-next-note"]);
  expect(posts[0].categoryDetails.map((category) => category.key)).toEqual([
    "nextjs",
    "unknown-topic",
  ]);
});
