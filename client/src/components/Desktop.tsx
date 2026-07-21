import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowStore } from '../store/useWindowStore';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import { AppId } from '../types';

import WelcomeContent from './window-contents/WelcomeContent';
import AboutContent from './window-contents/AboutContent';
import ProjectsContent from './window-contents/ProjectsContent';
import ExperienceContent from './window-contents/ExperienceContent';
import ResumeContent from './window-contents/ResumeContent';
import ContactContent from './window-contents/ContactContent';
import TicTacToeContent from './window-contents/TicTacToeContent';
import RemindersContent from './window-contents/RemindersContent';
import SettingsContent from './window-contents/SettingsContent';
import profileImg from './window-contents/profile.jpg';

interface Shortcut {
    id: AppId;
    label: string;
    type: 'folder' | 'file' | 'pdf' | 'mail';
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.45,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -24, scale: 0.9 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
};

const Desktop: React.FC = () => {
    const { windows, openWindow } = useWindowStore();
    const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
    const desktopRef = useRef<HTMLDivElement>(null);

    // List of desktop shortcut items
    const shortcuts: Shortcut[] = [
        { id: 'about', label: 'About Me', type: 'folder' },
        { id: 'projects', label: 'Projects', type: 'folder' },
        { id: 'experience', label: 'Experience', type: 'folder' },
        { id: 'resume', label: 'Resume.pdf', type: 'pdf' },
        { id: 'contact', label: 'Contact', type: 'mail' },
    ];

    const handleDesktopClick = () => {
        setSelectedIcon(null);
    };

    const handleIconClick = (e: React.MouseEvent, id: AppId) => {
        e.stopPropagation();
        setSelectedIcon(id);
        openWindow(id);
    };

    const handleIconDoubleClick = (id: AppId) => {
        openWindow(id);
    };

    const renderWindowContent = (id: AppId) => {
        switch (id) {
            case 'welcome':
                return <WelcomeContent />;
            case 'about':
                return <AboutContent />;
            case 'projects':
                return <ProjectsContent />;
            case 'experience':
                return <ExperienceContent />;
            case 'resume':
                return <ResumeContent />;
            case 'contact':
                return <ContactContent />;
            case 'tictactoe':
                return <TicTacToeContent />;
            case 'reminders':
                return <RemindersContent />;
            case 'settings':
                return <SettingsContent />;
            default:
                return null;
        }
    };

    return (
        <div
            ref={desktopRef}
            onClick={handleDesktopClick}
            className="absolute inset-0 top-8 sm:top-9 bottom-20 sm:bottom-[76px] flex flex-col p-3 sm:p-4 z-10 select-none overflow-hidden"
        >
            {/* Grid column for shortcuts on the left (matches macOS desktop default styling) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-row flex-wrap content-start items-start justify-start gap-3 sm:flex-col sm:gap-4 h-auto max-w-full sm:h-full sm:w-[100px] z-10"
            >
                {shortcuts.map((shortcut) => (
                    <motion.div key={shortcut.id} variants={itemVariants}>
                        <DesktopIcon
                            label={shortcut.label}
                            type={shortcut.type}
                            isSelected={selectedIcon === shortcut.id}
                            onClick={(e) => handleIconClick(e, shortcut.id)}
                            onDoubleClick={() => handleIconDoubleClick(shortcut.id)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Center Background Typography (Desktop Greeting & Profile Widget) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-3 sm:px-4 text-center pointer-events-none select-none z-0">
                {/* Interactive Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, type: 'spring', damping: 18, stiffness: 70 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[3px] border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] mb-4 sm:mb-6 select-none pointer-events-auto cursor-pointer hover:border-white/40 active:scale-95 transition-all duration-300 z-10"
                    onClick={() => openWindow('about')}
                >
                    <img
                        src={profileImg}
                        alt="Ayush"
                        className="w-full h-full object-cover select-none pointer-events-none"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                    className="text-white/70 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-[0.24em] sm:tracking-[0.32em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans"
                >
                    Hey, I'm Ayush! Welcome to my
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, type: 'spring', damping: 22, stiffness: 65, delay: 0.4 }}
                    className="text-slate-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-light tracking-wide drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)] select-none mt-2 mb-3 sm:mb-4 font-serif italic"
                >
                    Portfolio
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.15em" }}
                    animate={{ opacity: 0.45, letterSpacing: "0.28em" }}
                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.8 }}
                    className="text-white text-[9px] sm:text-[10px] md:text-xs font-bold uppercase drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)]"
                >
                    Explore it like a Mac.
                </motion.p>
            </div>

            {/* Dynamic Window Container Manager */}
            <AnimatePresence>
                {Object.values(windows)
                    .filter((w) => w.isOpen)
                    .map((w) => (
                        <Window
                            key={w.id}
                            id={w.id}
                            title={w.title}
                            isOpen={w.isOpen}
                            isMinimized={w.isMinimized}
                            isMaximized={w.isMaximized}
                            position={w.position}
                            size={w.size}
                            zIndex={w.zIndex}
                            desktopRef={desktopRef}
                        >
                            {renderWindowContent(w.id)}
                        </Window>
                    ))}
            </AnimatePresence>
        </div>
    );
};

export default Desktop;
