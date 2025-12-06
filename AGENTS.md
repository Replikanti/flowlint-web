# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the app: `pages/` for routed views, `components/` for shared UI, `hooks/` for reusable logic, `lib/` for utilities, and `assets/` for static media referenced in code.
- Global styles live in `src/index.css` and `src/App.css`; Tailwind config sits in `tailwind.config.ts`.
- `public/` serves static files (e.g., SPA fallback `404.html`), and `dist/` is produced by the build.
- Cloudflare Worker assets and data schema are in `workers/` with runtime settings in `wrangler.toml`.
- Tooling and lint config: `eslint.config.js`, `tsconfig*.json`, `postcss.config.js`.

## Build, Test, and Development Commands
- Install deps: `npm install` (Node 22+ recommended).
- Local dev server: `npm run dev` (Vite at http://localhost:8080).
- Production build: `npm run build`; development-tuned build: `npm run build:dev`.
- Preview built assets: `npm run preview`.
- Lint TypeScript/JSX: `npm run lint`.
- Targeted tests: `npm run test:related -- path/to/file.tsx` (Vitest).
- Husky + lint-staged run linting on staged changes during `git commit`.

## Coding Style & Naming Conventions
- TypeScript + React function components; prefer arrow functions and hooks-driven state.
- Default to 2-space indentation; keep files typed (`.ts`/`.tsx`) and avoid implicit `any`.
- Components in `components/` use PascalCase filenames; hooks start with `use`; utility modules in `lib/` are camelCase.
- Tailwind is the primary styling layer; keep class lists readable and co-locate UI variants with their components.

## Testing Guidelines
- Vitest powers unit/integration tests; keep specs alongside source as `*.test.ts`/`*.test.tsx`.
- Cover new logic in `lib/` and hook behavior in `hooks/`; for UI, test rendered text/ARIA roles rather than implementation details.
- Use `npm run test:related -- <file>` to focus while developing; ensure suites pass before opening a PR.

## Commit & Pull Request Guidelines
- Follow conventional commits seen in history (`feat:`, `fix:`, `chore:`, optional scopes). Use imperative mood and keep messages succinct.
- Before pushing, run `npm run lint`, `npm run build`, and relevant `npm run test:related` to prevent CI noise.
- PRs should include a short summary, linked issue (if any), risk notes, and screenshots/GIFs for UI changes. Keep diffs scoped to a single concern when possible.

## Security & Configuration Tips
- Base env keys on `.env.example`; never commit secrets. For local-only values, use an untracked `.env.local`.
- If editing Cloudflare Worker files in `workers/`, align config with `wrangler.toml` and avoid embedding credentials in code.
