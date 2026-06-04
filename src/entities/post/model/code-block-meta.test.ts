import { describe, expect, test } from "bun:test";
import { normalizeCodeBlockMeta } from "./code-block-meta";

describe("Code Block metadata", () => {
  test("normalizes filename metadata into a renderable title", () => {
    expect(normalizeCodeBlockMeta('filename="content/posts/example.mdx"')).toBe(
      'title="content/posts/example.mdx"',
    );
  });

  test("keeps existing title metadata unchanged", () => {
    expect(normalizeCodeBlockMeta('title="example.ts"')).toBe(
      'title="example.ts"',
    );
  });
});
