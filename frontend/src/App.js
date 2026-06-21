import React, { useEffect, useState } from 'react';
import { fetchData } from './utils/api/fetchData';
import { removeDuplicates } from './utils/helpers/removeDuplicates';
import PaginatedCardGrid from './components/layout/PaginatedCardGrid';
import TinkerSparks from './components/layout/TinkerSparks';
import LedMarquee from './components/layout/LedMarquee';

function App() {
    const [data, setData] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [isAppReady, setIsAppReady] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [manualTheme, setManualTheme] = useState(null);

    useEffect(() => {
        // Keep screen awake
        const wakeLock = async () => {
            try {
                await document.documentElement.requestFullscreen();
                await navigator.wakeLock.request('screen');
            } catch (err) {
                console.log('Wake Lock error:', err);
            }
        };
        wakeLock();

        const fetchRecords = async () => {
            try {
                const records = await fetchData(); 
                setData(removeDuplicates(records));
            } catch (error) {
                console.error('Fetch failed:', error);
            }
        };

        fetchRecords();
        const interval = setInterval(fetchRecords, 20000);
        return () => clearInterval(interval);
    }, []);

    // Theme Detection Logic
    useEffect(() => {
        // Force dark mode for Cyber-Brutalism
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
    }, [manualTheme]);


    // Loading Animation Logic
    useEffect(() => {
        let currentProgress = 0;
        let animationFrameId;
        let isPaused = false;

        const updateProgress = () => {
            if (isPaused) return;

            if (currentProgress < 63) {
                currentProgress += Math.random() * 2 + 0.5; 
                if (currentProgress >= 63) {
                    currentProgress = 63;
                    isPaused = true;
                    setLoadingProgress(Math.floor(currentProgress));
                    
                    // Pause for exactly 1 second at 63%
                    setTimeout(() => {
                        isPaused = false;
                        animationFrameId = requestAnimationFrame(updateProgress);
                    }, 1000);
                    return; 
                }
            } else if (currentProgress < 100) {
                currentProgress += Math.random() * 3 + 1; 
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    setLoadingProgress(100);
                    
                    // Loading complete - start animations
                    setTimeout(() => {
                        setStartAnimation(true);
                        // Show main app shortly after vector starts moving
                        setTimeout(() => {
                            setIsAppReady(true);
                        }, 500); 
                    }, 400); 
                    return;
                }
            }
            
            setLoadingProgress(Math.floor(currentProgress));
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        animationFrameId = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden font-geist text-gray-800 dark:text-gray-100 z-0">
            
            {/* Loading Overlay */}
            <div 
                className={`absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-1000 ${
                    startAnimation ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <div className="font-geist text-7xl md:text-8xl font-extrabold tracking-tighter text-gray-800 dark:text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-28 transition-colors duration-500">
                    {loadingProgress}%
                </div>
            </div>

            {/* CRT Overlay */}
            <div className="absolute inset-0 crt-overlay pointer-events-none"></div>

            {/* Main Application Content */}
            <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${isAppReady ? 'opacity-100' : 'opacity-0'}`}>

                {/* Brutalist Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none px-12">
                    <h1 className="w-full flex justify-between text-[16vw] font-vt323 font-black leading-none text-[#121212] dark:text-[#0a0a0a] scale-y-125 opacity-40">
                        {"ATTENDANCE_LOG".split('').map((char, i) => (
                            <span key={i}>
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>

                <PaginatedCardGrid data={data} isDarkMode={isDarkMode} setManualTheme={setManualTheme} />
                
                {/* Brutalist Marquee Banner */}
                <div className="absolute bottom-6 left-0 w-full overflow-hidden border-t-4 border-b-4 border-neon-green bg-black py-2 z-50 pointer-events-none">
                    <div className="flex whitespace-nowrap marquee-scroll font-vt323 text-3xl text-neon-green uppercase tracking-widest">
                        <span className="mx-4">SYSTEM ONLINE</span> // <span className="mx-4">TINKERSPACE_DIGITAL</span> // <span className="mx-4">HACK THE PLANET</span> // <span className="mx-4">NO UNAUTHORIZED ACCESS</span> // <span className="mx-4">ATTENDANCE LOGGING ACTIVE</span> //
                        <span className="mx-4">SYSTEM ONLINE</span> // <span className="mx-4">TINKERSPACE_DIGITAL</span> // <span className="mx-4">HACK THE PLANET</span> // <span className="mx-4">NO UNAUTHORIZED ACCESS</span> // <span className="mx-4">ATTENDANCE LOGGING ACTIVE</span> //
                    </div>
                </div>

                {/* Bottom-Right Controls / Information */}
                <div className="absolute bottom-8 right-12 z-50 flex flex-col items-end justify-end gap-6 pointer-events-none">
                    {/* QR Code (Hidden)
                    <div className="flex items-center gap-4 bg-white/40 dark:bg-white/5 backdrop-blur-2xl px-4 py-3 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 hover:scale-105 pointer-events-auto cursor-pointer group">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide uppercase">Join the Feed</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Scan to add your card</span>
                        </div>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://tinkerspace.in/join&margin=0&bgcolor=ffffff&color=0a192f`} alt="QR Code" className="w-14 h-14 rounded-lg mix-blend-multiply dark:mix-blend-normal dark:invert dark:opacity-80 transition-all duration-500" />
                    </div>
                    */}

                    {/* Theme Toggle Button (Hidden)
                    <button
                        onClick={() => setManualTheme(isDarkMode ? 'light' : 'dark')}
                        className="p-3 rounded-full bg-white/40 dark:bg-black/40 border border-black/10 dark:border-white/20 backdrop-blur-md shadow-sm text-gray-800 dark:text-white transition-all hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    */}

                </div>
            </div>
        </div>
    );
}

export default App;
