import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWindowStore } from '../store/useWindowStore';
import { AppId } from '../types';

interface WindowProps {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number | string; height: number | string };
    zIndex: number;
    desktopRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    isOpen,
    isMinimized,
    isMaximized,
    position,
    size,
    zIndex,
    desktopRef,
    children,
}) => {
    const { closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow, activeWindowId } =
        useWindowStore();

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const windowRef = useRef<HTMLDivElement>(null);
    const isActive = activeWindowId === id;
    const dragControls = useDragControls();

    if (!isOpen || isMinimized) return null;

    const handlePointerDown = () => {
        focusWindow(id);
    };

    const handleDragEnd = (_event: any, _info: any) => {
        // Keep dragging uncontrolled so Framer Motion operates smoothly without double-offset updates
    };

    const isFullyMaximized = isMaximized || isMobile;

    // Convert size properties to CSS class values or inline styles
    const windowStyle: React.CSSProperties = {
        zIndex,
        width: isFullyMaximized ? '100%' : size.width,
        height: isFullyMaximized ? 'calc(100dvh - 3.5rem)' : size.height, // Account for top menu and dock space
        top: isFullyMaximized ? '2.25rem' : position.y,
        left: isFullyMaximized ? '0' : position.x,
    };

    return (
        <motion.div
            ref={windowRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            drag={!isFullyMaximized}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={desktopRef}
            dragElastic={0.05}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onPointerDown={handlePointerDown}
            style={windowStyle}
            className={`absolute flex flex-col overflow-hidden glass-panel border border-white/40 shadow-2xl transition-shadow duration-300 sm:max-w-[calc(100vw-1rem)] sm:max-h-[calc(100dvh-5rem)] 
        ${isActive ? 'shadow-black/15 border-white/50 z-[100]' : 'opacity-95 shadow-black/5 z-10'}
        ${isFullyMaximized ? 'rounded-none sm:rounded-none border-0' : 'rounded-xl sm:rounded-xl'}
      `}
        >
            {/* Titlebar */}
            <div
                className="window-titlebar h-10 sm:h-10 px-3 sm:px-4 flex items-center justify-between border-b border-gray-200/50 backdrop-blur-md cursor-default select-none shrink-0"
                onDoubleClick={() => toggleMaximizeWindow(id)}
                onPointerDown={(e) => {
                    dragControls.start(e);
                    focusWindow(id);
                }}
            >
                {/* Left: Window controls (standard macOS traffic lights) */}
                <div className="group/controls flex items-center gap-1.5 sm:gap-2 w-16 sm:w-18" onPointerDown={(e) => e.stopPropagation()}>
                    {/* Close */}
                    <button
                        onClick={() => closeWindow(id)}
                        className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-mac-red flex items-center justify-center border border-red-650/30 active:opacity-75 focus:outline-none"
                        aria-label="Close Window"
                    >
                        <span className="hidden group-hover/controls:flex items-center justify-center text-[8px] font-bold text-red-950 pointer-events-none select-none">
                            ✕
                        </span>
                    </button>
                    {/* Minimize */}
                    <button
                        onClick={() => minimizeWindow(id)}
                        className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-mac-yellow flex items-center justify-center border border-yellow-650/30 active:opacity-75 focus:outline-none"
                        aria-label="Minimize Window"
                    >
                        <span className="hidden group-hover/controls:flex items-center justify-center text-[9px] font-bold text-yellow-950 leading-none -mt-[2.5px] pointer-events-none select-none">
                            —
                        </span>
                    </button>
                    {/* Maximize */}
                    <button
                        onClick={() => toggleMaximizeWindow(id)}
                        className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-mac-green flex items-center justify-center border border-green-650/30 active:opacity-75 focus:outline-none"
                        aria-label="Toggle Maximize"
                    >
                        <span className="hidden group-hover/controls:flex items-center justify-center text-[7px] font-bold text-green-950 pointer-events-none select-none">
                            ⤢
                        </span>
                    </button>
                </div>

                {/* Center: Title */}
                <div className="text-[11px] sm:text-xs font-semibold text-gray-700 tracking-wide select-none truncate">
                    {title}
                </div>

                {/* Right: Spacer for symmetry */}
                <div className="w-16 sm:w-18" />
            </div>

            {/* Content wrapper */}
            <div className="flex-1 overflow-auto bg-white/70 backdrop-blur-3xl text-gray-800 text-xs sm:text-sm">
                {children}
            </div>
        </motion.div>
    );
};

export default Window;
