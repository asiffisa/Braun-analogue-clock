# Timelapse integration guide

## Commands

```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```

## Reusable clock boundary

The reusable unit is exactly the three paths in `Clock_installation.md`:

- `components/Clock.tsx`
- `components/Clock/`
- `hooks/useTimeZone.ts`

Respect that file's **Do not copy** list. It keeps the playground and legacy helpers out of consumer apps.

The public API is intentionally small:

```tsx
<Clock theme="light" />
<Clock theme="dark" />
<Clock theme="dark" timeZone="America/New_York" />
```

`App.tsx`, the monitor, plaster wall, and `PullCord` are playground-only. Do not copy them into a consumer app unless the user explicitly asks for the complete demo.

`Clock.tsx` imports `components/Clock/clock.css` itself. The reusable clock has no outer/background shadow; scene shadows belong to the demo's `.wall-clock` wrapper only.

## Integration rules

1. Preserve the clock assets and the matching CSS; they are part of the visual component, not optional decoration.
2. Preserve the second-hand tail and its shared yellow centre cap. They are one physical mechanism and must layer above the hand shadows.
3. Keep `ClockGlass.tsx` above the full clock mechanism. Tune glass values only through `CLOCK_GLASS` in `constants.ts`.
4. Do not add `pullcord` as a dependency for a clock-only integration.
5. `Clock` defaults to Indian Standard Time (`Asia/Chennai`, UTC+05:30). Timelapse normalizes this friendly alias to the official browser zone `Asia/Kolkata`. Use its explicit `timeZone` prop for another standard IANA time-zone name; this preserves daylight-saving changes where applicable.

## Framer handoff

Create one Framer Code Component from the reusable clock boundary. Add a `theme` property control with `light` and `dark` options, preserve the square aspect ratio, and avoid browser-only APIs during render. Framer hides broken code components, so test in both the Framer canvas and preview.

## Before handing off

Run `npx tsc --noEmit && npm run build`. For visual work, verify both themes, smooth time movement, glass overlay, rim asset loading, and the yellow second-hand tail.
