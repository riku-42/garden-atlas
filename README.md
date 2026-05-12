# Garden Atlas

Garden Atlas is a mobile-first AI botanical journaling prototype. It turns ordinary plant photos into elegant scientific-style specimen cards and archives them as a personal digital herbarium.

Current approved direction: Prototype-first MVP.

- `docs/superpowers/specs/2026-05-12-garden-atlas-design.md` contains the formal product and design spec.
- `docs/superpowers/plans/2026-05-12-garden-atlas-prototype-first-mvp.md` contains the implementation plan.
- `docs/html/garden-atlas-spec.html` is the browser-readable planning version.
- `docs/html/garden-atlas-screen-storyboard.html` shows the rest of the app screens in HTML.
- `docs/html/garden-atlas-implementation-plan.html` is the browser-readable implementation plan.
- `docs/html/garden-atlas-build-handoff.html` summarizes the implemented prototype.
- Implemented prototype: Vite mobile web prototype plus React Native Expo mobile app.

## Workspace

- `packages/shared`: product types, UI copy, mock data, and API contracts.
- `apps/web`: mobile-first Vite prototype.
- `apps/mobile`: React Native Expo mobile prototype with matching Garden Atlas screens.

## Run Locally

```bash
npm install
npm run dev:web
npm run dev:mobile
```

Web prototype: `http://localhost:5175`

## Verify

```bash
npm run typecheck
npm run build:web
npm run test:web
```
