import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';

const WelcomeContent: React.FC = () => {
    const openWindow = useWindowStore((state) => state.openWindow);

    return (
        <div className="h-full flex flex-col justify-between p-8 text-center select-none bg-gradient-to-tr from-pink-50/50 to-blue-50/40">
            {/* Decorative blossom icon or illustration */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 my-auto">
                {/* Premium vector cherry blossom SVG */}
                <div className="animate-pulse duration-[3000ms] mb-3">
                    <svg className="w-16 h-16 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffb5c5" />
                                <stop offset="100%" stopColor="#f43f5e" />
                            </linearGradient>
                        </defs>
                        <g transform="translate(50,50)">
                            {[0, 72, 144, 216, 288].map((angle, idx) => (
                                <path
                                    key={idx}
                                    d="M 0 0 C -15 -25 -25 -45 0 -45 C 25 -45 15 -25 0 0 Z"
                                    fill="url(#petalGrad)"
                                    transform={`rotate(${angle})`}
                                />
                            ))}
                            <circle cx="0" cy="0" r="7" fill="#ffffff" opacity="0.95" />
                            <circle cx="0" cy="0" r="4.5" fill="#fca5a5" />
                            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                                <line
                                    key={idx}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="-11"
                                    stroke="#ffffff"
                                    strokeWidth="1.2"
                                    transform={`rotate(${angle})`}
                                />
                            ))}
                            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                                <circle
                                    key={idx}
                                    cx="0"
                                    cy="-11"
                                    r="2"
                                    fill="#fef08a"
                                    transform={`rotate(${angle})`}
                                />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Cursive display headline */}
                <h1 className="font-cursive text-7.5xl text-pink-650 drop-shadow-sm select-none">
                    Portfolio
                </h1>

                <p className="text-gray-500 font-medium tracking-wide text-xs uppercase">
                    Ayush Kumar Sao • Full Stack Developer
                </p>

                <p className="text-gray-600 text-sm max-w-sm font-light mt-2 leading-relaxed">
                    Welcome to my interactive desktop environment. Experience my resume, skills, projects, and work history in a desktop layout.
                </p>
            </div>

            {/* Instructions footer */}
            <div className="border-t border-black/5 pt-6 mt-4">
                <p className="text-xs text-gray-400 font-medium mb-3">
                    HOW TO EXPLORE:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => openWindow('about')}
                        className="px-4 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 text-xs font-semibold rounded-full border border-pink-500/20 transition active:scale-95 cursor-default"
                    >
                        About Me
                    </button>
                    <button
                        onClick={() => openWindow('projects')}
                        className="px-4 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 text-xs font-semibold rounded-full border border-blue-500/20 transition active:scale-95 cursor-default"
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => openWindow('contact')}
                        className="px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-500/20 transition active:scale-95 cursor-default"
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeContent;
