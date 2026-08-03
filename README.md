# Timelapse

Timelapse is a Braun-inspired analogue clock for the web. It has a real-time sweep, light and dark themes, a convex glass layer, and an optional pull-cord playground.

## Use it today

This repository is currently the **source project**. It is not an npm package yet.

To use the clock in a React app today:

1. Copy `components/Clock.tsx`, the complete `components/Clock/` folder, and the `hooks/` folder into your app.
2. Copy the clock-related CSS from `index.css` and keep the SVG/WebP assets alongside the component.
3. Render it with `import Clock from "./components/Clock"` and `<Clock theme="light" />`.

The public component API is deliberately small:

```tsx
<Clock theme="light" />
<Clock theme="dark" />
```

The pull cord belongs to this playground, not to the reusable clock. It uses the separate `pullcord` dependency.

## For coding agents

Give your agent this prompt:

> Integrate the Timelapse clock from `github.com/asiffisa/Braun-analogue-clock` into this React app. Copy `components/Clock.tsx`, `components/Clock/`, and `hooks/`. Preserve the clock CSS and image/SVG assets. Keep its public API as `theme="light" | "dark"`; do not bring over the landing page or pull-cord playground.

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

## Project map

- `components/Clock.tsx` — reusable component and its `theme` prop.
- `components/Clock/` — dial, hands, glass, palette, and rim/logo assets.
- `hooks/` — smooth real-time clock updates.
- `App.tsx` — demo wall, monitor, and pull-cord interaction.
- `index.css` — playground layout and clock styling.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the code map and [AGENTS.md](./AGENTS.md) for a concise agent handoff.
