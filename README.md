# Timelapse

Timelapse is a Braun-inspired analogue clock for the web. It has a real-time sweep, light and dark themes, a convex glass layer, and a tactile pull-cord playground.

## Playground

The included demo turns the component into a small physical scene:

- A morning plaster wall with a cropped hanging vine, natural leaf shadows, and a slim right-side pegboard.
- The same composition in moonlight for dark mode, with only the pegboard's tiny warm lamp turned on.
- A live pull cord that switches the entire room and clock theme.
- A foreground monitor with Agent and React installation instructions, source-like syntax colour, copy control, and a blinking terminal cursor.

The wall surfaces are real image assets (`public/plaster-wall-morning-cropped.png` and `public/plaster-wall-moonlight-matched.png`), not CSS colour overlays. This keeps the plant, pegboard, texture, and lighting believable in both modes while the monitor stays visually bright in the dimmed room.

## Use it today

This repository is currently the **source project**. It is not an npm package yet.

To use the clock in a React app today:

1. Copy only the exact paths listed in [COMPONENT_COPY.md](./COMPONENT_COPY.md). Its **Do not copy** section keeps every demo-only path out of a consumer app.
2. `Clock.tsx` imports its own `components/Clock/clock.css`, so the clock does not require the playground stylesheet or Tailwind.
3. Render it with `import Clock from "./components/Clock"` and `<Clock theme="light" />`.

This import contains only the clock: no wall, pull cord, monitor, tabs, copy button, or demo interaction. The reusable clock also has no outer/background shadow; the scene-only shadow belongs to the playground's `.wall-clock` wrapper.

The public component API is deliberately small:

```tsx
// Defaults to IST: Asia/Chennai (UTC+05:30)
<Clock theme="light" />

// Use any IANA time-zone name when needed.
<Clock theme="dark" timeZone="America/New_York" />
```

`timeZone` is optional and defaults to `Asia/Chennai` (Timelapse's friendly alias for the official browser zone `Asia/Kolkata`). It also accepts standard IANA time-zone names, so daylight-saving changes are handled by the browser when applicable.

The pull cord belongs to this playground, not to the reusable clock. It uses the separate `pullcord` dependency.

## For coding agents

Give your agent this prompt:

> Integrate the Timelapse `Clock` from `github.com/asiffisa/Braun-analogue-clock`. Follow `COMPONENT_COPY.md`: copy only its **Copy** paths and exclude every **Do not copy** path. Then render `<Clock theme="light" />` or pass an IANA `timeZone` such as `America/New_York`.

`AGENTS.md` contains the same integration contract, project commands, and the visual details that must not regress.

## Framer

The reliable route today is a **Framer Code Component**, not a Custom Code script:

1. In Framer, open **Assets → Code → Create Code File**.
2. Ask a coding agent to adapt the reusable clock source above into that single Framer code component, exposing a `theme` property control.
3. Paste the component onto the canvas and set its width/height to a square.

Framer code components are React components. Framer can technically import ES modules, but its npm support is still experimental; a purpose-built Framer component is more dependable than asking Framer to consume a generic npm package. [Framer’s Code Component guide](https://www.framer.com/developers/components-introduction) and [Framer’s npm guidance](https://www.framer.com/developers/faq) explain those limits.

## The easy npm route — planned, not published

Think of GitHub as the workshop where the clock is made. npm is the shop counter where people can pick up a boxed, versioned clock with one command.

Before `npm install` can work, this project needs a small library package with a stable name, a compiled React entry point, TypeScript types, and a chosen open-source licence. Then people would use something like:

```bash
npm install @asiffisa/timelapse-clock
```

```tsx
import { TimelapseClock } from '@asiffisa/timelapse-clock';
import '@asiffisa/timelapse-clock/styles.css';
```

That package name is only a proposed example; it has **not** been registered or published. Public npm packages are versioned packages that anyone can install from the npm registry. [npm’s public-package documentation](https://docs.npmjs.com/about-public-packages/) has the official overview.

## Run the playground locally

Prerequisite: Node.js 20 or later.

```bash
npm install
npm run dev
```

To make a production build:

```bash
npm run build
```

Open `http://localhost:3000/`, then pull the cord on the right to switch between light and dark. The cord is intentionally part of the demo scene; the reusable `Clock` component remains independent.

## Project map

- `components/Clock.tsx` — reusable component with `theme` and optional `timeZone` props.
- `components/Clock/` — dial, hands, glass, palette, self-contained `clock.css`, and rim/logo assets.
- `hooks/` — smooth real-time clock updates.
- `COMPONENT_COPY.md` — exact component-only copy and exclusion manifest.
- `App.tsx` — demo wall, monitor, installation tabs, and pull-cord interaction.
- `index.css` — playground layout, responsive scene styling, and clock styling.
- `public/plaster-wall-morning-cropped.png` — approved morning wall with the hanging vine, seamless plaster, and deliberately edge-masked pegboard.
- `public/plaster-wall-moonlight-matched.png` — composition-matched moonlit wall with the pegboard lamp subtly on.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the code map and [AGENTS.md](./AGENTS.md) for a concise agent handoff.
