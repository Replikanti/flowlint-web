# FlowLint Web - GitHub Pages Deployment Guide

## Overview

FlowLint Web has been successfully converted from a development-focused Vite app to a production-ready static site optimized for GitHub Pages hosting.

## Changes Summary

### Phase 1: Configuration & Build Setup

1. **vite.config.ts** - Added GitHub Pages base path
   - Added `base: '/flowlint-web/'` for subdirectory hosting
   - All asset paths now correctly prefix with `/flowlint-web/`

2. **src/App.tsx** - Updated router configuration
   - Added `basename="/flowlint-web"` to BrowserRouter
   - Ensures client-side routing works correctly on GitHub Pages

3. **index.html** - Enhanced meta tags and SPA fallback script
   - Updated og:url to point to GitHub Pages URL
   - Updated social media image URLs
   - Added SPA redirect handler for 404 fallback routing
   - Added proper Twitter card meta tags

4. **public/404.html** - Created SPA fallback page
   - Redirects 404 errors to index.html with path preserved
   - Enables client-side routing to work on page refresh

5. **public/.nojekyll** - Disabled Jekyll processing
   - Prevents GitHub Pages from running Jekyll build
   - Ensures all files (including those starting with underscore) are served

6. **.github/workflows/deploy.yml** - Automated deployment workflow
   - Builds on every push to main branch
   - Uses Node.js 22 for consistency
   - Uploads build artifacts to GitHub Pages
   - Automatic deployment with proper permissions

### Phase 2: Form & API Integration

7. **src/pages/Support.tsx** - Replaced API call with GitHub Issues
   - Removed dependency on external API endpoint
   - Form now pre-fills GitHub issue template
   - Opens GitHub Issues in new tab for submission
   - Fully static - no backend required
   - Maps form issue types to appropriate GitHub labels

### Phase 3: Documentation

8. **README.md** - Updated with deployment information
   - Added GitHub Pages deployment instructions
   - Updated project structure documentation
   - Added development and build commands
   - Documented GitHub Pages configuration

9. **DEPLOYMENT_GUIDE.md** (this file)
   - Comprehensive deployment documentation
   - Step-by-step configuration guide

## Deployment Steps

### Step 1: Enable GitHub Pages (One-time setup)

1. Go to your GitHub repository: `https://github.com/Replikanti/flowlint-web`
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Push Changes to Trigger Deployment

```bash
# Navigate to flowlint-web directory
cd flowlint-web

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Convert FlowLint Web to GitHub Pages static site

- Configure Vite base path for /flowlint-web/ subdirectory
- Update React Router with basename
- Add 404.html for SPA routing fallback
- Create GitHub Actions deployment workflow
- Replace Support form API call with GitHub Issues
- Add .nojekyll to disable Jekyll processing
- Update meta tags for proper SEO and social sharing
- Add comprehensive deployment documentation"

# Push to main branch
git push origin main
```

### Step 3: Monitor Deployment

1. Go to **Actions** tab in GitHub repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Build typically takes 1-2 minutes
4. Once completed, site will be live at: `https://replikanti.github.io/flowlint-web/`

### Step 4: Verify Deployment

Visit these URLs to verify everything works:

- Home: `https://replikanti.github.io/flowlint-web/`
- Documentation: `https://replikanti.github.io/flowlint-web/doc`
- Support: `https://replikanti.github.io/flowlint-web/support`
- Status: `https://replikanti.github.io/flowlint-web/status`
- Privacy: `https://replikanti.github.io/flowlint-web/privacy`
- Terms: `https://replikanti.github.io/flowlint-web/tos`

Test client-side routing:
1. Navigate to any page
2. Refresh the browser (F5)
3. Page should load correctly (not 404)

## Configuration Details

### Vite Configuration

```typescript
export default defineConfig(({ mode }) => ({
  base: '/flowlint-web/',  // GitHub Pages subdirectory
  // ... other config
}));
```

### React Router Configuration

```typescript
<BrowserRouter basename="/flowlint-web">
  <Routes>
    {/* routes */}
  </Routes>
</BrowserRouter>
```

### GitHub Actions Workflow

- **Trigger**: Push to main branch or manual workflow_dispatch
- **Node Version**: 22 (matches development environment)
- **Build Command**: `npm run build`
- **Deploy Target**: `dist/` directory
- **Permissions**:
  - `contents: read` - Read repository files
  - `pages: write` - Deploy to GitHub Pages
  - `id-token: write` - OIDC authentication

### SPA Routing Strategy

1. User requests non-existent path (e.g., `/flowlint-web/support`)
2. GitHub Pages serves `404.html`
3. `404.html` script redirects to `index.html` with path encoded in query string
4. `index.html` script decodes path from query string
5. React Router takes over and renders correct component

## Build Output Structure

```
dist/
├── .nojekyll              # Disable Jekyll
├── 404.html               # SPA fallback
├── index.html             # Main entry point
├── favicon.ico            # Site icon
├── placeholder.svg        # Placeholder image
├── robots.txt             # SEO crawler instructions
└── assets/
    ├── index-[hash].js    # Bundled JavaScript
    └── index-[hash].css   # Bundled styles
```

## Troubleshooting

### Issue: 404 errors on page refresh

**Solution**: Verify these files exist in `dist/`:
- `404.html` with redirect script
- `.nojekyll` file
- `index.html` with decode script

### Issue: Assets not loading (404 for CSS/JS)

**Solution**: Check that:
- `vite.config.ts` has `base: '/flowlint-web/'`
- Built `dist/index.html` has correct asset paths with `/flowlint-web/` prefix

### Issue: Routing not working

**Solution**: Verify:
- `BrowserRouter` has `basename="/flowlint-web"`
- All internal links use relative paths or React Router `<Link>` components

### Issue: Workflow fails

**Solution**: Check:
- Repository has Pages enabled in Settings
- Source is set to "GitHub Actions"
- Workflow has correct permissions in YAML
- `package-lock.json` is committed (required for `npm ci`)

## Performance Optimization

The build is already optimized:
- Code splitting enabled
- Assets hashed for cache busting
- Gzip compression applied
- Tree-shaking removes unused code

Build metrics (typical):
- `index.html`: ~2.2 KB (gzipped: ~0.8 KB)
- CSS bundle: ~63 KB (gzipped: ~11 KB)
- JS bundle: ~418 KB (gzipped: ~132 KB)

## Future Enhancements

Potential improvements for future iterations:

1. **Custom Domain**: Configure custom domain in GitHub Pages settings
2. **Analytics**: Add privacy-friendly analytics (Plausible, Simple Analytics)
3. **PWA**: Add service worker for offline support
4. **Image Optimization**: Use WebP format for images
5. **Bundle Size**: Further reduce JS bundle with lazy loading

## Support

For issues with deployment or the website:
- Create an issue: https://github.com/Replikanti/flowlint/issues
- Check workflow logs in Actions tab
- Review this deployment guide

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Router Documentation](https://reactrouter.com/en/main/router-components/browser-router)
- [SPA GitHub Pages Strategy](https://github.com/rafgraph/spa-github-pages)
