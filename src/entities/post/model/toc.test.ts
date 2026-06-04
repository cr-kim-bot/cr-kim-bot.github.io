import { expect, test } from "bun:test";
import { extractPostToc } from "./toc";

test("Post table of contents extracts h2 and h3 headings with stable slugs", () => {
  const toc = extractPostToc(`
# Title ignored

## First Section

### Detail Section

#### Too deep ignored

## First Section
`);

  expect(toc).toEqual([
    { id: "first-section", text: "First Section", level: 2 },
    { id: "detail-section", text: "Detail Section", level: 3 },
    { id: "first-section-1", text: "First Section", level: 2 },
  ]);
});
