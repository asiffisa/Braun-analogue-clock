import React from 'react';
import { useIST } from '../hooks/useIST';
import ClockFace from './Clock/ClockFace';
import ClockGlass from './Clock/ClockGlass';
import ClockHands from './Clock/ClockHands';
import { CLOCK_DIMENSIONS, CLOCK_THEMES, type ClockThemeName } from './Clock/constants';

interface ClockProps {
  theme?: ClockThemeName;
}

const Clock: React.FC<ClockProps> = ({ theme = 'light' }) => {
  const time = useIST();
  const activeTheme = CLOCK_THEMES[theme];

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  return (
    <div
      className={`clock-shell clock-shell--${theme}`}
      data-clock-theme={theme}
      style={{
        maxWidth: `${CLOCK_DIMENSIONS.size}px`,
        boxShadow: activeTheme.colors.shadows.clock,
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
