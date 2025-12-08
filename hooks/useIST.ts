import { useState, useEffect } from 'react';

export const useIST = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate IST: UTC + 5:30
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(utc + istOffset);
      setTime(istDate);
    };

    updateTime();
    // Update every frame for smooth second hand if needed, or stick to interval
    // Using requestAnimationFrame for smoother experience
    let frameId: number;
    const loop = () => {
      updateTime();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return time;
};