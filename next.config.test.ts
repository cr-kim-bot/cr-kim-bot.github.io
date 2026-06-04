import { expect, test } from "bun:test";
import nextConfig from "./next.config";

test("Static Publication config exports static assets for GitHub Pages", () => {
  expect(nextConfig).toMatchObject({
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  });
});
