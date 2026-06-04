import GithubSlugger from "github-slugger";

export type PostTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const headingPattern = /^(##|###)\s+(.+)$/gm;

export function extractPostToc(source: string): PostTocItem[] {
  const slugger = new GithubSlugger();
  const items: PostTocItem[] = [];
  let match = headingPattern.exec(source);

  while (match !== null) {
    const text = match[2].replace(/[#*_`]/g, "").trim();

    items.push({
      id: slugger.slug(text),
      text,
      level: match[1].length as 2 | 3,
    });

    match = headingPattern.exec(source);
  }

  return items;
}
