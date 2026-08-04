import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { readClockTime, useClockLayoutEffect, useClockSync } from '../../hooks/useTimeZone';

const HOUR_PERIOD_MS = 43_200_000;
const MINUTE_PERIOD_MS = 3_600_000;
const SECOND_PERIOD_MS = 60_000;

/**
 * The hour and minute hands keep the `translateX(-50%)` that centres them on the
 * spindle; only the rotation changes, so the transform list stays interpolatable
 * and the compositor can run it without the main thread.
 */
const OFFSET_TURN: Keyframe[] = [
  { transform: 'translateX(-50%) rotate(0deg)' },
  { transform: 'translateX(-50%) rotate(360deg)' },
];

/** The seconds assembly already fills the shell, so it spins about its own centre. */
const CENTRED_TURN: Keyframe[] = [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(360deg)' },
];

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

export interface ClockHandRefs {
  hour: RefObject<HTMLDivElement | null>;
  minute: RefObject<HTMLDivElement | null>;
  second: RefObject<HTMLDivElement | null>;
}

/**
 * Drives the three hands as continuous rotations owned by the browser's
 * animation engine rather than by React.
 *
 * A clock is a linear function of time, so it needs no per-frame work at all:
 * each hand gets one infinite rotation whose playhead is seeked to the current
 * wall-clock position. That means zero renders, zero allocations and zero
 * main-thread JavaScript per frame, and the sweep stays smooth even while the
 * main thread is busy. `useClockSync` re-seeks on a shared 30-second checkpoint
 * so the hands cannot drift away from real time.
 */
export const useClockHands = (timeZone: string): ClockHandRefs => {
  const hour = useRef<HTMLDivElement | null>(null);
  const minute = useRef<HTMLDivElement | null>(null);
  const second = useRef<HTMLDivElement | null>(null);
  const animations = useRef<Animation[]>([]);

  // Swapping the seconds easing means rebuilding the animation, so the
  // preference has to be state rather than an inline read.
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReducedMotion(query.matches);

    query.addEventListener('change', onChange);
    onChange();

    return () => query.removeEventListener('change', onChange);
  }, []);

  const seek = useCallback(() => {
    const [hourAnimation, minuteAnimation, secondAnimation] = animations.current;
    if (!hourAnimation || !minuteAnimation || !secondAnimation) return;

    const time = readClockTime(timeZone);
    const secondPhase = time.seconds * 1_000 + time.milliseconds;
    const minutePhase = time.minutes * 60_000 + secondPhase;
    const hourPhase = (time.hours % 12) * 3_600_000 + minutePhase;

    hourAnimation.currentTime = hourPhase;
    minuteAnimation.currentTime = minutePhase;
    secondAnimation.currentTime = secondPhase;
  }, [timeZone]);

  // Must be a layout effect, and must be declared above `useClockSync`, so the
  // hands are built and seeked before the browser paints. A passive effect here
  // would flash a 12:00 clock for one frame on mount.
  useClockLayoutEffect(() => {
    const hourElement = hour.current;
    const minuteElement = minute.current;
    const secondElement = second.current;

    // Engines without the Web Animations API keep a static, readable dial
    // rather than a broken one.
    if (
      !hourElement ||
      !minuteElement ||
      !secondElement ||
      typeof hourElement.animate !== 'function'
    ) {
      return;
    }

    const built = [
      hourElement.animate(OFFSET_TURN, {
        duration: HOUR_PERIOD_MS,
        iterations: Infinity,
        easing: 'linear',
      }),
      minuteElement.animate(OFFSET_TURN, {
        duration: MINUTE_PERIOD_MS,
        iterations: Infinity,
        easing: 'linear',
      }),
      secondElement.animate(CENTRED_TURN, {
        duration: SECOND_PERIOD_MS,
        iterations: Infinity,
        // Reduced motion keeps the time correct but trades the sweep for the
        // once-a-second tick of a quartz movement.
        easing: reducedMotion ? 'steps(60, jump-end)' : 'linear',
      }),
    ];

    animations.current = built;
    seek();

    return () => {
      for (const animation of built) animation.cancel();
      animations.current = [];
    };
  }, [reducedMotion, seek]);

  useClockSync(seek);

  return { hour, minute, second };
};
