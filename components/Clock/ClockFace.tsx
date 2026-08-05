import React, { memo } from 'react';
import { CLOCK_THEMES, CLOCK_DIMENSIONS, type ClockThemeName } from './constants';
import braunLogo from './Braun_Logo.svg';
import silverRimImg from './rim-silver.webp';
import blackRimImg from './rim-black.webp';

interface ClockFaceProps {
    theme: ClockThemeName;
}

/** The dial never changes shape, so its 60 positions are trigonometry done once at module load. */
const DIAL_MARKS = Array.from({ length: 60 }, (_, index) => {
    const angle = index * 6;
    const radians = (angle * Math.PI) / 180;

    return {
        index,
        angle,
        isHour: index % 5 === 0,
        hour: index === 0 ? 12 : index / 5,
        left: `${50 + Math.sin(radians) * CLOCK_DIMENSIONS.radiusPercent}%`,
        top: `${50 - Math.cos(radians) * CLOCK_DIMENSIONS.radiusPercent}%`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
    };
});

const ClockFace: React.FC<ClockFaceProps> = memo(({ theme }) => {
    const activeTheme = CLOCK_THEMES[theme];
    const rimImage = theme === 'dark' ? blackRimImg : silverRimImg;

    return (
        <div className="timeless-clock-face-layer">
            {/* Theme-specific metal rim, placed behind the dial. */}
            <div className="timeless-clock-rim">
                <img
                    src={rimImage}
                    alt=""
                    aria-hidden="true"
                    className="timeless-clock-rim__image"
                />
            </div>

            {/* Dial covers the transparent center of the rim image. */}
            <div
                className="timeless-clock-dial"
                style={{ background: activeTheme.colors.dial }}
            >
                {/* Braun Logo below 12 */}
                <div className="timeless-clock-logo">
                    <img
                        src={braunLogo}
                        alt=""
                        aria-hidden="true"
                        className="timeless-clock-logo__image"
                        style={{
                            filter: activeTheme.colors.logoFilter,
                            opacity: activeTheme.colors.logoOpacity,
                        }}
                    />
                </div>
                {DIAL_MARKS.map((mark) =>
                    mark.isHour ? (
                        <div
                            key={mark.index}
                            className="timeless-clock-number"
                            style={{
                                left: mark.left,
                                top: mark.top,
                                color: activeTheme.colors.numbers,
                            }}
                        >
                            {mark.hour}
                        </div>
                    ) : (
                        <div
                            key={mark.index}
                            className="timeless-clock-tick"
                            style={{
                                left: mark.left,
                                top: mark.top,
                                backgroundColor: activeTheme.colors.ticks,
                                opacity: activeTheme.colors.tickOpacity,
                                transform: mark.transform,
                            }}
                        />
                    ),
                )}
            </div>
        </div>
    );
});

ClockFace.displayName = 'ClockFace';

export default ClockFace;
