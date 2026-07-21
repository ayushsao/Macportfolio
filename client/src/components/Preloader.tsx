import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playStartupChime } from '../utils/audio';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(100);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Immediately start the exit animation
        const timer = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
                onComplete();
            }, 400);
        }, 1500); // 1.5 seconds total before exit

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="fixed inset-0 bg-[#070913] flex flex-col items-center justify-center z-[99999] select-none text-white"
                >
                    <div className="flex flex-col items-center">
                        {/* Apple Logo SVG */}
                        <motion.svg
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.0, ease: 'easeOut' }}
                            className="w-16 h-16 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.35)]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.33.12.87 0 1.94-.48 2.48-1.45z" />
                        </motion.svg>

                        {/* Apple progress bar track */}
                        <div className="w-48 h-[3px] bg-white/10 rounded-full mt-10 overflow-hidden relative">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_white]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Numeric progress percentage label */}
                        <span className="text-[10px] text-white/35 font-bold tracking-[0.2em] uppercase mt-4">
                            Loading {progress}%
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
