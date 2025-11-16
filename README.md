# FlowLint Web

Marketing and documentation website for FlowLint - a GitHub App that performs automated static analysis on n8n workflow files.

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions.

**Live URL**: https://replikanti.github.io/flowlint-web/

### Automatic Deployment

Every push to the `main` branch triggers an automatic build and deployment via GitHub Actions (`.github/workflows/deploy.yml`).

### Manual Deployment

You can also trigger a manual deployment:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Development

### Prerequisites

- Node.js 22+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Local Development

```sh
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Project Structure

```
flowlint-web/
├── src/
│   ├── pages/          # Page components (Home, Documentation, Support, etc.)
│   ├── components/     # Reusable UI components
│   └── App.tsx         # Main app with routing
├── public/             # Static assets
│   ├── .nojekyll       # Disable Jekyll processing on GitHub Pages
│   └── 404.html        # SPA fallback for client-side routing
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment workflow
```

## Technologies

This project is built with:

- Vite (build tool)
- TypeScript
- React 18
- React Router (client-side routing)
- shadcn-ui (component library)
- Tailwind CSS
- Radix UI primitives

## GitHub Pages Configuration

The site is configured for GitHub Pages subdirectory hosting:

- Base path: `/flowlint-web/`
- Router basename: `/flowlint-web`
- SPA fallback via 404.html redirect strategy
- No Jekyll processing (.nojekyll file)

## Support Form

The support form uses GitHub Issues for submission:
- No backend API required
- Pre-fills GitHub issue template with form data
- Opens GitHub in new tab for user to complete submission
