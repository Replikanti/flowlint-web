#  FlowLint Web Interface (Online Linter) Plan

##  Objective
Create a browser-based version of the FlowLint tool, allowing users to analyze n8n workflow JSONs directly on the request without installing the Chrome Extension or CLI. This serves as a "Playground" and a low-friction entry point for new users.

**Timeline:** Q4 2025
**Status:** In Progress (Roadmap Updated)

##  Architecture
The web interface will be built within the existing `flowlint-web` project.
It will leverage the isomorphic nature of `@replikanti/flowlint-core`.

### Tech Stack
*   **Framework:** Next.js / React (assuming `flowlint-web` stack).
*   **Core Logic:** `@replikanti/flowlint-core` (Client-side execution).
*   **Editor:** `monaco-editor` (VS Code style) for JSON editing/viewing.
*   **UI Components:** Shared or re-implemented components for displaying findings (similar to Extension).

##  Implementation Tasks

### 1. Integration Setup
- [ ] Install `@replikanti/flowlint-core` in `flowlint-web`.
- [ ] Configure bundler (Next.js/Webpack) to handle ESM/CJS core package if necessary.

### 2. UI Development (The Playground)
- [ ] Create `/lint` or `/playground` route.
- [ ] **Input Area:**
    - [ ] Add `monaco-editor` for JSON input.
    - [ ] Implement "Paste" and "Upload File" buttons.
- [ ] **Analysis Engine:**
    - [ ] Call `parseN8n` and `runAllRules` from core in the browser main thread (or Web Worker if heavy, though pure JS rules are usually fast).
- [ ] **Results Display:**
    - [ ] Render a list of findings (Error/Warning/Info).
    - [ ] Highlight problematic nodes or lines in the editor (Monaco markers).
    - [ ] Filter/Sort findings capability.

### 3. Polish & release
- [ ] Add "Fix" suggestions where possible.
- [ ] SEO optimization for "n8n linter online".
- [ ] Deploy to production (Vercel/Netlify).

##  Synergy with Extension
Code for displaying results can potentially be shared between `flowlint-chrome` and `flowlint-web` via a shared UI package in the future, but for now, we will duplicate or adapt the UI as `flowlint-web` likely uses a different UI library (e.g. Tailwind vs custom CSS).

##  Roadmap
*   **Week 1:** Setup & Basic Parsing (Console log results).
*   **Week 2:** UI Implementation (Editor + List).
*   **Week 3:** Refinement (Markers, Validation) & Launch.