// Dev-only side-effect module (imported only when NODE_ENV !== "production",
// see posts.ts). Statically importing the generated Velite JSON registers it as
// a Turbopack module dependency, so when editing content makes Velite rewrite
// these files, Turbopack invalidates this module and Fast Refresh reloads the
// page automatically — no manual browser refresh.
//
// The data itself is still loaded via readFileSync in posts.ts; these imports
// exist purely to create the watch edge. The global assignment is a side effect
// that prevents the bundler from tree-shaking the imports (and thus the edge).
import documentSections from "../../../../.velite/documentSections.json";
import posts from "../../../../.velite/posts.json";

(globalThis as Record<string, unknown>).__veliteDevWatch =
  (Array.isArray(posts) ? posts.length : 0) +
  (Array.isArray(documentSections) ? documentSections.length : 0);
