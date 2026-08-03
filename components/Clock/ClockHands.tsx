import React from 'react';
import { CLOCK_THEMES, type ClockThemeName } from './constants';

interface ClockHandsProps {
    hours: number;
    minutes: number;
    seconds: number;
    theme: ClockThemeName;
}

const ClockHands: React.FC<ClockHandsProps> = ({ hours, minutes, seconds, theme }) => {
    const activeTheme = CLOCK_THEMES[theme];

    // Degrees calculation
    const secondDegrees = seconds * 6;
    const minuteDegrees = minutes * 6;
    const hourDegrees = hours * 30;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hour Hand */}
            <div
                className="clock-hand clock-hand--hour"
                style={{
                    backgroundColor: activeTheme.colors.hands.hour,
                    boxShadow: activeTheme.colors.shadows.hand,
                    transform: `translateX(-50%) rotate(${hourDegrees}deg)`,
                }}
            >
                <div
                    className="clock-hand__insert clock-hand__insert--hour"
                    style={{ backgroundColor: activeTheme.colors.hands.insert }}
                />
            </div>

            {/* Minute Hand */}
            <div
                className="clock-hand clock-hand--minute"
                style={{
                    backgroundColor: activeTheme.colors.hands.minute,
                    boxShadow: activeTheme.colors.shadows.hand,
                    transform: `translateX(-50%) rotate(${minuteDegrees}deg)`,
                }}
            >
                <div
                    className="clock-hand__insert clock-hand__insert--minute"
                    style={{ backgroundColor: activeTheme.colors.hands.insert }}
                />
            </div>

            {/* Second Hand with Shadow */}
            <div
                className="absolute inset-0 z-30"
                style={{
                    transform: `rotate(${secondDegrees}deg)`,
                    transformOrigin: 'center center',
                }}
            >
                {/* Main needle pointing UP (towards 12) */}
                <div
                    className="absolute"
                    style={{
                        width: '3px',
                        height: '136px',
                        left: '50%',
                        bottom: '50%',
                        marginLeft: '-1px',
                        marginBottom: '8px',
                        borderRadius: '1px 1px 0 0',
                        backgroundColor: activeTheme.colors.hands.second,
                        filter: `drop-shadow(5px 0px 3px ${activeTheme.colors.hands.secondShadow})`,
                    }}
                />

                {/* The counterweight and pivot form one rotating, continuous seconds-hand assembly. */}
                <div className="clock-second-pivot absolute inset-0">
                    <div
                        className="clock-second-tail absolute"
                        style={{
                            left: '50%',
                            top: 'calc(50% + 2.75% - 1px)',
                            width: '10px',
                            height: '16px',
                            backgroundColor: activeTheme.colors.hands.second,
                            borderRadius: '0 0 12px 12px',
                            transform: 'translateX(-50%)',
                            // Keep the pivot's drop shadow from tinting the solid yellow tail.
                            zIndex: 41,
                        }}
                    />

                    <div
                        className="clock-center-cap"
                        style={{
                            backgroundColor: activeTheme.colors.hands.centerCap,
                            boxShadow: activeTheme.colors.shadows.centerCap,
                        }}
                    >
                        <div
                            className="clock-center-cap__inner"
                            style={{
                                backgroundColor: activeTheme.colors.hands.centerCap,
                                boxShadow: `inset 0 1px 1px ${activeTheme.colors.hands.centerCapInset}`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClockHands;
