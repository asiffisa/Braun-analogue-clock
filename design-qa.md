# Timelapse Landing Page Design QA

## Evidence

- Source structure sketch: `/Users/asif/Desktop/CleanShot 2026-08-03 at 23.15.48@2x.png`
- Syntax-colour reference: `/Users/asif/Desktop/CleanShot 2026-08-04 at 04.33.56@2x.png`
- Icon-only copy-control reference: `/Users/asif/Desktop/CleanShot 2026-08-04 at 04.35.24@2x.png`
- Pull-cord physics reference: `/Users/asif/Desktop/CleanShot 2026-08-04 at 04.38.27@2x.png`
- Browser-rendered light page: `/tmp/timelapse-landing-light-qa.png`
- Browser-rendered dark page: `/tmp/timelapse-landing-dark-qa.png`
- Combined sketch and implementation comparison: `/tmp/timelapse-landing-comparison.png`
- Browser-rendered Agent monitor: `/tmp/timelapse-agent-monitor-qa.png`
- Browser-rendered React monitor: `/tmp/timelapse-react-monitor-qa.png`
- Selected warm-plaster reference: `/Users/asif/Desktop/CleanShot 2026-08-04 at 04.44.50@2x.png`
- Browser-rendered floating-monitor canvas: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/timelapse-light-floating-monitor.png`
- Combined warm-plaster comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/wall-material-comparison.png`
- Daylight-ray target: `/Users/asif/Desktop/CleanShot 2026-08-04 at 04.56.43@2x.png`
- Browser-rendered daylight wall: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/timelapse-light-daylight-wall.png`
- Combined daylight-ray comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/daylight-ray-comparison.png`
- Dark-mode wall material: `/Users/asif/Documents/Braun-analogue-clock/public/plaster-wall-dark.png`
- Approved morning wall source: `/Users/asif/.codex/generated_images/019fc8c3-7505-7fe3-86b5-f9840a43fea0/exec-b08fff4b-82bc-4eb2-975b-6052fb1aed98.png`
- Approved moonlight wall source: `/Users/asif/.codex/generated_images/019fc8c3-7505-7fe3-86b5-f9840a43fea0/exec-a9da0555-9a70-4c99-879a-e9cd4d7b050e.png`
- Browser-rendered morning scene: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/timelapse-morning-scene.png`
- Browser-rendered moonlight scene: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/timelapse-moonlight-scene.png`
- Morning source-to-live comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/morning-wall-comparison.png`
- Moonlight source-to-live comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/moonlight-wall-comparison.png`
- Final light source-to-live comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/final-light-pegboard-comparison.png`
- Final moonlight source-to-live comparison: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/final-moonlight-pegboard-comparison.png`
- Browser-rendered reusable-clock integration copy: `/Users/asif/Documents/Braun-analogue-clock/design-evidence/standalone-clock-style-check.jpg`

## Capture and Normalization

- Desktop browser viewport: `1280 x 1200` CSS pixels at device scale factor `1`.
- Monitor refinement viewport: `1310 x 886` CSS pixels at device scale factor `1`; full-page captures are `1295 x 1276` pixels because the vertical scrollbar consumes `15px` of viewport width.
- Desktop browser capture: `1265 x 1861` pixels; page content was inspected against CSS bounds because the in-app browser capture applies a scaled full-page density.
- Desktop frame: `1180px` wide. Inner content column: `1040px` wide. Clock: `424px` wide.
- Mobile browser viewport: `360 x 812` CSS pixels. Frame: `336px`, clock: `270px`, monitor: `298px`, document scroll width: `360px`.
- Warm-plaster comparison: source `1090 x 866` pixels; rendered light page `1265 x 1271` pixels at device scale factor `1`. The combined comparison isolates the source wall/clock region and the implementation's `.wall-scene` region.
- Morning and moonlight sources: `1254 x 1254` pixels. The live scene is `800 x 912` CSS pixels; each approved wall image is rendered at the full `800px` scene width without stretching or side-cropping. Matching legacy plaster only fills the monitor-masked lower edge below the square image.
- States checked: light, dark, pull-cord toggle, Agent tab, React tab, icon-only copy control, copy feedback, desktop, and mobile.

## Full-view Comparison

The supplied sketch calls for one contained landing page with a header/copy area, a wall clock with a right-side pull cord, and a monitor below. The implementation follows that hierarchy inside one rounded frame: Timelapse navigation and copy at the top, a live Braun-style clock in the wall scene, a functional pull cord to its right, and a monitor-style install panel beneath.

The source is a structural sketch rather than a pixel-perfect visual reference. The restrained wall, charcoal monitor, yellow accent, and modern typography are intentional interpretations that preserve its physical-object direction.

The approved scene now uses paired photographic wall assets: `plaster-wall-morning-cropped.png` and `plaster-wall-moonlight-matched.png`. Both preserve the same cropped hanging vine and leaf shadow on the left, the clear central clock area, and the narrow edge-masked pegboard on the right. In moonlight, the pegboard's small warm lamp is the only added light. The monitor deliberately remains a foreground object: it has no wall niche or reveal, is cropped at the canvas bottom, and uses layered contact/depth shadows to read as resting in front of the wall.

## Focused-region Comparison

- Clock and cord: the clock remains the primary physical object. The cord is a semantic button, changes the entire page and clock theme, and updates its accessible label from “Pull for dark” to “Pull for light”.
- Monitor: Agent remains first and selected by default. Agent and React change the displayed content, while the same compact copy icon stays available in both states. The React sample uses source-like token colours without changing the underlying copy-ready string.
- Responsive layout: the mobile scene keeps the cord reachable and the monitor within the frame without horizontal overflow.
- Morning and moonlight wall: the approved source and live implementation were compared side-by-side in `design-evidence/morning-wall-comparison.png` and `design-evidence/moonlight-wall-comparison.png`. The cropped plant, leaf shadow, empty clock zone, pegboard geometry, and dark-only pegboard lamp match in placement and direction.

## Required Fidelity Surfaces

- Fonts and typography: Google Sans-based display and body typography establish clear hierarchy, while monitor content uses an explicit `ui-monospace` stack. React keywords, components, properties, strings, and comments have distinct source-like colours.
- Spacing and layout rhythm: the single frame, centered content column, clock scene, and monitor spacing preserve the sketch's stacked object layout.
- Colors and visual tokens: light mode uses the approved warm morning plaster scene. Dark mode swaps to its composition-matched moonlight counterpart, retaining the same wall material and object placement while switching on only the pegboard lamp. A subtle room dimmer sits beneath the monitor, so the screen keeps reading as a light-emitting object.
- Image quality and asset fidelity: supplied Braun rim and logo assets are retained at native aspect ratios. The approved wall imagery is rendered at its full aspect ratio rather than cropped with `cover`; no source imagery is stretched.
- Copy and content: site copy accurately describes the current React component. It does not claim a published package or React Native support that does not exist yet.
- Accessibility: semantic navigation links, labelled regions, accessible tabs, aria-selected states, a labelled cord button, aria-live theme feedback, visible focus styles, and reduced-motion coverage are present.

## Findings

- No actionable P0, P1, or P2 issues remain.
- [P3] The desktop screenshot renderer applies a scaled full-page density, so final visual inspection should also be done in the deployed browser; CSS-layout metrics and mobile capture show no layout overflow or clipping.

## Interaction and Runtime Checks

- Pull-cord theme toggle: passed.
- Morning asset application: passed.
- Moonlight asset application after the cord interaction: passed.
- Monitor remains above the dark-room dimmer: passed.
- Pull-cord values: passed (`gravity: 1250`, `damping: 0.975`, `iterations: 12`, `stretchMax: 49`).
- Clock light/dark theme swap: passed.
- Agent-first default and React tab: passed.
- React syntax colours and monospace stack: passed.
- Icon-only copy control in both tabs: passed.
- Copy code feedback: passed.
- Mobile horizontal overflow: passed (`360px` document width at `360px` viewport).
- TypeScript check: passed.
- Production build: passed.
- Time-zone conversion: passed (`Asia/Chennai` normalizes to `Asia/Kolkata` and returns `05:30` for a UTC midnight reference; `America/New_York` returns `19:00` on the prior day).
- React install example: passed (browser capture includes the IST default and an `America/New_York` override).

## Comparison History

- Pass 1: the landing page was implemented from the structural sketch, then inspected in light and dark states. The required header, clock/cord, and monitor regions were present.
- Pass 2: the pull cord, tabs, copy confirmation, and mobile metrics were verified. No P0/P1/P2 mismatch remained.
- Pass 3: compared the supplied syntax and copy-control references with fresh Agent and React browser captures. Replaced visible copy text with one accessible icon control, added React token colours, preserved monospaced typography, and updated the four requested pull-cord values. Post-fix inspection found no P0/P1/P2 mismatch in the requested areas.
- Pass 4: compared the selected warm-plaster source and a fresh light-theme wall-scene capture in `design-evidence/wall-material-comparison.png`. Kept the chosen photographic plaster asset, removed any monitor-recess treatment, and refined the monitor's layered foreground shadow. Post-fix comparison found no actionable P0/P1/P2 mismatch in the requested wall/monitor direction.
- Pass 5: compared the daylight-ray target and a fresh browser capture in `design-evidence/daylight-ray-comparison.png`. Replaced the flat wall image with a real warm-plaster daylight asset featuring a broad, organically feathered light sweep from the left. The live clock, cord, and floating monitor remain separate foreground elements. Post-fix comparison found no actionable P0/P1/P2 mismatch in the requested wall-light direction.
- Pass 6: created a dedicated `plaster-wall-dark.png` from the selected light wall's material direction. It retains fine warm plaster grain and the faint panel seam, removes the daylight ray, and is used only by the dark scene. This fixes the root cause: the dark scene no longer relies on a dimmed light-wall image.
- Pass 7: tested the phone scene at `393px` and `360px` viewport widths. Replaced fixed-pixel seconds-hand dimensions with clock-relative percentages, so its `34%` needle length scales with the dial. The mobile monitor now scales as one `570px` source object at `0.58`, keeping its complete code area visible inside the canvas with no document-level horizontal overflow.
- Pass 8: implemented the user-approved morning and moonlight wall pair. The first `cover` mapping cropped the square source in the taller scene and hid the edge details, so the root cause was corrected by rendering each approved asset at the full scene width with no stretch or side crop. Fresh side-by-side source-to-live comparisons confirm that the vine, leaf shadow, pegboard, and dark-only warm lamp remain visible and composition-matched. No P0/P1/P2 issue remains.
- Pass 9: removed the right-side divider seam directly in the wall imagery, shifted the pull cord `10px` left, and restored the narrow original pegboard footprint after a wider-board experiment. The pegboard now remains edge-masked at the same position in both modes, with two complete hole columns and a partial third column. Moonlight uses the user-selected composition-matched neutral-taupe asset.
- Pass 10: compared the final light and moonlight wall assets against fresh live scenes in `design-evidence/final-light-pegboard-comparison.png` and `design-evidence/final-moonlight-pegboard-comparison.png`. The right edge contains two full pegboard slot columns plus the intended partial third column. The cord now has a `10px` larger right inset, placing it to the left of the board in both themes. No P0/P1/P2 issue remains.
- Pass 11: moved all reusable clock styles into `components/Clock/clock.css` and imported them from `Clock.tsx`. The component no longer carries an outer/background box shadow and no longer requires Tailwind utility classes or the playground `index.css`. The monitor now accurately tells React users and coding agents to copy only the clock files and to leave all wall, cord, monitor, tabs, and demo interactions behind.
- Pass 12: replaced the fixed IST offset in the reusable clock path with `useTimeZone`, backed by `Intl.DateTimeFormat`. `Clock` now defaults to the friendly `Asia/Chennai` alias (normalized to official `Asia/Kolkata`, IST, UTC+05:30) and accepts an explicit `timeZone` prop such as `America/New_York`; this also lets the browser handle daylight-saving changes. The React and Agent installation examples, README, architecture notes, and agent handoff now document that contract. Browser rendering and reference conversions passed.
- Pass 13: moved the component-only boundary into `COMPONENT_COPY.md`. The concise Agent prompt now points to that single source of truth: copy the three clock paths and exclude every demo-only path. Local visual evidence and unselected wall-image explorations are ignored by Git; the approved morning and moonlight assets remain available for the live scene.

final result: passed
