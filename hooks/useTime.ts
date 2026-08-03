import { useState, useEffect } from 'react';

/**
 * A generalized hook to get the current time, optionally adjusted by a timezone offset.
 * @param offsetMs - The offset in milliseconds to add to UTC time. If undefined, uses local system time.
 */
export const useTime = (offsetMs?: number) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            if (offsetMs !== undefined) {
                // Calculate Target Time: UTC + offset
                const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                const targetDate = new Date(utc + offsetMs);
                setTime(targetDate);
            } else {
                setTime(now);
            }
        };

        let frameId: number;
        const loop = () => {
            updateTime();
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frameId);
    }, [offsetMs]);

    return time;
};
