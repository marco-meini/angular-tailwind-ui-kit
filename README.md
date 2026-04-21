# Tailwind UI Kit Workspace

Angular workspace containing:

- `projects/ui-kit`: standalone UI library (`@your-scope/ui-kit`).
- `apps/showcase`: demo explorer app.

## Component structure

The library uses a file-per-component strategy.

- Every component class lives in its own file under `projects/ui-kit/src/lib/components`.
- Public exports are centralized in `projects/ui-kit/src/lib/index.ts`.
- Category-based aggregator files are not used.

## Run the showcase

```bash
npm install
npx ng serve showcase
```

Open `http://localhost:4200` and use the sidebar to browse the complete component list.  
Each route renders one component at a time: `/components/:id`.

## Build

Build the library:

```bash
npx ng build ui-kit
```

Build the demo app:

```bash
npx ng build showcase
```
