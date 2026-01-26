# Guardrails - FlowLint Web

## Rules

### G1: Never commit to main
- **Trigger:** `git commit` on main branch
- **Instruction:** Create feature branch
- **Discovered:** Iteration 0

### G2: Run lint before commit
- **Trigger:** Before every `git commit`
- **Instruction:** Run `npm run lint`
- **Discovered:** Iteration 0

### G3: Test responsive design
- **Trigger:** UI changes
- **Instruction:** Test on mobile, tablet, desktop
- **Discovered:** Iteration 0

### G4: Accessibility
- **Trigger:** New UI components
- **Instruction:** Add ARIA labels, keyboard navigation
- **Discovered:** Iteration 0

### G5: Lighthouse scores
- **Trigger:** Build changes
- **Instruction:** Maintain scores >90 for all metrics
- **Discovered:** Iteration 0
