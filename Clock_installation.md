# Timeless: installation guide

Use the React packing list for a normal bundled app. Framer needs the adaptation checklist below because its Code Component editor does not share this repository's local file tree.

## React project

### Copy

- `components/Clock.tsx`
- `components/Clock/`
- `hooks/useTimeZone.ts`

`Clock.tsx` imports its own CSS, SVG, and WebP rim assets from these paths. Keep the filenames and relative directory structure intact.

### Do not copy

- `App.tsx`
- `index.css`
- `public/`
- `design-evidence/`
- `pullcord` and every demo-only dependency or interaction

The copied component has no wall, monitor, pull cord, landing page, or outer/background shadow.

## Framer Code Component

Do not paste only `components/Clock.tsx` into Framer: it depends on the rest of the reusable boundary above. Adapt that complete boundary into one Framer Code Component while preserving the source behavior and visual values.

1. Keep the clock render tree, theme constants, time-zone helpers, Web Animations API hand movement, and accessibility behavior.
2. Put the unchanged rules from `components/Clock/clock.css` in a module-level string and render them through a `<style>{CLOCK_CSS}</style>` element. This keeps the styles present during server rendering; do not inject them from an effect.
3. Upload `Braun_Logo.svg`, `rim-silver.webp`, and `rim-black.webp` to a stable public host (or Framer's asset system), then replace the three local imports in `ClockFace.tsx` with their HTTPS URLs.
4. Keep render browser-safe. Access `window`, `document`, timers, and `Element.animate()` only inside effects or guarded helpers, as the source already does.
5. Add Framer property controls for `theme`, `timeZone`, `maxSize`, and `ariaLabel`. Keep code-level defaults too because property controls only configure canvas instances.
6. Give Framer equal intrinsic width and height annotations, retain the clock's `aspect-ratio: 1`, and place it in a square parent frame so canvas resizing cannot distort it.
7. Keep the component React 18 compatible, then test both themes in the Framer canvas and Preview. Confirm the rim and logo URLs load, the glass stays above the hands, and the yellow second-hand tail remains attached to the centre cap.

Useful Framer references: [Code Components](https://www.framer.com/developers/components-introduction), [Property Controls](https://www.framer.com/developers/property-controls), and [Component sizing](https://www.framer.com/developers/auto-sizing).

### Prompt for a coding agent

> Adapt the Timeless reusable clock boundary from `github.com/asiffisa/Braun-analogue-clock` into one Framer Code Component. Follow the Framer checklist in `Clock_installation.md`. Preserve all visual values and Web Animations API behavior, inline the unchanged clock CSS in a render-time `<style>` element, replace local SVG/WebP imports with stable hosted URLs, add controls for theme, timeZone, maxSize, and ariaLabel, and verify both the Framer canvas and Preview.
