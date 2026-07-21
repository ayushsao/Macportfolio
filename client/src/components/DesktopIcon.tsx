import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
    label: string;
    type: 'folder' | 'file' | 'pdf' | 'mail';
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
    label,
    type,
    isSelected,
    onClick,
    onDoubleClick,
}) => {

    // Custom premium SVG renders for different desktop items
    const renderIcon = () => {
        switch (type) {
            case 'folder':
                return (
                    <svg className="w-12 h-12 drop-shadow-md select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#93c5fd" /> {/* sleek macOS Ventura blue */}
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="folderBack" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1a56db" />
                            </linearGradient>
                        </defs>
                        {/* Folder Back */}
                        <path d="M10 25C10 21.6863 12.6863 19 16 19H38L47 30H84C87.3137 30 90 32.6863 90 36V78C90 81.3137 87.3137 84 84 84H16C12.6863 84 10 81.3137 10 78V25Z" fill="url(#folderBack)" />
                        {/* Inside sheet */}
                        <rect x="20" y="24" width="60" height="40" rx="4" fill="#ffffff" opacity="0.85" />
                        <rect x="28" y="32" width="44" height="4" rx="2" fill="#e2e8f0" />
                        <rect x="28" y="42" width="30" height="4" rx="2" fill="#e2e8f0" />
                        {/* Folder Front Cover with slightly smaller height representing the opened lip */}
                        <path d="M10 35C10 31.6863 12.6863 29 16 29H84C87.3137 29 90 31.6863 90 35V78C90 81.3137 87.3137 84 84 84H16C12.6863 84 10 81.3137 10 78V35Z" fill="url(#folderGrad)" />
                    </svg>
                );
            case 'pdf':
                return (
                    <svg className="w-12 h-12 drop-shadow-md select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pdfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                        {/* Document sheet */}
                        <path d="M20 15C20 12.2386 22.2386 10 25 10H60L80 30V85C80 87.7614 77.7614 90 75 90H25C22.2386 90 20 87.7614 20 85V15Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
                        {/* Folded Corner */}
                        <path d="M60 10V30H80L60 10Z" fill="#f1f5f9" />
                        {/* PDF Emblem Banner */}
                        <rect x="25" y="45" width="50" height="26" rx="4" fill="url(#pdfGrad)" />
                        <text x="50" y="63" fill="#ffffff" fontSize="13" fontWeight="900" fontStyle="sans-serif" textAnchor="middle">PDF</text>
                        {/* Content lines */}
                        <rect x="30" y="77" width="40" height="3" rx="1.5" fill="#cbd5e1" />
                    </svg>
                );
            case 'mail':
                return (
                    <svg className="w-12 h-12 drop-shadow-md select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#93c5fd" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                        {/* Card backing */}
                        <rect x="15" y="20" width="70" height="60" rx="10" fill="url(#mailGrad)" />
                        {/* Envelope flap open line */}
                        <path d="M15 25L50 52L85 25" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Front flap bottom lines */}
                        <path d="M15 75L40 50" stroke="#ffffff" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                        <path d="M85 75L60 50" stroke="#ffffff" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
                    </svg>
                );
            case 'file':
            default:
                return (
                    <svg className="w-12 h-12 drop-shadow-md select-none pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Document sheet */}
                        <path d="M20 15C20 12.2386 22.2386 10 25 10H60L80 30V85C80 87.7614 77.7614 90 75 90H25C22.2386 90 20 87.7614 20 85V15Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
                        {/* Folded Corner */}
                        <path d="M60 10V30H80L60 10Z" fill="#f1f5f9" />
                        {/* Text lines simulating content */}
                        <rect x="30" y="42" width="40" height="3" rx="1.5" fill="#94a3b8" />
                        <rect x="30" y="52" width="30" height="3" rx="1.5" fill="#94a3b8" />
                        <rect x="30" y="62" width="40" height="3" rx="1.5" fill="#94a3b8" />
                        <rect x="30" y="72" width="22" height="3" rx="1.5" fill="#94a3b8" />
                    </svg>
                );
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className={`w-16 sm:w-20 flex flex-col items-center p-1.5 sm:p-2 rounded-xl transition duration-150 cursor-default select-none border border-transparent
        ${isSelected ? 'desktop-selection backdrop-blur-md' : 'hover:bg-white/10 hover:backdrop-blur-sm'}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onClick(e);
            }}
            onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onDoubleClick();
            }}
        >
            <div className="flex items-center justify-center mb-1">
                {renderIcon()}
            </div>
            <span className="text-[10px] sm:text-[11px] text-center text-white font-medium drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)] px-1 rounded truncate w-full">
                {label}
            </span>
        </motion.div>
    );
};

export default DesktopIcon;
