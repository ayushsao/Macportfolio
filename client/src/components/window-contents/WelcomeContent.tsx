import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { motion } from 'framer-motion';

const WelcomeContent: React.FC = () => {
    const openWindow = useWindowStore((state) => state.openWindow);

    const fadeUp = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="h-full flex flex-col justify-between p-10 text-center select-none bg-gradient-to-tr from-pink-50/60 via-white to-blue-50/40"
        >
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 my-auto">
                <motion.div variants={fadeUp} className="animate-pulse duration-[3000ms] mb-2">
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
                </motion.div>

                <motion.h1 variants={fadeUp} className="font-extrabold tracking-tight text-5xl md:text-6xl text-gray-900 drop-shadow-sm select-none">
                    Crafting Scalable <br />
                    <span className="text-pink-600 font-cursive text-6xl md:text-7xl font-normal drop-shadow-sm">Solutions.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-pink-600 font-bold tracking-widest text-xs uppercase bg-pink-100/50 px-4 py-1.5 rounded-full border border-pink-200">
                    Ayush Kumar Sao • Full Stack Developer
                </motion.p>

                <motion.p variants={fadeUp} className="text-gray-600 text-[15px] max-w-md font-medium mt-4 leading-relaxed">
                    I build high-performance backend pipelines and elegant interfaces. Experience my journey through this interactive Mac environment.
                </motion.p>
            </div>

            <motion.div variants={fadeUp} className="border-t border-black/5 pt-8 mt-6">
                <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase tracking-widest">
                    Start Exploring
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => openWindow('about')}
                        className="px-5 py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-sm font-semibold rounded-2xl border border-pink-200 transition-all duration-300 hover:shadow-lg hover:shadow-pink-100/50 active:scale-95 cursor-default flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        About Me
                    </button>
                    <button
                        onClick={() => openWindow('projects')}
                        className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-2xl border border-blue-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 active:scale-95 cursor-default flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        Projects
                    </button>
                    <button
                        onClick={() => openWindow('contact')}
                        className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-2xl border border-emerald-200 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50 active:scale-95 cursor-default flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Get in Touch
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeContent;
