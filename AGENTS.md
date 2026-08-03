# Timelapse integration guide

## Commands

```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```

## Reusable clock boundary

The reusable unit is `components/Clock.tsx` plus:

- `components/Clock/`
- `hooks/useTime.ts`
- `hooks/useIST.ts`
- the related clock CSS and SVG/WebP assets in `index.css`

The public API is intentionally only:

```tsx
<Clock theme="light" />
<Clock theme="dark" />
```

`App.tsx`, the monitor, plaster wall, and `PullCord` are playground-only. Do not copy them into a consumer app unless the user explicitly asks for the complete demo.

## Integration rules

1. Preserve the clock assets and the matching CSS; they are part of the visual component, not optional decoration.
2. Preserve the second-hand tail and its shared yellow centre cap. They are one physical mechanism and must layer above the hand shadows.
3. Keep `ClockGlass.tsx` above the full clock mechanism. Tune glass values only through `CLOCK_GLASS` in `constants.ts`.
4. Do not add `pullcord` as a dependency for a clock-only integration.
5. The clock currently reads Indian Standard Time through `useIST`. Do not silently change the time zone; make it an explicit prop in a future library version if needed.

## Framer handoff

Create one Framer Code Component from the reusable clock boundary. Add a `theme` property control with `light` and `dark` options, preserve the square aspect ratio, and avoid browser-only APIs during render. Framer hides broken code components, so test in both the Framer canvas and preview.

## Before handing off

Run `npx tsc --noEmit && npm run build`. For visual work, verify both themes, smooth time movement, glass overlay, rim asset loading, and the yellow second-hand tail.
