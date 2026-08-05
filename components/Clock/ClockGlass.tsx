import React, { memo, useId, type CSSProperties } from 'react';
import { CLOCK_GLASS, type ClockThemeName } from './constants';

interface ClockGlassProps {
    theme: ClockThemeName;
}

const ClockGlass: React.FC<ClockGlassProps> = memo(({ theme }) => {
    // React's generated ids carry punctuation that is illegal in a CSS ident and
    // in a url() fragment, and the exact characters have changed between React
    // versions. Strip everything that is not ident-safe rather than the one
    // separator a given version happens to use.
    const filterId = `timeless-clock-glass-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const glass = CLOCK_GLASS[theme];
    const glassStyle = {
        '--timeless-clock-glass-upper-reflection-opacity': glass.upperReflectionOpacity,
        '--timeless-clock-glass-left-curve-opacity': glass.leftCurveOpacity,
        '--timeless-clock-glass-left-curve-inset': `${glass.leftCurveInset}%`,
        '--timeless-clock-glass-left-curve-thickness': `${glass.leftCurveThickness}px`,
        backdropFilter: `url(#${filterId}) blur(${glass.blur}px) saturate(${glass.saturation}) contrast(${glass.contrast})`,
        WebkitBackdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}) contrast(${glass.contrast})`,
    } as CSSProperties;

    return (
        <>
            <svg className="timeless-clock-glass-filter" aria-hidden="true">
                <defs>
                    <filter
                        id={filterId}
                        x="-5%"
                        y="-5%"
                        width="110%"
                        height="110%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.009 0.014"
                            numOctaves="1"
                            seed="7"
                            result="surface"
                        />
                        <feGaussianBlur in="surface" stdDeviation={glass.surfaceSoftness} result="softSurface" />
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
                className={`timeless-clock-glass timeless-clock-glass--${theme}`}
                aria-hidden="true"
                style={glassStyle}
            >
                <div className="timeless-clock-glass__upper-reflection" />
                <div className="timeless-clock-glass__left-curve" />
            </div>
        </>
    );
});

ClockGlass.displayName = 'ClockGlass';

export default ClockGlass;
