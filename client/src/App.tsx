import React, { Suspense, lazy, useState } from 'react';
import MenuBar from './components/MenuBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import InteractiveBackground from './components/InteractiveBackground';
import Preloader from './components/Preloader';

// Lazy loading the R3F Canvas component so first paint is super punchy
const Background3D = lazy(() => import('./components/Background3D'));

const App: React.FC = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    return (
        <div
            className="wallpaper-mesh w-full h-[100dvh] relative overflow-hidden select-none"
            style={{
                background: 'linear-gradient(135deg, #05081c 0%, #0b164a 30%, #094cb5 70%, #581c87 100%)',
                backgroundSize: '400% 400%',
            }}
        >
            {/* Dark macOS-style Boot screen Preloader */}
            {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

            {/* Interactive framer-motion watercolor blobs */}
            <InteractiveBackground />

            {/* 3D Ambient Layer - Petals / Pollen drift system */}
            <Suspense fallback={null}>
                <Background3D />
            </Suspense>

            {/* Top Menu Bar */}
            <MenuBar />

            {/* Main Interactive Desktop area */}
            <Desktop />

            {/* Bottom Floating App Dock */}
            <Dock />

            {/* Accessibility Focus Rings Helper (for tab navigation) */}
            <span className="sr-only">Ayush Kumar Sao Portfolio - Press Tab for Accessibility options</span>
        </div>
    );
};

export default App;
