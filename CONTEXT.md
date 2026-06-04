# Developer Blog

A personal developer publishing space focused on source-authored posts.

## Language

**Developer Blog**:
A static publishing site for developer writing, designed around reading posts rather than account, editor, or server-backed workflows.
_Avoid_: Portfolio app, CMS, writing platform

**Post**:
A source-authored article stored as an MDX file and published as a readable page in the Developer Blog.
_Avoid_: Article record, content item, database post, plain Markdown post

**MDX Post**:
The canonical source format for a Post, stored under the blog's content directory and able to contain Markdown plus approved React components.
_Avoid_: Markdown file, CMS entry

**Code Block**:
A formatted code excerpt inside an MDX Post, treated as a primary reading element for developer writing. Code Blocks support syntax highlighting, optional filename or metadata display, and copying.
_Avoid_: Plain pre tag, code sandbox

**Post Metadata**:
The frontmatter that describes an MDX Post for listing, routing, and search previews. Every Post Metadata includes a title, description, date, and one or more categories.
_Avoid_: Database columns, CMS fields

**Category**:
A broad, flat grouping assigned to a Post for browsing the Developer Blog. A Post belongs to one or more Categories, and Categories do not define the Post's document hierarchy.
_Avoid_: Folder, tag, label, category tree

**Document Section**:
A named place in the Developer Blog's docs-style reading hierarchy. A Post belongs to exactly one Document Section path, and that path forms the readable part of its Docs Route.
_Avoid_: Category tree, folder label, tag path

**Category Browsing**:
The initial discovery model for finding Posts by their flat Categories. Category Browsing is the primary alternative to search in the first version of the Developer Blog.
_Avoid_: Full-text search, faceted search

**Docs Route**:
The public URL where a Post can be read in a docs-style hierarchy. Docs Routes use `/docs/[...section-and-slug]`, while category browsing uses `/categories/[category]`.
_Avoid_: API endpoint, database route

**Post Hub**:
The home page role for the Developer Blog: a reader's starting point that highlights a featured Post, recent Posts, and Category entry points.
_Avoid_: Landing page, portfolio homepage, dashboard

**Static Publication**:
The publishing model where MDX Posts are built into static pages and served without server APIs. The Developer Blog uses Static Publication so it can be hosted on GitHub Pages.
_Avoid_: API-backed publishing, CMS publishing

**Writing Voice**:
The language style for Posts and interface text: Korean by default, with established technical names kept in English.
_Avoid_: Forced translation of technical names, English-first interface

**About Page**:
A short supporting page that explains the author and the purpose of the Developer Blog. It is secondary to the Post Hub and should not turn the site into a portfolio-first experience.
_Avoid_: Portfolio homepage, resume page, product landing page

**Reference UI**:
The visual language and layout patterns borrowed from the existing frontend monorepo, simplified for the Developer Blog's static reading experience.
_Avoid_: Clone, shared product app, admin UI

## Example Dialogue

Developer: "Should this Post need an API?"
Domain Expert: "No. A Post is source-authored MDX, so the Developer Blog can build it into static pages."

Developer: "Is a Code Block just decoration?"
Domain Expert: "No. Code Blocks are primary reading elements, so they need highlighting and copy support."

Developer: "Are we rebuilding the reference project?"
Domain Expert: "No. We use the Reference UI as visual guidance, but simplify it around browsing and reading Posts."

Developer: "Is a Category the same as a tag?"
Domain Expert: "No. Categories are the primary browsing groups; tags may exist later as optional finer-grained descriptors."

Developer: "How do readers find related Posts before search exists?"
Domain Expert: "They use Category Browsing through category pages and badges."

Developer: "Where should a reader find a Post?"
Domain Expert: "The Docs Route is `/docs/[...section-and-slug]`; category pages only collect related Posts."

Developer: "Is a Category the same thing as a Document Section?"
Domain Expert: "No. A Category is flat browsing metadata, while a Document Section is the single docs-style path that gives a Post its public URL."

Developer: "Should the home page explain every feature?"
Domain Expert: "No. The Post Hub should get readers into Posts quickly."

Developer: "Where does the server fit?"
Domain Expert: "It does not. Static Publication means Posts are generated ahead of time and served as static pages."

Developer: "Should we translate Next.js or TypeScript into Korean labels?"
Domain Expert: "No. The Writing Voice is Korean by default, but established technical names stay in English."

Developer: "Should About replace the home page?"
Domain Expert: "No. About supports the Developer Blog's identity; the Post Hub remains the main entry point."
