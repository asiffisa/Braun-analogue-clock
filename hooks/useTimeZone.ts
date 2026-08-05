import { useEffect, useLayoutEffect } from 'react';

/** Timeless's friendly India default. It is normalized to the browser's official India zone below. */
export const IST_TIME_ZONE = 'Asia/Chennai';

const TIME_ZONE_ALIASES: Record<string, string> = {
  'Asia/Chennai': 'Asia/Kolkata',
};

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const warnedZones = new Set<string>();
const resolvedZones = new Map<string, string | undefined>();
const formatters = new Map<string, Intl.DateTimeFormat>();

const createFormatter = (timeZone: string | undefined) =>
  new Intl.DateTimeFormat('en-US-u-nu-latn', {
    ...(timeZone === undefined ? {} : { timeZone }),
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

/**
 * Maps Timeless's aliases onto real IANA names and checks the browser actually
 * knows the zone.
 *
 * `new Intl.DateTimeFormat({ timeZone })` throws a RangeError on an unknown
 * name, and this runs during render, so a single typo would otherwise take down
 * the host app. An unrecognized zone falls back to the device's own zone and
 * warns once.
 *
 * Returns `undefined` for "use this device's zone".
 */
export const resolveTimeZone = (timeZone: string): string | undefined => {
  if (resolvedZones.has(timeZone)) return resolvedZones.get(timeZone);

  const requested = TIME_ZONE_ALIASES[timeZone] ?? timeZone;
  let resolved: string | undefined;

  try {
    createFormatter(requested);
    resolved = requested;
  } catch {
    resolved = undefined;
    if (!warnedZones.has(timeZone)) {
      warnedZones.add(timeZone);
      console.warn(
        `[Timeless] "${timeZone}" is not a time zone this browser recognizes. Falling back to this device's zone.`,
      );
    }
  }

  resolvedZones.set(timeZone, resolved);
  return resolved;
};

const getFormatter = (timeZone: string): Intl.DateTimeFormat => {
  const resolved = resolveTimeZone(timeZone);
  const key = resolved ?? '';
  let formatter = formatters.get(key);

  if (!formatter) {
    formatter = createFormatter(resolved);
    formatters.set(key, formatter);
  }

  return formatter;
};

/** Reads wall-clock time for a zone. Intl handles daylight saving, unlike a fixed UTC offset. */
export const readClockTime = (timeZone: string, now = new Date()): ClockTime => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  for (const part of getFormatter(timeZone).formatToParts(now)) {
    // A few engines report midnight as 24 under `h23`, so fold it back to 0.
    if (part.type === 'hour') hours = Number(part.value) % 24;
    else if (part.type === 'minute') minutes = Number(part.value);
    else if (part.type === 'second') seconds = Number(part.value);
  }

  return { hours, minutes, seconds, milliseconds: now.getMilliseconds() };
};

/** Formats the time for assistive technology, in the reader's own locale. */
export const readClockLabel = (timeZone: string, now = new Date()): string => {
  const resolved = resolveTimeZone(timeZone);

  return new Intl.DateTimeFormat(undefined, {
    ...(resolved === undefined ? {} : { timeZone: resolved }),
    hour: 'numeric',
    minute: '2-digit',
  }).format(now);
};

/**
 * Checkpoints land on :00 and :30 of every wall-clock minute.
 *
 * The hands are animated by the browser's animation engine, so nothing here
 * runs per frame. This heartbeat exists only to re-anchor them to the wall
 * clock, covering the cases where a monotonic animation timeline and real time
 * drift apart: daylight-saving jumps, NTP corrections, and sleep/resume.
 * Landing on :00 also means the accessible label never shows a stale minute.
 */
const SYNC_INTERVAL_MS = 30_000;

/** Clears the boundary so a checkpoint never lands a hair before the minute ticks over. */
const SYNC_GUARD_MS = 20;

type SyncListener = () => void;

const listeners = new Set<SyncListener>();
let timerId: ReturnType<typeof setTimeout> | undefined;

const notify = () => {
  for (const listener of [...listeners]) listener();
};

const scheduleNextSync = () => {
  const delay = SYNC_INTERVAL_MS - (Date.now() % SYNC_INTERVAL_MS) + SYNC_GUARD_MS;
  timerId = setTimeout(() => {
    notify();
    scheduleNextSync();
  }, delay);
};

const handleWake = () => {
  if (document.visibilityState === 'visible') notify();
};

const startHeartbeat = () => {
  document.addEventListener('visibilitychange', handleWake);
  window.addEventListener('pageshow', handleWake);
  scheduleNextSync();
};

const stopHeartbeat = () => {
  document.removeEventListener('visibilitychange', handleWake);
  window.removeEventListener('pageshow', handleWake);
  if (timerId !== undefined) clearTimeout(timerId);
  timerId = undefined;
};

/** `useLayoutEffect` warns during SSR, where there is no layout to flush anyway. */
export const useClockLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Runs `onSync` once before the first paint, then on every shared checkpoint and
 * whenever the tab is restored. Every clock on the page shares one timer, so a
 * wall of clocks costs no more than a single one.
 *
 * Pass a `useCallback`-stable function.
 */
export const useClockSync = (onSync: SyncListener): void => {
  useClockLayoutEffect(() => {
    onSync();

    if (listeners.size === 0) startHeartbeat();
    listeners.add(onSync);

    return () => {
      listeners.delete(onSync);
      if (listeners.size === 0) stopHeartbeat();
    };
  }, [onSync]);
};
