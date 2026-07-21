import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { updateAmbientSynth } from '../utils/audio';

const InteractiveBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring configuration to track mouse positions
    const springConfig = { damping: 65, stiffness: 100, mass: 1.8 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Parallax multipliers for each individual blob with alternating directions
    const xBlob1 = useTransform(smoothX, (v) => v * 0.08);
    const yBlob1 = useTransform(smoothY, (v) => v * 0.08);

    const xBlob2 = useTransform(smoothX, (v) => v * -0.12);
    const yBlob2 = useTransform(smoothY, (v) => v * -0.12);

    const xBlob3 = useTransform(smoothX, (v) => v * 0.06);
    const yBlob3 = useTransform(smoothY, (v) => v * 0.06);

    const xBlob4 = useTransform(smoothX, (v) => v * -0.07);
    const yBlob4 = useTransform(smoothY, (v) => v * -0.07);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset coordinates around window center
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;
            mouseX.set(x);
            mouseY.set(y);

            // Web Audio normalized panning coordinates (-1.0 to 1.0)
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = (e.clientY / window.innerHeight) * 2 - 1;
            updateAmbientSynth(normX, normY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Blob 1: Deep Royal Blue (top left) */}
            <motion.div
                animate={{
                    x: [0, 40, -30, 0],
                    y: [0, -60, 40, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: xBlob1,
                    y: yBlob1,
                }}
                className="absolute top-[-15%] left-[-15%] w-[60vw] h-[55vh] rounded-full bg-blue-600/25 blur-[130px]"
            />

            {/* Blob 2: Electric Purple (top right) */}
            <motion.div
                animate={{
                    x: [0, -40, 50, 0],
                    y: [0, 70, -30, 0],
                    scale: [1, 0.92, 1.12, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: xBlob2,
                    y: yBlob2,
                }}
                className="absolute top-[5%] right-[-10%] w-[55vw] h-[60vh] rounded-full bg-purple-600/20 blur-[140px]"
            />

            {/* Blob 3: Deep Cozy Indigo (bottom right) */}
            <motion.div
                animate={{
                    x: [0, 60, -45, 0],
                    y: [0, -40, 60, 0],
                    scale: [1, 1.1, 0.88, 1],
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: xBlob3,
                    y: yBlob3,
                }}
                className="absolute bottom-[-15%] right-[-5%] w-[65vw] h-[55vh] rounded-full bg-indigo-500/20 blur-[150px]"
            />

            {/* Blob 4: Neon Sky Blue (bottom left) */}
            <motion.div
                animate={{
                    x: [0, -50, 40, 0],
                    y: [0, 50, -60, 0],
                    scale: [1, 1.2, 0.85, 1],
                }}
                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    x: xBlob4,
                    y: yBlob4,
                }}
                className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-sky-500/15 blur-[120px]"
            />
        </div>
    );
};

export default InteractiveBackground;
