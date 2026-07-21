import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useWindowStore } from '../store/useWindowStore';
import { AppId } from '../types';

interface DockConfigItem {
    id: string;
    label: string;
    appId?: AppId;
    isExternal?: boolean;
    link?: string;
    color: string;
    icon: React.ReactNode;
}

/* ───────────────────────────────────────────────────
   macOS Magnification Dock
   - Parabolic icon scaling driven by mouse distance
   - Spring-based tooltip with arrow
   - Open-app indicator dot with pulse
   - Bounce animation on click (like macOS app launch)
   ─────────────────────────────────────────────────── */

const DOCK_ICON_BASE = 48;      // base icon size px
const DOCK_ICON_MAX = 72;       // max magnified size px
const MAGNIFICATION_RANGE = 150; // px radius of magnification influence

const Dock: React.FC = () => {
    const openWindow = useWindowStore((state) => state.openWindow);
    const closeWindow = useWindowStore((state) => state.closeWindow);
    const windows = useWindowStore((state) => state.windows);

    const mouseX = useMotionValue(Infinity);
    const dockRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouseX.set(e.clientX);
    }, [mouseX]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(Infinity);
    }, [mouseX]);

    // Curated list of high-fidelity macOS Vector SVGs
    const dockItems: DockConfigItem[] = [
        {
            id: 'welcome',
            label: 'Finder',
            appId: 'welcome',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="finderBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4bb9ff" />
                            <stop offset="100%" stopColor="#004ebf" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#finderBg)" stroke="#2563eb" strokeWidth="0.5" />
                    <path d="M50 0C50 0 50 18 50 50C50 82 50 100 50 100H80C90 100 100 90 100 80V20C100 10 90 0 80 0H50Z" fill="#dbeafe" opacity="0.95" />
                    <path d="M50 0C50 0 43 25 50 50C57 75 50 100 50 100" stroke="#0037a3" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="28" cy="42" r="6" fill="#0037a3" />
                    <circle cx="72" cy="42" r="6" fill="#0037a3" />
                    <path d="M22 64C22 64 42 82 50 82C58 82 78 64 78 64" stroke="#0037a3" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            ),
        },
        {
            id: 'projects',
            label: 'Safari',
            appId: 'projects',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="safariBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#f1f5f9" />
                        </linearGradient>
                        <radialGradient id="compassDial" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#0284c7" />
                        </radialGradient>
                        <linearGradient id="needleRed" x1="50%" y1="15%" x2="50%" y2="50%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#b91c1c" />
                        </linearGradient>
                        <linearGradient id="needleWhite" x1="50%" y1="50%" x2="50%" y2="85%">
                            <stop offset="0%" stopColor="#f1f5f9" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#safariBg)" stroke="#cbd5e1" strokeWidth="1" />
                    <circle cx="50" cy="50" r="38" fill="url(#compassDial)" stroke="#cbd5e1" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="33" stroke="#fff" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                    <circle cx="50" cy="50" r="28" stroke="#fff" strokeWidth="1.5" strokeDasharray="6,8" opacity="0.75" />
                    <g transform="rotate(45 50 50)">
                        <path d="M50 15L44 50H56L50 15Z" fill="url(#needleRed)" />
                        <path d="M50 85L44 50H56L50 85Z" fill="url(#needleWhite)" />
                        <circle cx="50" cy="50" r="4.5" fill="#f59e0b" />
                        <circle cx="50" cy="50" r="1.5" fill="#fff" />
                    </g>
                </svg>
            ),
        },
        {
            id: 'about',
            label: 'Photos',
            appId: 'about',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <g transform="translate(50, 50)" opacity="0.9">
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#ef4444" opacity="0.85" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#f97316" opacity="0.85" transform="rotate(45)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#eab308" opacity="0.85" transform="rotate(90)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#22c55e" opacity="0.85" transform="rotate(135)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#06b6d4" opacity="0.85" transform="rotate(180)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#3b82f6" opacity="0.85" transform="rotate(225)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#6366f1" opacity="0.85" transform="rotate(270)" />
                        <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#a855f7" opacity="0.85" transform="rotate(315)" />
                    </g>
                    <circle cx="50" cy="50" r="5" fill="#ffffff" />
                </svg>
            ),
        },
        {
            id: 'contact',
            label: 'Mail',
            appId: 'contact',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="mailBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#mailBg)" stroke="#38bdf8" strokeWidth="0.5" />
                    <rect x="12" y="12" width="76" height="76" rx="4" stroke="#ffffff" strokeWidth="2" strokeDasharray="5 3" opacity="0.32" fill="none" />
                    <g transform="translate(18, 28) scale(0.68)">
                        <rect width="94" height="62" rx="8" fill="#ffffff" />
                        <path d="M0 0L47 34L94 0" stroke="#cbd5e1" strokeWidth="3.5" fill="none" />
                        <path d="M0 62L36 30" stroke="#cbd5e1" strokeWidth="3.5" />
                        <path d="M94 62L58 30" stroke="#cbd5e1" strokeWidth="3.5" />
                    </g>
                </svg>
            ),
        },
        {
            id: 'experience',
            label: 'App Store',
            appId: 'experience',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="appStoreBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#appStoreBg)" />
                    <g stroke="#ffffff" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0, 2) scale(0.95)">
                        <line x1="32" y1="74" x2="50" y2="30" />
                        <line x1="68" y1="74" x2="50" y2="30" />
                        <line x1="36" y1="60" x2="64" y2="60" />
                    </g>
                </svg>
            ),
        },
        {
            id: 'resume',
            label: 'Notes',
            appId: 'resume',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="notesHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="#fffbef" stroke="#fef3c7" strokeWidth="1" />
                    <path d="M0 22C0 9.84974 9.84974 0 22 0H78C90.1503 0 100 9.84974 100 22V24H0V22Z" fill="url(#notesHeader)" />
                    <line x1="12" y1="42" x2="88" y2="42" stroke="#e4e4e7" strokeWidth="1.5" />
                    <line x1="12" y1="56" x2="88" y2="56" stroke="#e4e4e7" strokeWidth="1.5" />
                    <line x1="12" y1="70" x2="88" y2="70" stroke="#e4e4e7" strokeWidth="1.5" />
                    <line x1="12" y1="84" x2="88" y2="84" stroke="#e4e4e7" strokeWidth="1.5" />
                    <line x1="26" y1="24" x2="26" y2="100" stroke="#fca5a5" strokeWidth="1" opacity="0.6" />
                </svg>
            ),
        },
        {
            id: 'reminders',
            label: 'Reminders',
            appId: 'reminders',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="22" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                    <circle cx="28" cy="32" r="6.5" fill="#ef4444" />
                    <line x1="42" y1="32" x2="84" y2="32" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                    <circle cx="28" cy="50" r="6.5" fill="#3b82f6" />
                    <line x1="42" y1="50" x2="84" y2="50" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                    <circle cx="28" cy="68" r="6.5" fill="#10b981" />
                    <line x1="42" y1="68" x2="84" y2="68" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            id: 'tictactoe',
            label: 'Books',
            appId: 'tictactoe',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="booksBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#booksBg)" stroke="#f97316" strokeWidth="0.5" />
                    <path d="M50 78C50 78 36 68 18 68V26C36 26 50 36 50 36C50 36 64 26 82 26V68C64 68 50 78 50 78Z" fill="#ffffff" />
                    <line x1="50" y1="36" x2="50" y2="78" stroke="#ea580c" strokeWidth="1.5" />
                </svg>
            ),
        },
        {
            id: 'settings',
            label: 'System Settings',
            appId: 'settings',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="settingsBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#78716c" />
                            <stop offset="100%" stopColor="#44403c" />
                        </linearGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="url(#settingsBg)" stroke="#57534e" strokeWidth="1" />
                    <circle cx="50" cy="50" r="26" fill="none" stroke="#d6d3d1" strokeWidth="5.5" strokeDasharray="10 8" />
                    <circle cx="50" cy="50" r="16" fill="#a8a29e" />
                    <circle cx="50" cy="50" r="8" fill="#57534e" />
                </svg>
            ),
        },
        {
            id: 'divider',
            label: '|',
            color: 'div',
            icon: null
        },
        {
            id: 'trash',
            label: 'Trash',
            color: 'transparent',
            icon: (
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="trashBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                    </defs>
                    <path d="M30 30 C30 20, 42 16, 46 22 C50 16, 62 18, 64 26 C68 20, 78 28, 70 34 Z" fill="#f1f5f9" opacity="0.9" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M40 28 C45 22, 54 22, 58 28" fill="#e2e8f0" opacity="0.8" />
                    <path d="M26 30 L34 84 C35 88, 38 90, 42 90 H58 C62 90, 65 88, 66 84 L74 30 Z" fill="url(#trashBg)" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="3.5" strokeLinejoin="round" />
                    <ellipse cx="50" cy="30" rx="25" ry="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2.5" />
                    <line x1="36" y1="36" x2="42" y2="84" stroke="#cbd5e1" strokeWidth="2" opacity="0.75" />
                    <line x1="45" y1="36" x2="47" y2="84" stroke="#cbd5e1" strokeWidth="2" opacity="0.75" />
                    <line x1="55" y1="36" x2="53" y2="84" stroke="#cbd5e1" strokeWidth="2" opacity="0.75" />
                    <line x1="64" y1="36" x2="58" y2="84" stroke="#cbd5e1" strokeWidth="2" opacity="0.75" />
                </svg>
            ),
        },
    ];

    return (
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center z-[997] px-2 sm:px-4">
            <motion.div
                ref={dockRef}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 17, delay: 0.15 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="dock-container flex items-end px-2 sm:px-3 pb-2 pt-2 rounded-2xl sm:rounded-[22px] relative max-w-full overflow-x-auto no-scrollbar"
                style={{
                    background: 'rgba(18, 22, 42, 0.22)',
                    backdropFilter: 'blur(38px)',
                    WebkitBackdropFilter: 'blur(38px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0,0,0,0.05)',
                }}
            >
                {/* Dock shelf reflection line (like real macOS glass shelf edge) */}
                <div
                    className="absolute bottom-0 left-3 right-3 h-[1px] rounded-full pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 80%, transparent)',
                    }}
                />

                {dockItems.map((item) => {
                    if (item.color === 'div') {
                        return (
                            <div key={item.id} className="w-[1px] bg-white/15 self-stretch my-2 mx-1.5 rounded-full shrink-0" />
                        );
                    }

                    const isAppOpen = item.appId ? windows[item.appId]?.isOpen : false;
                    const isAppMinimized = item.appId ? windows[item.appId]?.isMinimized : false;

                    return (
                        <DockIcon
                            key={item.id}
                            item={item}
                            mouseX={mouseX}
                            isAppOpen={isAppOpen ?? false}
                            isAppMinimized={isAppMinimized ?? false}
                            onClick={() => {
                                if (item.isExternal && item.link) {
                                    window.open(item.link, '_blank');
                                } else if (item.id === 'trash') {
                                    Object.keys(windows).forEach((id) => {
                                        closeWindow(id as AppId);
                                    });
                                } else if (item.appId) {
                                    openWindow(item.appId);
                                }
                            }}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
};

interface DockIconProps {
    item: DockConfigItem;
    mouseX: MotionValue<number>;
    isAppOpen: boolean;
    isAppMinimized: boolean;
    onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ item, mouseX, isAppOpen, isAppMinimized, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isBouncing, setIsBouncing] = useState(false);

    // Compute distance from mouse to this icon's center
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Parabolic magnification: icons scale up smoothly as mouse approaches
    const widthSync = useTransform(distance, [-MAGNIFICATION_RANGE, 0, MAGNIFICATION_RANGE], [DOCK_ICON_BASE, DOCK_ICON_MAX, DOCK_ICON_BASE]);
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    // Tooltip Y offset follows magnification
    const tooltipY = useTransform(width, [DOCK_ICON_BASE, DOCK_ICON_MAX], [0, -14]);
    const tooltipYSpring = useSpring(tooltipY, { mass: 0.1, stiffness: 200, damping: 15 });

    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        // macOS bounce animation on click
        setIsBouncing(true);
        onClick();
        setTimeout(() => setIsBouncing(false), 600);
    };

    return (
        <div
            className="relative flex flex-col items-center cursor-default text-white shrink-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* macOS-style tooltip with arrow */}
            <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.85 }}
                animate={showTooltip
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 4, scale: 0.85 }
                }
                transition={{ duration: 0.12, ease: 'easeOut' }}
                style={{ y: tooltipYSpring }}
                className="absolute -top-10 pointer-events-none z-[99] flex flex-col items-center"
            >
                <span
                    className="py-1 px-3 text-white text-[10px] font-semibold rounded-md whitespace-nowrap select-none"
                    style={{
                        background: 'rgba(30, 30, 30, 0.85)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                >
                    {item.label}
                </span>
                {/* Tooltip arrow */}
                <div
                    className="w-0 h-0 -mt-[1px]"
                    style={{
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid rgba(30, 30, 30, 0.85)',
                    }}
                />
            </motion.div>

            {/* Icon container with magnification */}
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                onClick={handleClick}
                className="relative flex items-center justify-center select-none cursor-pointer outline-none mx-[1px]"
            >
                {/* Bounce wrapper for macOS app-launch effect */}
                <motion.div
                    animate={isBouncing ? {
                        y: [0, -18, 0, -8, 0, -3, 0],
                    } : { y: 0 }}
                    transition={isBouncing ? {
                        duration: 0.55,
                        ease: 'easeOut',
                        times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
                    } : {}}
                    className="w-full h-full relative flex items-center justify-center"
                >
                    {/* Icon with reflection */}
                    <div className="w-full h-full relative">
                        {item.icon}

                        {/* Glass highlight overlay (top-left corner shine like macOS icons) */}
                        <div
                            className="absolute inset-0 rounded-[22%] pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)',
                            }}
                        />
                    </div>
                </motion.div>

                {/* Active app indicator dot (macOS-authentic) */}
                {isAppOpen && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`absolute -bottom-[5px] rounded-full transition-all duration-300
                            ${isAppMinimized
                                ? 'w-1 h-1 bg-white/40'
                                : 'w-[5px] h-[5px] bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                            }`}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default Dock;
