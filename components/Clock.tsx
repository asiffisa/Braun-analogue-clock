import React from 'react';
import { IST_TIME_ZONE, useTimeZone } from '../hooks/useTimeZone';
import ClockFace from './Clock/ClockFace';
import ClockGlass from './Clock/ClockGlass';
import ClockHands from './Clock/ClockHands';
import { CLOCK_DIMENSIONS, type ClockThemeName } from './Clock/constants';
import './Clock/clock.css';

export interface ClockProps {
  theme?: ClockThemeName;
  /** An IANA time-zone name, or Timelapse's "Asia/Chennai" India alias. */
  timeZone?: string;
}

export const DEFAULT_TIME_ZONE = IST_TIME_ZONE;

const Clock: React.FC<ClockProps> = ({ theme = 'light', timeZone = DEFAULT_TIME_ZONE }) => {
  const time = useTimeZone(timeZone);
  const seconds = time.seconds + time.milliseconds / 1000;
  const minutes = time.minutes + seconds / 60;
  const hours = (time.hours % 12) + minutes / 60;

  return (
    <div
      className={`clock-shell clock-shell--${theme}`}
      data-clock-theme={theme}
      style={{
        maxWidth: `${CLOCK_DIMENSIONS.size}px`,
      }}
    >
      {/* Clock Face Layer */}
      <ClockFace theme={theme} />

      {/* Hands Container */}
      <ClockHands hours={hours} minutes={minutes} seconds={seconds} theme={theme} />

      {/* Convex glass lens above the complete mechanism */}
      <ClockGlass theme={theme} />
    </div>
  );
};

export default Clock;
