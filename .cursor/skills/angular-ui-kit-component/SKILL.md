# Angular UI Kit Component Scaffold

Use this skill when adding a new component to `projects/ui-kit`.

## Steps
1. Create component in the nearest domain file under `projects/ui-kit/src/lib/components/`.
2. Prefer external templates: use `templateUrl: './<name>.component.html'` with an adjacent HTML file instead of inline `template` strings.
3. Expose `variant`, `size`, `state`, `disabled`, `invalid`, `loading` inputs where meaningful.
4. Compose classes with `uiVariantClasses` from `core/class-variants.ts`.
5. Export from `projects/ui-kit/src/lib/index.ts`.
6. Add a smoke section in `apps/showcase/src/app/showcase-pages.ts`.
7. Add docs in `docs/components/`.
8. Add/update unit tests under `projects/ui-kit/src/lib/**.spec.ts`.
