import React, { memo, useId, type CSSProperties } from 'react';
import { CLOCK_GLASS, type ClockThemeName } from './constants';

interface ClockGlassProps {
    theme: ClockThemeName;
}

/**
 * The lens surface: fractal noise, softened, used as the displacement map that
 * bends the dial under the glass.
 *
 * These two primitives were measured at ~94% of the whole filter's cost, and
 * they are completely static — fixed seed, fixed frequency, no dependency on
 * whatever sits below the lens. Generated inline they sat in the backdrop path,
 * so every frame the hands moved the browser rebuilt a byte-identical texture.
 *
 * Handing the browser that texture as an image instead lets it rasterize once
 * and reuse the result, leaving only the displacement in the per-frame path.
 * The image is placed at absolute coordinates in the clock's own user space, so
 * the noise is sampled at exactly the coordinates feTurbulence would have used
 * at any clock size — verified pixel-identical (max channel difference 0) at
 * 230px, 312px and 400px.
 */
const NOISE_ORIGIN = -40;

/** Covers any clock up to 800 CSS px, twice the default `maxSize`. */
const NOISE_SPAN = 880;

const NOISE_BASE_FREQUENCY = '0.009 0.014';
const NOISE_SEED = 7;

const noiseHrefs = new Map<number, string>();

const buildNoiseHref = (softness: number): string => {
    const cached = noiseHrefs.get(softness);
    if (cached) return cached;

    const markup =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${NOISE_SPAN}" height="${NOISE_SPAN}" ` +
        `viewBox="${NOISE_ORIGIN} ${NOISE_ORIGIN} ${NOISE_SPAN} ${NOISE_SPAN}">` +
        `<filter id="n" x="${NOISE_ORIGIN}" y="${NOISE_ORIGIN}" width="${NOISE_SPAN}" height="${NOISE_SPAN}" ` +
        `filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">` +
        `<feTurbulence type="fractalNoise" baseFrequency="${NOISE_BASE_FREQUENCY}" numOctaves="1" seed="${NOISE_SEED}" result="s"/>` +
        `<feGaussianBlur in="s" stdDeviation="${softness}"/>` +
        `</filter>` +
        `<rect x="${NOISE_ORIGIN}" y="${NOISE_ORIGIN}" width="${NOISE_SPAN}" height="${NOISE_SPAN}" filter="url(#n)"/>` +
        `</svg>`;

    // One href per softness value, so every clock on the page shares one raster.
    const href = `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
    noiseHrefs.set(softness, href);
    return href;
};

const ClockGlass: React.FC<ClockGlassProps> = memo(({ theme }) => {
    // React's generated ids carry punctuation that is illegal in a CSS ident and
    // in a url() fragment, and the exact characters have changed between React
    // versions. Strip everything that is not ident-safe rather than the one
    // separator a given version happens to use.
    const filterId = `clock-glass-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const glass = CLOCK_GLASS[theme];
    const glassStyle = {
        '--glass-upper-reflection-opacity': glass.upperReflectionOpacity,
        '--glass-left-curve-opacity': glass.leftCurveOpacity,
        '--glass-left-curve-inset': `${glass.leftCurveInset}%`,
        '--glass-left-curve-thickness': `${glass.leftCurveThickness}px`,
        backdropFilter: `url(#${filterId}) blur(${glass.blur}px) saturate(${glass.saturation}) contrast(${glass.contrast})`,
        WebkitBackdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}) contrast(${glass.contrast})`,
    } as CSSProperties;

    return (
        <>
            <svg className="clock-glass-filter" aria-hidden="true">
                <defs>
                    <filter
                        id={filterId}
                        x="-5%"
                        y="-5%"
                        width="110%"
                        height="110%"
                        colorInterpolationFilters="sRGB"
                    >
                        {/* Pre-rasterized surface texture; see buildNoiseHref above. */}
                        <feImage
                            href={buildNoiseHref(glass.surfaceSoftness)}
                            x={NOISE_ORIGIN}
                            y={NOISE_ORIGIN}
                            width={NOISE_SPAN}
                            height={NOISE_SPAN}
                            preserveAspectRatio="none"
                            result="softSurface"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="softSurface"
                            scale={glass.refraction}
                            xChannelSelector="R"
                            yChannelSelector="B"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className={`clock-glass clock-glass--${theme}`}
                aria-hidden="true"
                style={glassStyle}
            >
                <div className="clock-glass__upper-reflection" />
                <div className="clock-glass__left-curve" />
            </div>
        </>
    );
});

ClockGlass.displayName = 'ClockGlass';

export default ClockGlass;
