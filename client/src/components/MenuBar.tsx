import React, { useState, useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';
import { AppId } from '../types';
import { startAmbientSynth, stopAmbientSynth } from '../utils/audio';

const MenuBar: React.FC = () => {
    const [time, setTime] = useState<string>('');
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const openWindow = useWindowStore((state) => state.openWindow);

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
            const day = date.toLocaleDateString('en-US', { day: 'numeric' });
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            let hourStr = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            // Strip leading zero in hour string for authentic feel, e.g. "03:53 AM" -> "3:53 AM"
            hourStr = hourStr.replace(/^0/, '');
            setTime(`${weekday} ${day} ${month} ${hourStr}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleMenuClick = (appId: AppId) => {
        openWindow(appId);
    };

    const handleToggleSound = () => {
        if (isMuted) {
            startAmbientSynth();
            setIsMuted(false);
        } else {
            stopAmbientSynth();
            setIsMuted(true);
        }
    };

    return (
        <div className="glass-menubar absolute top-0 left-0 right-0 min-h-9 sm:h-8 flex items-center justify-between px-2 sm:px-4 py-1 sm:py-0 z-[999] text-[10px] sm:text-xs font-semibold text-white/95 transition-colors duration-300">
            {/* Left side: System items */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3.5 overflow-x-auto">
                {/* Authentic Vector Apple Logo */}
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition flex items-center justify-center"
                    onClick={() => handleMenuClick('welcome')}
                    title="Welcome Information"
                >
                    <svg className="w-3.5 h-3.5 text-white/95" viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.36-6.08-3.38-2.68-7.22-7.22-11.54-13.65-5.25-7.73-9.69-16.59-13.3-26.6-3.61-10-5.42-19.8-5.42-29.4 0-14.2 3.59-25.7 10.77-34.5 7.18-8.8 16.03-13.2 26.54-13.2 5.03 0 10.45 1.45 16.27 4.35 5.8 2.91 9.73 4.35 11.77 4.35 1.8 0 5.65-1.39 11.54-4.17 5.89-2.78 11.19-4.11 15.91-4.01 16.2.22 28.53 6.08 36.98 17.58-14.54 8.78-21.68 20.91-21.41 36.4.29 12.06 4.9 22.06 13.84 30.01 8.94 7.95 19.34 12.33 31.2 13.12 1.34 4.18 1.42 6.84 0 9.22zm-30.8-112.5C119.57 10 125 15.66 132.33 22c6.03 6.46 9.4 13.19 8.23 20.2-6.53.53-12.74-2.58-18.66-9.32-5.91-6.75-9.13-14.2-9-22.36z" />
                    </svg>
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition font-bold"
                    onClick={() => handleMenuClick('welcome')}
                >
                    Ayush's Portfolio
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition hidden sm:inline"
                    onClick={() => handleMenuClick('about')}
                >
                    About
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition"
                    onClick={() => handleMenuClick('projects')}
                >
                    Projects
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition hidden sm:inline"
                    onClick={() => handleMenuClick('experience')}
                >
                    Experience
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition"
                    onClick={() => handleMenuClick('contact')}
                >
                    Contact
                </span>
                <span
                    className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition"
                    onClick={() => handleMenuClick('resume')}
                >
                    Resume
                </span>
            </div>

            {/* Right side: Live clock / status symbols */}
            <div className="flex items-center gap-1.5 sm:gap-3">
                {/* 3D Audio spatializer toggle (Structured to feel like speaker volume utility) */}
                <button
                    onClick={handleToggleSound}
                    className="cursor-pointer hover:bg-white/10 px-2.5 py-1 rounded transition flex items-center justify-center focus:outline-none"
                    title={isMuted ? "Enable Interactive 3D Audio" : "Mute Soundscape"}
                >
                    {isMuted ? (
                        <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        <svg className="w-3.5 h-3.5 text-pink-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    )}
                </button>

                {/* macOS WiFi Icon */}
                <span className="cursor-pointer hover:bg-white/10 px-1.5 py-1 rounded transition flex items-center justify-center" title="Network Connected Status">
                    <svg className="w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12.55a11 11 0 0 1 14 0" />
                        <path d="M8.5 16a6 6 0 0 1 7 0" />
                        <path d="M12 19.5v.01" />
                    </svg>
                </span>

                {/* macOS spotlight search Icon */}
                <span className="cursor-pointer hover:bg-white/10 px-1.5 py-1 rounded transition hidden sm:flex items-center justify-center" title="Spotlight Search">
                    <svg className="w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </span>

                {/* macOS profile contact Icon */}
                <span className="cursor-pointer hover:bg-white/10 px-1.5 py-1 rounded transition hidden sm:flex items-center justify-center" title="Account Settings">
                    <svg className="w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </span>

                {/* macOS control center Icon */}
                <span className="cursor-pointer hover:bg-white/10 px-1.5 py-1 rounded transition hidden sm:flex items-center justify-center" title="Control Center">
                    <svg className="w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="2" y1="14" x2="6" y2="14" />
                        <line x1="10" y1="8" x2="14" y2="8" />
                        <line x1="18" y1="16" x2="22" y2="16" />
                    </svg>
                </span>

                {/* Live formatted date */}
                <span className="font-medium mr-1 text-white/90 cursor-default select-none hidden sm:inline">{time}</span>
            </div>
        </div>
    );
};

export default MenuBar;
