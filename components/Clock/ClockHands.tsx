import React from 'react';
import { CLOCK_THEME } from './constants';

interface ClockHandsProps {
    hours: number;
    minutes: number;
    seconds: number;
}

const ClockHands: React.FC<ClockHandsProps> = ({ hours, minutes, seconds }) => {
    // Degrees calculation
    const secondDegrees = seconds * 6;
    const minuteDegrees = minutes * 6;
    const hourDegrees = hours * 30;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hour Hand */}
            <div
                className="absolute z-20 rounded-full flex justify-center pt-[4px]"
                style={{
                    width: '10px',
                    height: '104px',
                    backgroundColor: CLOCK_THEME.colors.hands.hour,
                    boxShadow: CLOCK_THEME.colors.shadows.hand,
                    transform: `rotate(${hourDegrees}deg)`,
                    transformOrigin: 'bottom center',
                    bottom: '50%', // Anchor at center
                }}
            >
                {/* White slot/insert detail */}
                <div
                    className="w-[4px] rounded-full h-[32px] opacity-90"
                    style={{ backgroundColor: CLOCK_THEME.colors.hands.insert }}
                />
            </div>

            {/* Minute Hand */}
            <div
                className="absolute z-20 rounded-full flex justify-center pt-[4px]"
                style={{
                    width: '10px',
                    height: '144px',
                    backgroundColor: CLOCK_THEME.colors.hands.minute,
                    boxShadow: CLOCK_THEME.colors.shadows.hand,
                    transform: `rotate(${minuteDegrees}deg)`,
                    transformOrigin: 'bottom center',
                    bottom: '50%',
                }}
            >
                {/* White slot/insert detail */}
                <div
                    className="w-[4px] rounded-full h-[32px] opacity-90"
                    style={{ backgroundColor: CLOCK_THEME.colors.hands.insert }}
                />
            </div>

            {/* Second Hand with Shadow */}
            <div
                className="absolute z-30"
                style={{
                    transform: `rotate(${secondDegrees}deg)`,
                    transformOrigin: 'center center',
                }}
            >
                {/* Main needle pointing UP (towards 12) */}
                <div
                    className="absolute"
                    style={{
                        width: '2px',
                        height: '132px',
                        left: '50%',
                        bottom: '50%',
                        marginLeft: '-1px',
                        marginBottom: '8px', // Start just above the center cap
                        borderRadius: '1px 1px 0 0',
                        backgroundColor: CLOCK_THEME.colors.hands.second,
                        filter: `drop-shadow(5px 0px 3px ${CLOCK_THEME.colors.hands.secondShadow})`,
                    }}
                />

                {/* Keyhole tail section - stem extending DOWN from center */}
                <div
                    className="absolute"
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '10px', // Position tail section below center cap
                    }}
                >
                    {/* Thin stem extending DOWN */}
                    <div
                        style={{
                            width: '8px',
                            height: '16px',
                            backgroundColor: CLOCK_THEME.colors.hands.second,
                            borderRadius: '0 0 12px 12px',
                        }}
                    />
                </div>
            </div>

            {/* Center Cap (Yellow Pivot) */}
            <div
                className="absolute z-40 rounded-full flex items-center justify-center"
                style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: CLOCK_THEME.colors.hands.centerCap,
                }}
            >
                {/* Small keyhole ball INSIDE center cap, centered */}
                <div
                    className="rounded-full"
                    style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: CLOCK_THEME.colors.hands.centerCap,
                        boxShadow: `inset 0 1px 1px ${CLOCK_THEME.colors.hands.centerCapInset}`,
                    }}
                />
            </div>
        </div>
    );
};

export default ClockHands;
