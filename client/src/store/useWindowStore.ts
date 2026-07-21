import { create } from 'zustand';
import { AppId, WindowState } from '../types';

interface WindowStoreState {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    maxZIndex: number;
    openWindow: (id: AppId) => void;
    closeWindow: (id: AppId) => void;
    minimizeWindow: (id: AppId) => void;
    toggleMaximizeWindow: (id: AppId) => void;
    focusWindow: (id: AppId) => void;
    updatePosition: (id: AppId, x: number, y: number) => void;
    updateSize: (id: AppId, width: number | string, height: number | string) => void;
    bringToFront: (id: AppId) => void;
}

const getInitialWindows = (): Record<AppId, WindowState> => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Default values
    const defaultWidth = isMobile ? 'calc(100vw - 1rem)' : 640;
    const defaultHeight = isMobile ? 'calc(100dvh - 6rem)' : 440;

    return {
        welcome: {
            id: 'welcome',
            title: 'welcome.txt',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 120, y: 100 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 500, height: isMobile ? 'calc(100dvh - 7rem)' : 360 },
            zIndex: 10,
        },
        about: {
            id: 'about',
            title: 'About Me',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 180, y: 80 },
            size: { width: defaultWidth, height: defaultHeight },
            zIndex: 1,
        },
        projects: {
            id: 'projects',
            title: 'Projects',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 230, y: 120 },
            size: { width: defaultWidth, height: defaultHeight },
            zIndex: 1,
        },
        experience: {
            id: 'experience',
            title: 'Experience',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 280, y: 160 },
            size: { width: defaultWidth, height: defaultHeight },
            zIndex: 1,
        },
        resume: {
            id: 'resume',
            title: 'Resume.pdf',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 320, y: 90 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 700, height: isMobile ? 'calc(100dvh - 7rem)' : 540 },
            zIndex: 1,
        },
        contact: {
            id: 'contact',
            title: 'Contact',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 380, y: 140 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 500, height: isMobile ? 'calc(100dvh - 7rem)' : 460 },
            zIndex: 1,
        },
        tictactoe: {
            id: 'tictactoe',
            title: 'Tic-Tac-Toe',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 250, y: 130 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 440, height: isMobile ? 'calc(100dvh - 7rem)' : 460 },
            zIndex: 1,
        },
        reminders: {
            id: 'reminders',
            title: 'Reminders',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 210, y: 150 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 410, height: isMobile ? 'calc(100dvh - 7rem)' : 430 },
            zIndex: 1,
        },
        settings: {
            id: 'settings',
            title: 'System Settings',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            position: isMobile ? { x: 8, y: 56 } : { x: 300, y: 160 },
            size: { width: isMobile ? 'calc(100vw - 1rem)' : 400, height: isMobile ? 'calc(100dvh - 7rem)' : 380 },
            zIndex: 1,
        },
    };
};

export const useWindowStore = create<WindowStoreState>((set, get) => ({
    windows: getInitialWindows(),
    activeWindowId: null,
    maxZIndex: 11,

    openWindow: (id) => {
        const nextZIndex = get().maxZIndex + 1;
        set((state) => {
            const isMobile = window.innerWidth < 768;

            // On mobile, if we open a new window, we want to minimize or close other windows to avoid cluttering,
            // or at least maximize the focus on the current window.
            const updatedWindows = { ...state.windows };

            if (isMobile) {
                // Just stack it but keep size clean
                updatedWindows[id] = {
                    ...updatedWindows[id],
                    isOpen: true,
                    isMinimized: false,
                    zIndex: nextZIndex,
                };
            } else {
                // On desktop, center the window
                const windowState = updatedWindows[id];
                const windowWidth = typeof windowState.size.width === 'number' ? windowState.size.width : 640;
                const windowHeight = typeof windowState.size.height === 'number' ? windowState.size.height : 440;
                
                const centerX = Math.max(0, (window.innerWidth - windowWidth) / 2);
                const centerY = Math.max(40, (window.innerHeight - windowHeight) / 2);
                
                updatedWindows[id] = {
                    ...updatedWindows[id],
                    isOpen: true,
                    isMinimized: false,
                    zIndex: nextZIndex,
                    position: { x: centerX, y: centerY },
                };
            }

            return {
                windows: updatedWindows,
                activeWindowId: id,
                maxZIndex: nextZIndex,
            };
        });
    },

    closeWindow: (id) => {
        set((state) => {
            const updatedWindows = {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isOpen: false,
                },
            };

            // Determine new active window
            // Find open, un-minimized window with highest zIndex
            const openActive = Object.values(updatedWindows)
                .filter((w) => w.isOpen && !w.isMinimized)
                .sort((a, b) => b.zIndex - a.zIndex);

            const nextActiveId = openActive.length > 0 ? openActive[0].id : null;

            return {
                windows: updatedWindows,
                activeWindowId: nextActiveId,
            };
        });
    },

    minimizeWindow: (id) => {
        set((state) => {
            const updatedWindows = {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isMinimized: true,
                },
            };

            // Determine next active window
            const openActive = Object.values(updatedWindows)
                .filter((w) => w.isOpen && !w.isMinimized)
                .sort((a, b) => b.zIndex - a.zIndex);

            const nextActiveId = openActive.length > 0 ? openActive[0].id : null;

            return {
                windows: updatedWindows,
                activeWindowId: nextActiveId,
            };
        });
    },

    toggleMaximizeWindow: (id) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    isMaximized: !state.windows[id].isMaximized,
                },
            },
        }));
    },

    focusWindow: (id) => {
        const nextZIndex = get().maxZIndex + 1;
        set((state) => {
            // Don't focus if its minimized
            if (state.windows[id].isMinimized) {
                return {
                    windows: {
                        ...state.windows,
                        [id]: {
                            ...state.windows[id],
                            isMinimized: false,
                            zIndex: nextZIndex,
                        },
                    },
                    activeWindowId: id,
                    maxZIndex: nextZIndex,
                };
            }

            return {
                windows: {
                    ...state.windows,
                    [id]: {
                        ...state.windows[id],
                        zIndex: nextZIndex,
                    },
                },
                activeWindowId: id,
                maxZIndex: nextZIndex,
            };
        });
    },

    updatePosition: (id, x, y) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    position: { x, y },
                },
            },
        }));
    },

    updateSize: (id, width, height) => {
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    size: { width, height },
                },
            },
        }));
    },

    bringToFront: (id) => {
        const nextZIndex = get().maxZIndex + 1;
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: {
                    ...state.windows[id],
                    zIndex: nextZIndex,
                },
            },
            maxZIndex: nextZIndex,
            activeWindowId: id,
        }));
    },
}));
