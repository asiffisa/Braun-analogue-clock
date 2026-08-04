import React, { memo } from 'react';
import { CLOCK_THEMES, CLOCK_DIMENSIONS, type ClockThemeName } from './constants';
import braunLogo from './Braun_Logo.svg';
import silverRimImg from './sliver rim 1.webp';
import blackRimImg from './black rim 1.webp';

interface ClockFaceProps {
    theme: ClockThemeName;
}

const ClockFace: React.FC<ClockFaceProps> = memo(({ theme }) => {
    const activeTheme = CLOCK_THEMES[theme];
    const rimImage = theme === 'dark' ? blackRimImg : silverRimImg;

    return (
        <div className="clock-face-layer">
            {/* Theme-specific metal rim, placed behind the dial. */}
            <div className="clock-rim">
                <img
                    src={rimImage}
                    alt=""
                    aria-hidden="true"
                    className="clock-rim__image"
                />
            </div>

            {/* Dial covers the transparent center of the rim image. */}
            <div
                className="clock-dial"
                style={{ background: activeTheme.colors.dial }}
            >
                {/* Braun Logo below 12 */}
                <div className="clock-logo">
                    <img
                        src={braunLogo}
                        alt="Braun Logo"
                        className="clock-logo__image"
                        style={{
                            filter: activeTheme.colors.logoFilter,
                            opacity: activeTheme.colors.logoOpacity,
                        }}
                    />
                </div>
                {Array.from({ length: 60 }).map((_, i) => {
                    const isHour = i % 5 === 0;
                    const angle = i * 6;
                    const angleInRadians = (angle * Math.PI) / 180;
                    const left = 50 + Math.sin(angleInRadians) * CLOCK_DIMENSIONS.radiusPercent;
                    const top = 50 - Math.cos(angleInRadians) * CLOCK_DIMENSIONS.radiusPercent;

                    if (isHour) {
                        const num = i === 0 ? 12 : i / 5;
                        return (
                            <div
                                key={i}
                                className="clock-number"
                                style={{
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    color: activeTheme.colors.numbers,
                                }}
                            >
                                {num}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={i}
                            className="clock-tick"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                                backgroundColor: activeTheme.colors.ticks,
                                opacity: activeTheme.colors.tickOpacity,
                                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
});

ClockFace.displayName = 'ClockFace';

export default ClockFace;
