import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Point Cloud wave interaction (Wavy Dots Grid)
const WavyDotsGrid: React.FC = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    // Dense grid layout (35 x 35)
    const cols = 35;
    const rows = 35;
    const count = cols * rows;

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Compute coordinate mapping offset
    const gridData = useMemo(() => {
        const data = [];
        const spacingX = 0.58;
        const spacingZ = 0.58;
        const startX = -((cols - 1) * spacingX) / 2;
        const startZ = -((rows - 1) * spacingZ) / 2;

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                const x = startX + c * spacingX;
                const z = startZ + r * spacingZ;
                data.push({ x, z });
            }
        }
        return data;
    }, [cols, rows]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Project pointer Coordinates (-1 to 1) into responsive scene space
        const mouseX = state.pointer.x * viewport.width * 0.5;
        const mouseY = state.pointer.y * viewport.height * 0.5;

        gridData.forEach((pt, i) => {
            // Baseline 3D Sine Wave ripple calculation
            const waveY1 = Math.sin(pt.x * 0.2 + time * 1.4) * 0.4;
            const waveY2 = Math.cos(pt.z * 0.2 + time * 1.4) * 0.4;
            let y = waveY1 + waveY2;

            // Compute distance from pointer to coordinate in viewport plane
            const dx = pt.x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let scale = 0.07;
            const baseColor = new THREE.Color('#1e1b4b'); // deep indigo-950
            const activeColor = new THREE.Color('#38bdf8'); // neon cyan
            const highlightColor = new THREE.Color('#ec4899'); // hot pink
            let finalColor = baseColor;

            // Hover Ripple & Color distortion
            if (dist < 2.8) {
                const force = 1.0 - dist / 2.8; // 0 to 1
                y += Math.sin(time * 3.5 - dist * 4) * 0.3 * force;
                scale += force * 0.08;

                // Color interpolation: lerps from indigo to cyan
                finalColor = baseColor.clone().lerp(activeColor, force * 0.9);

                // Emissive pink glow highlights when extremely close
                if (dist < 1.1) {
                    finalColor.lerp(highlightColor, (1.1 - dist) * 0.8);
                }
            }

            dummy.position.set(pt.x, y, pt.z);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
            meshRef.current!.setColorAt(i, finalColor);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[null as any, null as any, count]}
            position={[0, -2.4, -0.5]}
            rotation={[Math.PI / 4.4, 0, 0]}
        >
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial roughness={0.15} metalness={0.75} />
        </instancedMesh>
    );
};

// Background crystals
const FloatingCrystal: React.FC<{ position: [number, number, number]; size: number; color: string; speed: number; seed: number }> = ({ position, size, color, speed, seed }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.x = time * 0.2 * speed + seed;
            ref.current.rotation.y = time * 0.3 * speed + seed;
            ref.current.position.y = position[1] + Math.sin(time * 0.6 * speed + seed) * 0.3;
            ref.current.position.x = position[0] + Math.cos(time * 0.4 * speed + seed) * 0.12;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <octahedronGeometry args={[size, 0]} />
            <meshPhysicalMaterial
                color={color}
                roughness={0.1}
                clearcoat={1.0}
                transmission={0.7}
                thickness={1.0}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
};

const Background3D: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ background: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 55 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                    premultipliedAlpha: true
                }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' }}
                onCreated={(state) => {
                    state.gl.setClearColor(0x000000, 0);
                }}
            >
                <ambientLight intensity={1.1} />
                <directionalLight position={[5, 10, 5]} intensity={1.8} />

                <pointLight position={[-8, 6, 4]} color="#f43f5e" intensity={4.0} distance={20} decay={2} />
                <pointLight position={[8, -6, 4]} color="#38bdf8" intensity={3.0} distance={20} decay={2} />
                <pointLight position={[0, -8, 6]} color="#818cf8" intensity={2.5} distance={18} decay={2} />

                {/* Interactive Wave Grid in Perspective Plane */}
                <WavyDotsGrid />

                {/* Floating background crystal details */}
                <FloatingCrystal position={[-5.8, 3.2, -1.5]} size={0.25} color="#f472b6" speed={1.1} seed={12} />
                <FloatingCrystal position={[6.2, -2.8, -2]} size={0.3} color="#38bdf8" speed={0.9} seed={24} />
                <FloatingCrystal position={[-1.8, -3.8, -1]} size={0.2} color="#34d399" speed={1.3} seed={38} />
            </Canvas>
        </div>
    );
};

export default Background3D;
