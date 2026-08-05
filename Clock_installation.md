# Timeless: copy manifest

Use this file as the packing list when adding only the reusable clock to another React project.

## Copy

- `components/Clock.tsx`
- `components/Clock/`
- `hooks/useTimeZone.ts`

`Clock.tsx` imports its own CSS, SVGs, and WebP rim assets from these paths.

## Do not copy

- `App.tsx`
- `index.css`
- `public/`
- `design-evidence/`
- `pullcord` and every demo-only dependency or interaction

The copied component has no wall, monitor, pull cord, landing page, or outer/background shadow.
