<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


<!-- BEGIN: ui-components-rules -->
# UI Component Rules

- Place reusable, domain-agnostic, responsive UI components in `components/ui`; they must not contain business logic.
- Place UI components composed from shared UI components under `components/[type]/[layout]Card.tsx`.
<!-- END: ui-components-rules -->

<!-- BEGIN: fsd-rules -->
# Feature-Sliced Design Rules

- Use Feature-Sliced Design for higher-level structure (`entities`, `features`, `widgets`, and `app`).
- Keep business logic in higher-level FSD layers, services, hooks, or server actions.
- Files under `features/[feat]/ui/*.tsx` must only compose shared, entity, or component-layer UI components. They must not define ad-hoc styles or layout markup directly, except for minimal semantic wrappers required for accessibility or framework integration.
<!-- END: fsd-rules -->

<!-- BEGIN: always-rules --> 
# Always Rules

- Whenever creating or modifying `.ts` or `.tsx` files, always run `bun run lint`, `bun run format`.
- Whenever UI changes or user flows are newly developed or modified, run browser-based tests and include responsive viewport checks.
<!-- END: always-rules  -->
