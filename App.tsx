import React from 'react';
import Clock from './components/Clock';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#f0f0f0] flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        <Clock />
      </div>
    </div>
  );
};

export default App;