import React, { memo, useId, type CSSProperties } from 'react';
import { CLOCK_GLASS, type ClockThemeName } from './constants';

interface ClockGlassProps {
    theme: ClockThemeName;
}

const ClockGlass: React.FC<ClockGlassProps> = memo(({ theme }) => {
    const filterId = `clock-glass-${useId().replace(/:/g, '')}`;
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
