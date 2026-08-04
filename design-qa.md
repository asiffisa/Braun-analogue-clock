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

## Capture and Normalization

- Desktop browser viewport: `1280 x 1200` CSS pixels at device scale factor `1`.
- Monitor refinement viewport: `1310 x 886` CSS pixels at device scale factor `1`; full-page captures are `1295 x 1276` pixels because the vertical scrollbar consumes `15px` of viewport width.
- Desktop browser capture: `1265 x 1861` pixels; page content was inspected against CSS bounds because the in-app browser capture applies a scaled full-page density.
- Desktop frame: `1180px` wide. Inner content column: `1040px` wide. Clock: `424px` wide.
- Mobile browser viewport: `360 x 812` CSS pixels. Frame: `336px`, clock: `270px`, monitor: `298px`, document scroll width: `360px`.
- Warm-plaster comparison: source `1090 x 866` pixels; rendered light page `1265 x 1271` pixels at device scale factor `1`. The combined comparison isolates the source wall/clock region and the implementation's `.wall-scene` region.
- States checked: light, dark, pull-cord toggle, Agent tab, React tab, icon-only copy control, copy feedback, desktop, and mobile.

## Full-view Comparison

The supplied sketch calls for one contained landing page with a header/copy area, a wall clock with a right-side pull cord, and a monitor below. The implementation follows that hierarchy inside one rounded frame: Timelapse navigation and copy at the top, a live Braun-style clock in the wall scene, a functional pull cord to its right, and a monitor-style install panel beneath.

The source is a structural sketch rather than a pixel-perfect visual reference. The restrained wall, charcoal monitor, yellow accent, and modern typography are intentional interpretations that preserve its physical-object direction.

The selected warm-plaster wall now uses the photographic `plaster-wall-daylight.png` asset. Its broad, softly feathered daylight sweep enters from the left and moves through the lower wall, adding the uneven luminance that makes the scene read as a real room. The monitor deliberately remains a foreground object: it has no wall niche or reveal, is cropped at the canvas bottom, and uses layered contact/depth shadows to read as resting in front of the wall.

## Focused-region Comparison

- Clock and cord: the clock remains the primary physical object. The cord is a semantic button, changes the entire page and clock theme, and updates its accessible label from “Pull for dark” to “Pull for light”.
- Monitor: Agent remains first and selected by default. Agent and React change the displayed content, while the same compact copy icon stays available in both states. The React sample uses source-like token colours without changing the underlying copy-ready string.
- Responsive layout: the mobile scene keeps the cord reachable and the monitor within the frame without horizontal overflow.
- Warm wall and monitor: the source and implementation were compared side-by-side in `design-evidence/wall-material-comparison.png`. The warm off-white plaster, daylight sweep, and right-side cord are present; the light clock face is an intentional interactive light-theme state, not a source mismatch.

## Required Fidelity Surfaces

- Fonts and typography: Google Sans-based display and body typography establish clear hierarchy, while monitor content uses an explicit `ui-monospace` stack. React keywords, components, properties, strings, and comments have distinct source-like colours.
- Spacing and layout rhythm: the single frame, centered content column, clock scene, and monitor spacing preserve the sketch's stacked object layout.
- Colors and visual tokens: light mode uses the selected warm off-white plaster asset with real, uneven daylight baked into the material. Dark mode uses its own charcoal-taupe plaster asset, with matching grain and no daylight ray, then dims the room while the monitor remains above the dimming layer as its own light-emitting object.
- Image quality and asset fidelity: supplied Braun rim and logo assets are retained at native aspect ratios. No source imagery was stretched or replaced.
- Copy and content: site copy accurately describes the current React component. It does not claim a published package or React Native support that does not exist yet.
- Accessibility: semantic navigation links, labelled regions, accessible tabs, aria-selected states, a labelled cord button, aria-live theme feedback, visible focus styles, and reduced-motion coverage are present.

## Findings

- No actionable P0, P1, or P2 issues remain.
- [P3] The desktop screenshot renderer applies a scaled full-page density, so final visual inspection should also be done in the deployed browser; CSS-layout metrics and mobile capture show no layout overflow or clipping.

## Interaction and Runtime Checks

- Pull-cord theme toggle: passed.
- Pull-cord values: passed (`gravity: 1250`, `damping: 0.975`, `iterations: 12`, `stretchMax: 49`).
- Clock light/dark theme swap: passed.
- Agent-first default and React tab: passed.
- React syntax colours and monospace stack: passed.
- Icon-only copy control in both tabs: passed.
- Copy code feedback: passed.
- Mobile horizontal overflow: passed (`360px` document width at `360px` viewport).
- TypeScript check: passed.
- Production build: passed.

## Comparison History

- Pass 1: the landing page was implemented from the structural sketch, then inspected in light and dark states. The required header, clock/cord, and monitor regions were present.
- Pass 2: the pull cord, tabs, copy confirmation, and mobile metrics were verified. No P0/P1/P2 mismatch remained.
- Pass 3: compared the supplied syntax and copy-control references with fresh Agent and React browser captures. Replaced visible copy text with one accessible icon control, added React token colours, preserved monospaced typography, and updated the four requested pull-cord values. Post-fix inspection found no P0/P1/P2 mismatch in the requested areas.
- Pass 4: compared the selected warm-plaster source and a fresh light-theme wall-scene capture in `design-evidence/wall-material-comparison.png`. Kept the chosen photographic plaster asset, removed any monitor-recess treatment, and refined the monitor's layered foreground shadow. Post-fix comparison found no actionable P0/P1/P2 mismatch in the requested wall/monitor direction.
- Pass 5: compared the daylight-ray target and a fresh browser capture in `design-evidence/daylight-ray-comparison.png`. Replaced the flat wall image with a real warm-plaster daylight asset featuring a broad, organically feathered light sweep from the left. The live clock, cord, and floating monitor remain separate foreground elements. Post-fix comparison found no actionable P0/P1/P2 mismatch in the requested wall-light direction.
- Pass 6: created a dedicated `plaster-wall-dark.png` from the selected light wall's material direction. It retains fine warm plaster grain and the faint panel seam, removes the daylight ray, and is used only by the dark scene. This fixes the root cause: the dark scene no longer relies on a dimmed light-wall image.

final result: passed
