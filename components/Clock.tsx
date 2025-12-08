import React from 'react';
import { useIST } from '../hooks/useIST';
import ClockFace from './Clock/ClockFace';
import ClockHands from './Clock/ClockHands';
import { CLOCK_DIMENSIONS, CLOCK_THEME } from './Clock/constants';

const Clock: React.FC = () => {
  const time = useIST();

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  return (
    <div
      className="relative rounded-full"
      style={{
        width: `${CLOCK_DIMENSIONS.size}px`,
        height: `${CLOCK_DIMENSIONS.size}px`,
        backgroundColor: CLOCK_THEME.colors.bg,
        boxShadow: CLOCK_THEME.colors.shadows.clock,
      }}
    >
      {/* Clock Face Layer */}
      <ClockFace />

      {/* Hands Container */}
      <ClockHands hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default Clock;