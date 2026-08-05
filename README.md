[![React 19.2.8](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite 6.4.3](https://img.shields.io/badge/Vite-6.4.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript 5.8.3](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Web Animations API](https://img.shields.io/badge/Web%20Animations%20API-compositor--driven-6B7280)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
[![License MIT](https://img.shields.io/badge/License-MIT-84CC16)](./LICENSE)

# Timeless

![Timeless — analogue wall clock for the web](./public/Timeless%20cover%20Big.png)

A Braun-inspired analogue clock for React. Drop it into a page and it keeps real time, in any time zone, with a smooth sweeping second hand.

## Features

- **Smooth sweep.** The second hand glides continuously instead of ticking.
- **Light and dark themes**, each with its own dial, hands, metal rim, and glass.
- **Any time zone.** Pass an IANA name; daylight saving is handled for you.
- **Costs nothing per frame.** Each hand is a single rotation handed to the browser's animation engine, so there are no React re-renders and no JavaScript running frame to frame. The hands stay smooth even when the rest of your page is busy.
- **Always accurate.** The hands re-anchor to real time twice a minute, so they survive daylight-saving jumps, clock corrections, and a laptop waking from sleep.
- **Fluid and square.** Fills its container up to a size you choose, and never distorts.
- **Screen-reader friendly.** Announces itself as the time it is showing, not as a pile of loose numbers.
- **Safe in visual editors.** Blank text fields fall back to the standard time zone and automatic accessible label.
- **Self-contained.** One folder plus one hook. Its only dependency is React.

## Installation

This is not an npm package yet, so you copy the source in.

**1. Copy these three paths into your project, keeping the same structure:**

```
components/Clock.tsx
components/Clock/
hooks/useTimeZone.ts
```

That is the whole clock — dial, hands, glass, themes, rim art, and its own CSS. Nothing else in this repository is needed. [Clock_installation.md](./Clock_installation.md) is the full packing list, including what to leave behind.

**2. Render it:**

```tsx
import Clock from './components/Clock';

export default function App() {
  return <Clock theme="light" />;
}
```

`Clock.tsx` imports its own stylesheet, so there is no CSS file to wire up and no Tailwind requirement.

### Framer

Framer needs a one-file Code Component adaptation rather than the React copy-paste steps above, because the pasted component cannot rely on this repository's local CSS and image paths. Follow the dedicated [Framer checklist in `Clock_installation.md`](./Clock_installation.md#framer-code-component): it preserves the exact styling, uses hosted rim/logo URLs, keeps browser-only work out of render, and adds controls for all four public props.

### Requirements

- **React 18 or newer**
- A bundler that can import `.css`, `.svg`, and `.webp` files — Vite, Next.js, and Create React App all do this out of the box
- TypeScript with strict mode enabled, or convert the copied `.tsx`/`.ts` files to JavaScript by stripping the types

## Usage

```tsx
// Light theme, default time zone
<Clock theme="light" />

// Dark theme, New York time
<Clock theme="dark" timeZone="America/New_York" />

// Larger than the 400px default
<Clock maxSize={640} />

// Custom screen-reader description
<Clock ariaLabel="Office wall clock, Chennai" />
```

### Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `theme` | `"light" \| "dark"` | `"light"` | Which palette to use. |
| `timeZone` | `string` | `"Asia/Chennai"` | Any IANA time-zone name. Blank or whitespace falls back to this default. |
| `maxSize` | `number` | `400` | Largest edge in pixels. The clock fills its container up to this, always square. |
| `ariaLabel` | `string` | the current time | Overrides what screen readers announce. Blank or whitespace uses the automatic time label. |

### Sizing

The clock fills the width of whatever you put it in, up to `maxSize`. Its dial,
hands, rim, glass, and shadows all scale with that container, so consumer apps
do not need separate mobile overrides. To control it, size the parent:

```tsx
<div style={{ width: 260 }}>
  <Clock theme="dark" />
</div>
```

### Time zones

`timeZone` accepts any [IANA time-zone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) — `"Europe/Berlin"`, `"America/Sao_Paulo"`, `"Asia/Tokyo"`. Daylight saving is applied automatically wherever it is observed.

The default is `"Asia/Chennai"`, a friendly alias for India Standard Time that resolves to the official `"Asia/Kolkata"`.

A name the browser does not recognize will not crash your app — the clock falls back to the viewer's own device time zone and logs one warning.

For no-code fields such as Framer controls, a blank or whitespace-only `timeZone` is treated as omitted, so it safely uses the India default without a warning.

## Installing with a coding agent

Point your agent at the repository:

> Add the Timeless Clock to this React app. Follow `Clock_installation.md` from `github.com/asiffisa/Braun-analogue-clock` — copy only its **Copy** paths and exclude every **Do not copy** path. Then render `<Clock theme="light" />`.

[AGENTS.md](./AGENTS.md) holds the integration contract and the visual details that must not regress.

## What's in the clock

| Path | Purpose |
| --- | --- |
| `components/Clock.tsx` | The component you import, and its props. |
| `components/Clock/ClockFace.tsx` | Dial, numerals, tick marks, metal rim. |
| `components/Clock/ClockHands.tsx` | Hour, minute, and second hands. |
| `components/Clock/useClockHands.ts` | Drives the hands and keeps them on time. |
| `components/Clock/ClockGlass.tsx` | The convex glass lens over the dial. |
| `components/Clock/constants.ts` | Both colour palettes and the glass tuning values. |
| `components/Clock/clock.css` | All clock styling, imported automatically and namespaced with `timeless-clock-*` selectors. |
| `hooks/useTimeZone.ts` | Time-zone resolution and the shared re-sync heartbeat. |

To restyle the clock, edit `constants.ts` — both palettes and the glass settings live there.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how the pieces fit together.

## License

This project is available under the [MIT License](./LICENSE). You can use,
modify, and redistribute it, provided the copyright and license notice remain
with the software.

---

This web component is inspired by the classic [Braun BC26](https://br-time.jp/clock/bc26/) clock design.
