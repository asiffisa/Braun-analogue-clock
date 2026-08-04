export const CLOCK_DIMENSIONS = {
    size: 400,
    radiusPercent: 44.5,
};

export type ClockThemeName = 'light' | 'dark';

/**
 * Tweak the clock lens here without changing the component CSS.
 *
 * - refraction / surfaceSoftness: how much the dial bends through the glass.
 * - blur / saturation / contrast: the optical finish applied to the dial below.
 * - leftCurve*: the clean embossed contour that follows the left side of the lens.
 */
export const CLOCK_GLASS = {
    light: {
        refraction: 1.35,
        surfaceSoftness: 1.8,
        blur: 0.25,
        saturation: 1.08,
        contrast: 1.025,
        upperReflectionOpacity: 0.5,
        leftCurveOpacity: 0.3,
        leftCurveInset: 1,
        leftCurveThickness: 1,
    },
    dark: {
        refraction: 1.8,
        surfaceSoftness: 1.8,
        blur: 0.25,
        saturation: 1.08,
        contrast: 1.025,
        upperReflectionOpacity: 0.34,
        leftCurveOpacity: 0.58,
        leftCurveInset: 0.85,
        leftCurveThickness: 1.25,
    },
} as const;

export const CLOCK_THEMES = {
    light: {
        colors: {
            dial: 'radial-gradient(circle at 38% 30%, #ffffff 0%, #fafafa 58%, #f4f4f2 100%)',
            ticks: '#171717',
            tickOpacity: 0.6,
            numbers: '#111111',
            logoFilter: 'none',
            logoOpacity: 0.9,
            hands: {
                hour: '#111111',
                minute: '#111111',
                second: '#F2AA12',
                secondShadow: 'rgba(0, 0, 0, 0.24)',
                centerCap: '#F2AA12',
                centerCapInset: 'rgba(255, 229, 156, 0.95)',
                insert: '#F5F5F2',
                insertHour: '#F2AA12',
                insertMinute: '#F5F5F2',
            },
            shadows: {
                hand: '5px 9px 12px rgba(0, 0, 0, 0.18)',
                centerCap: '2px 5px 8px rgba(0, 0, 0, 0.22)',
            },
        },
    },
    dark: {
        colors: {
            dial: 'radial-gradient(circle at 36% 27%, #282927 0%, #1B1C1B 48%, #111211 100%)',
            ticks: '#F0F0EA',
            tickOpacity: 0.75,
            numbers: '#E9E9E4',
            logoFilter: 'invert(1) brightness(1.25)',
            logoOpacity: 0.92,
            hands: {
                hour: '#E7E9E5',
                minute: '#E7E9E5',
                second: '#F2AA12',
                secondShadow: 'rgba(0, 0, 0, 0.52)',
                centerCap: '#F2AA12',
                centerCapInset: 'rgba(255, 222, 124, 0.88)',
                insert: '#F2AA12',
                insertHour: '#000000',
                insertMinute: '#F2AA12',
            },
            shadows: {
                hand: '5px 10px 14px rgba(0, 0, 0, 0.48)',
                centerCap: '2px 5px 9px rgba(0, 0, 0, 0.48)',
            },
        },
    },
} as const;
