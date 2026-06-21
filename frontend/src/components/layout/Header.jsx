import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../../utils/api/weatherService';

export default function Header({ content, isDarkMode, setManualTheme }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await getCurrentWeather();
      setWeather(weatherData);
    };
    fetchWeather();
    // Update weather every 5 minutes
    const weatherTimer = setInterval(fetchWeather, 300000);
    return () => clearInterval(weatherTimer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const totalMakers = content ? content.split('•')[2]?.trim().split(' ')[0] : '0';

  return (
    <div className="w-full flex justify-between items-start z-10 sticky top-0 p-8 font-mono pointer-events-none">
      
      {/* Left HUD Panel */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 bg-black border-4 border-neon-green shadow-brutal-green px-4 py-2 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-neon-green font-black">{"[REC]"}</span>
            <span className="font-bold tracking-widest text-white text-sm uppercase">
              SYS.ATTENDANCE
            </span>
          </div>

          <div className="w-px h-6 bg-neon-green mx-2" />

          <div className="flex items-center gap-4 text-sm text-neon-yellow font-bold uppercase">
            <span>USR.COUNT: {totalMakers}</span>
            {weather && (
              <>
                <div className="w-px h-6 bg-neon-green mx-2" />
                <span>ENV.TEMP: {weather.temperature}°C</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right HUD Time Display */}
      <div className="flex flex-col items-end pointer-events-none text-neon-magenta">
        <div className="bg-black border-4 border-neon-magenta shadow-brutal-magenta px-4 py-2 mb-2">
            <div className="text-4xl font-black tracking-widest whitespace-nowrap">
            {formatTime(currentTime)}
            </div>
        </div>
        <div className="bg-black text-white border-2 border-white px-2 py-1 text-xs font-bold uppercase shadow-brutal-sm">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'
          })}
        </div>
      </div>

    </div>
  );
}