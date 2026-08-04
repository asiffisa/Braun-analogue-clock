import React, { useCallback, useState } from 'react';
import { IST_TIME_ZONE, readClockLabel, useClockSync } from '../hooks/useTimeZone';
import ClockFace from './Clock/ClockFace';
import ClockGlass from './Clock/ClockGlass';
import ClockHands from './Clock/ClockHands';
import { CLOCK_DIMENSIONS, type ClockThemeName } from './Clock/constants';
import './Clock/clock.css';

export interface ClockProps {
  theme?: ClockThemeName;
  /** An IANA time-zone name, or Timelapse's "Asia/Chennai" India alias. */
  timeZone?: string;
  /** Largest edge the clock will grow to, in pixels. It always stays square. */
  maxSize?: number;
  /**
   * Overrides the spoken description. By default the clock announces itself as
   * an image whose label is the time it is showing.
   */
  ariaLabel?: string;
}

export const DEFAULT_TIME_ZONE = IST_TIME_ZONE;

const Clock: React.FC<ClockProps> = ({
  theme = 'light',
  timeZone = DEFAULT_TIME_ZONE,
  maxSize = CLOCK_DIMENSIONS.size,
  ariaLabel,
}) => {
  // Starts empty so server and client markup agree, then fills in before the
  // first paint. Sync checkpoints land on the minute, so this is never stale.
  const [spokenTime, setSpokenTime] = useState('');

  const updateLabel = useCallback(() => {
    setSpokenTime(readClockLabel(timeZone));
  }, [timeZone]);

  useClockSync(updateLabel);

  return (
    <div
      className={`clock-shell clock-shell--${theme}`}
      data-clock-theme={theme}
      // Without this the dial is read out as the bare string "12 1 2 3 ... 11",
      // which tells a screen-reader user nothing about the time. `role="img"`
      // also hides the decorative dial parts underneath.
      role="img"
      aria-label={ariaLabel ?? (spokenTime ? `Analogue clock showing ${spokenTime}` : 'Analogue clock')}
      style={{
        maxWidth: `${maxSize}px`,
      }}
    >
      {/* Clock Face Layer */}
      <ClockFace theme={theme} />

      {/* Hands Container */}
      <ClockHands theme={theme} timeZone={timeZone} />

      {/* Convex glass lens above the complete mechanism */}
      <ClockGlass theme={theme} />
    </div>
  );
};

export default Clock;
