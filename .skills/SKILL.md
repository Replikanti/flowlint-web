# FlowLint Web Development Skill

## Metadata
- **Name:** flowlint-web-dev
- **License:** MIT
- **Compatibility:** Claude Code, Node.js 24+
- **Deployment:** GitHub Pages

## Description

FlowLint Web is the marketing and documentation website. Built with React 19, Vite, shadcn/ui, and Tailwind CSS. Automatically deploys to GitHub Pages on push to main.

## Capabilities

- **add-page:** Add new page/route
- **ui-component:** Create/modify UI component
- **styling:** Tailwind CSS styling changes
- **seo:** Meta tags and structured data
- **performance:** Optimize Lighthouse scores
- **content:** Update documentation and marketing copy

## Project Structure

```
flowlint-web/
├── src/
│   ├── pages/           # Route pages
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities
│   └── assets/          # Images, fonts
├── public/              # Static files
├── scripts/             # Build scripts
└── dist/                # Build output
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server (localhost:8080) |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint check |

## Tech Stack

- React 19
- React Router
- Vite
- Tailwind CSS
- shadcn/ui components
- XYFlow (for workflow diagrams)

## Common Tasks

### Add New Page

1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Update navigation
4. Add meta tags for SEO

### Add UI Component

1. Create `src/components/NewComponent.tsx`
2. Style with Tailwind
3. Export from `src/components/index.ts`
4. Document props

### Optimize Performance

1. Run `npm run build`
2. Check Lighthouse scores
3. Optimize images
4. Code split routes
5. Lazy load components

## SEO Guidelines

- Unique title and description per page
- Structured data (JSON-LD)
- Semantic HTML
- Image alt text
- Sitemap.xml generation

## Guardrails

- Never commit to main (use PR)
- Run `npm run lint` before commit
- Test responsive design
- Follow Conventional Commits
- Use shadcn/ui components when available
- Maintain accessibility (ARIA, keyboard nav)

## Related Files

- `CLAUDE.md` - Main project instructions
- `AGENTS.md` - Repository guidelines
- `README.md` - Documentation
