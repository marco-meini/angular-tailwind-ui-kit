# Angular UI Kit Component Scaffold

Use this skill when adding a new component to `projects/ui-kit`.

## Steps
1. Create component in the nearest domain file under `projects/ui-kit/src/lib/components/`.
2. Expose `variant`, `size`, `state`, `disabled`, `invalid`, `loading` inputs where meaningful.
3. Compose classes with `uiVariantClasses` from `core/class-variants.ts`.
4. Export from `projects/ui-kit/src/lib/index.ts`.
5. Add a smoke section in `apps/showcase/src/app/showcase-pages.ts`.
6. Add docs in `docs/components/`.
7. Add/update unit tests under `projects/ui-kit/src/lib/**.spec.ts`.
