import React from 'react';
import { CLOCK_THEME, CLOCK_DIMENSIONS } from './constants';

const ClockFace: React.FC = () => {
    return (
        <div
            className="absolute inset-0 rounded-full border-[4px]"
            style={{ borderColor: CLOCK_THEME.colors.border }}
        >
            <div className="absolute inset-0">
                {Array.from({ length: 60 }).map((_, i) => {
                    const isHour = i % 5 === 0;
                    const angle = i * 6;
                    const radius = CLOCK_DIMENSIONS.radius;

                    if (isHour) {
                        // Replace hour dash with Number
                        const num = i === 0 ? 12 : i / 5;
                        return (
                            <div
                                key={i}
                                className="absolute w-12 h-12 flex items-center justify-center font-medium text-2xl"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    color: CLOCK_THEME.colors.numbers,
                                    // Translate to position, then counter-rotate to keep number upright
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${radius}px) rotate(-${angle}deg)`,
                                }}
                            >
                                {num}
                            </div>
                        );
                    }

                    // Small Minute Ticks
                    return (
                        <div
                            key={i}
                            className="absolute w-[1px] h-[12px]"
                            style={{
                                left: '50%',
                                top: '50%',
                                backgroundColor: CLOCK_THEME.colors.ticks,
                                // Rotate and push out to the same radius circle
                                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${radius}px)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ClockFace;
