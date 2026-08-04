import React, { memo, type CSSProperties } from 'react';
import { CLOCK_THEMES, type ClockThemeName } from './constants';
import { useClockHands } from './useClockHands';

interface ClockHandsProps {
    theme: ClockThemeName;
    timeZone: string;
}

/**
 * The rotations are not React state. `useClockHands` hands each element to the
 * browser's animation engine, so this component renders once per theme change
 * instead of once per frame.
 *
 * The static transforms below are the hands' 12:00 rest position. They keep
 * server-rendered and pre-hydration markup correctly centred; the animations
 * override them as soon as they attach, before the first paint.
 */
const ClockHands: React.FC<ClockHandsProps> = memo(({ theme, timeZone }) => {
    const activeTheme = CLOCK_THEMES[theme];
    const hands = useClockHands(timeZone);

    return (
        <div className="clock-hands-layer">
            {/* Hour Hand */}
            <div
                ref={hands.hour}
                className="clock-hand clock-hand--hour"
                style={{
                    backgroundColor: activeTheme.colors.hands.hour,
                    '--clock-hand-shadow-color': activeTheme.colors.shadows.hand,
                    transform: 'translateX(-50%)',
                } as CSSProperties}
            >
                <div
                    className="clock-hand__insert clock-hand__insert--hour"
                    style={{ backgroundColor: activeTheme.colors.hands.insertHour ?? activeTheme.colors.hands.insert }}
                />
            </div>

            {/* Minute Hand */}
            <div
                ref={hands.minute}
                className="clock-hand clock-hand--minute"
                style={{
                    backgroundColor: activeTheme.colors.hands.minute,
                    '--clock-hand-shadow-color': activeTheme.colors.shadows.hand,
                    transform: 'translateX(-50%)',
                } as CSSProperties}
            >
                <div
                    className="clock-hand__insert clock-hand__insert--minute"
                    style={{ backgroundColor: activeTheme.colors.hands.insertMinute ?? activeTheme.colors.hands.insert }}
                />
            </div>

            {/* Second Hand with Shadow */}
            <div
                ref={hands.second}
                className="clock-seconds-assembly"
                style={{ transformOrigin: 'center center' }}
            >
                {/* Main needle pointing UP (towards 12) */}
                <div
                    className="clock-second-needle"
                    style={{
                        backgroundColor: activeTheme.colors.hands.second,
                        '--clock-second-shadow-color': activeTheme.colors.hands.secondShadow,
                    } as CSSProperties}
                />

                {/* The counterweight and pivot form one rotating, continuous seconds-hand assembly. */}
                <div className="clock-second-pivot">
                    <div
                        className="clock-second-tail"
                        style={{
                            backgroundColor: activeTheme.colors.hands.second,
                            // Keep the pivot's drop shadow from tinting the solid yellow tail.
                            zIndex: 41,
                        }}
                    />

                    <div
                        className="clock-center-cap"
                        style={{
                            backgroundColor: activeTheme.colors.hands.centerCap,
                            '--clock-center-cap-shadow-color': activeTheme.colors.shadows.centerCap,
                        } as CSSProperties}
                    >
                        <div
                            className="clock-center-cap__inner"
                            style={{
                                backgroundColor: activeTheme.colors.hands.centerCap,
                                '--clock-center-cap-inset-color': activeTheme.colors.hands.centerCapInset,
                            } as CSSProperties}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

ClockHands.displayName = 'ClockHands';

export default ClockHands;
