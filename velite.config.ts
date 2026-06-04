import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { MdxOptions } from "velite";
import { defineCollection, defineConfig, s } from "velite";
import { normalizeCodeBlockMeta } from "@/entities/post/model/code-block-meta";

const mdxOptions: MdxOptions = {
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        filterMetaString: normalizeCodeBlockMeta,
      },
    ],
  ],
};

const posts = defineCollection({
  name: "Post",
  pattern: ["posts/**/*.mdx", "!posts/**/index.mdx"],
  schema: s.object({
    path: s.path({ removeIndex: false }),
    title: s.string(),
    description: s.string(),
    date: s.string(),
    categories: s.array(s.string()).min(1),
    updated: s.string().optional(),
    tags: s.array(s.string()).optional(),
    draft: s.boolean().optional(),
    cover: s.string().optional(),
    canonicalUrl: s.string().optional(),
    content: s.raw(),
    code: s.mdx(mdxOptions),
  }),
});

const documentSections = defineCollection({
  name: "DocumentSection",
  pattern: "posts/**/index.mdx",
  schema: s.object({
    path: s.path(),
    title: s.string(),
    description: s.string(),
    content: s.raw(),
    code: s.mdx(mdxOptions),
  }),
});

export default defineConfig({
  strict: true,
  collections: {
    posts,
    documentSections,
  },
});
