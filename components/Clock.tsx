import React from 'react';
import { useIST } from '../hooks/useIST';

const Clock: React.FC = () => {
  const time = useIST();

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  // Degrees calculation
  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6;
  const hourDegrees = hours * 30;

  return (
    <div 
      className="relative rounded-full bg-[#FAFAFA] shadow-[0_10px_30px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]"
      style={{ width: '400px', height: '400px' }}
    >
      {/* Clock Face Layer */}
      <div className="absolute inset-0 rounded-full border-[4px] border-white">
        
        {/* Dial Elements (Numbers replacing hour ticks, and small minute ticks) */}
        <div className="absolute inset-0">
             {Array.from({ length: 60 }).map((_, i) => {
                const isHour = i % 5 === 0;
                const angle = i * 6;
                // Position elements near the edge (radius 184px out of 200px)
                const radius = 178; 
                
                if (isHour) {
                  // Replace hour dash with Number
                  const num = i === 0 ? 12 : i / 5;
                  return (
                    <div
                      key={i}
                      className="absolute w-12 h-12 flex items-center justify-center font-medium text-2xl text-black"
                      style={{
                        left: '50%',
                        top: '50%',
                        // Translate to position, then counter-rotate to keep number upright
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${radius}px) rotate(-${angle}deg)`,
                      }}
                    >
                      {num}
                    </div>
                  );
                }
                
                // Small Minute Ticks
                return (
                  <div
                    key={i}
                    className="absolute w-[1px] h-[12px] bg-[#D4D4D5]"
                    style={{
                      left: '50%',
                      top: '50%',
                      // Rotate and push out to the same radius circle
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${radius}px)`,
                    }}
                  />
                );
             })}
        </div>
      </div>

      {/* Hands Container - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Hour Hand */}
        <div
          className="absolute z-20 bg-black rounded-full shadow-lg flex justify-center pt-[4px]"
          style={{
            width: '10px',
            height: '110px', 
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: 'bottom center',
            bottom: '50%', // Anchor at center
          }}
        >
          {/* White slot/insert detail */}
          <div className="w-[4px] bg-white rounded-full h-[32px] opacity-90" />
        </div>

        {/* Minute Hand */}
        <div
          className="absolute z-20 bg-black rounded-full shadow-lg flex justify-center pt-[4px]"
          style={{
            width: '10px',
            height: '144px', 
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: 'bottom center',
            bottom: '50%',
          }}
        >
             {/* White slot/insert detail */}
             <div className="w-[4px] bg-white rounded-full h-[32px] opacity-90" />
        </div>

        {/* Second Hand */}
        <div
           className="absolute z-30 w-[3px] h-[220px]"
           style={{
             transform: `rotate(${secondDegrees}deg)`,
             top: '56px', 
             transformOrigin: '50% 144px',
           }}
        >
           {/* The actual hand stick */}
           <div className="w-full h-full relative">
              {/* Main stick */}
              <div className="absolute top-0 left-0 right-0 h-[124px] bg-[#f5bd47] rounded-t-sm"></div>
              {/* Tail */}
              <div className="absolute top-[124px] left-0 right-0 h-[50px] bg-[#f5bd47] rounded-b-sm"></div>
           </div>
        </div>

        {/* Center Cap (Yellow Pivot) */}
        <div className="absolute z-40 w-[18px] h-[18px] bg-[#f5bd47] rounded-full shadow-sm border border-[#dba22b]"></div>

      </div>
    </div>
  );
};

export default Clock;