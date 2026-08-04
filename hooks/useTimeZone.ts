import { useEffect, useMemo, useState } from 'react';

/** Timelapse's friendly India default. It is normalized to the browser's official India zone below. */
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

const createFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-US-u-nu-latn', {
    timeZone: TIME_ZONE_ALIASES[timeZone] ?? timeZone,
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const readClockTime = (formatter: Intl.DateTimeFormat): ClockTime => {
  const now = new Date();
  const values = Object.fromEntries(
    formatter
      .formatToParts(now)
      .filter((part) => part.type === 'hour' || part.type === 'minute' || part.type === 'second')
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    hours: values.hour,
    minutes: values.minute,
    seconds: values.second,
    milliseconds: now.getMilliseconds(),
  };
};

/**
 * Returns a continuously updating wall-clock time for an IANA time-zone name.
 * Intl handles daylight-saving changes, unlike a fixed UTC offset.
 */
export const useTimeZone = (timeZone: string): ClockTime => {
  const formatter = useMemo(() => createFormatter(timeZone), [timeZone]);
  const [time, setTime] = useState(() => readClockTime(formatter));

  useEffect(() => {
    let frameId: number;

    const update = () => {
      setTime(readClockTime(formatter));
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [formatter]);

  return time;
};
