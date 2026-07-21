import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalsProps {
    count?: number;
}

// Falling cherry blossom petals
const PetalParticles: React.FC<PetalsProps> = ({ count = 50 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const data = [];
        const colors = [
            new THREE.Color('#ffc0cb'), // soft pink
            new THREE.Color('#ffe4e1'), // misty rose
            new THREE.Color('#eef7fa'), // soft blue
        ];

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * viewport.width * 1.5;
            const y = (Math.random() - 0.5) * viewport.height * 1.5;
            const z = (Math.random() - 0.5) * 8;

            const speedY = 0.04 + Math.random() * 0.08;
            const speedX = -0.02 + Math.random() * 0.04;
            const speedRot = 0.2 + Math.random() * 0.6;

            const size = 0.05 + Math.random() * 0.1;
            const waveFreq = 0.6 + Math.random() * 1.2;
            const waveAmp = 0.08 + Math.random() * 0.22;

            const color = colors[Math.floor(Math.random() * colors.length)];

            data.push({ x, y, z, speedX, speedY, speedRot, size, waveFreq, waveAmp, color, seed: Math.random() * 100 });
        }
        return data;
    }, [count, viewport]);

    useFrame((state: any) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        particles.forEach((p, i) => {
            p.y -= p.speedY * 0.08;

            const wave = Math.sin(time * p.waveFreq + p.seed) * p.waveAmp;
            p.x += p.speedX * 0.08 + wave * 0.008;

            const rotX = time * p.speedRot * 0.12 + p.seed;
            const rotY = time * p.speedRot * 0.2 + p.seed;
            const rotZ = time * p.speedRot * 0.06 + p.seed;

            const halfW = viewport.width * 0.8;
            const halfH = viewport.height * 0.8;

            if (p.y < -halfH) {
                p.y = halfH;
                p.x = (Math.random() - 0.5) * viewport.width * 1.5;
            }
            if (p.x < -halfW) {
                p.x = halfW;
            } else if (p.x > halfW) {
                p.x = -halfW;
            }

            dummy.position.set(p.x, p.y, p.z);
            dummy.rotation.set(rotX, rotY, rotZ);
            dummy.scale.set(p.size, p.size * 0.65, p.size);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
            meshRef.current!.setColorAt(i, p.color);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                transparent
                opacity={0.45}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </instancedMesh>
    );
};

// Orbiting satellites around the glass centerpiece
const OrbitGlowRing: React.FC<{ radius: number; rotX: number; rotY: number; color: string; speed: number }> = ({ radius, rotX, rotY, color, speed }) => {
    const ringRef = useRef<THREE.Mesh>(null);
    const moonRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.08 * speed;
        }
        if (moonRef.current) {
            const angle = time * 0.45 * speed;
            moonRef.current.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                Math.sin(angle * 2) * 0.12
            );
        }
    });

    return (
        <group rotation={[rotX, rotY, 0]}>
            <mesh ref={ringRef}>
                <torusGeometry args={[radius, 0.01, 8, 64]} />
                <meshBasicMaterial color={color} transparent opacity={0.15} />
            </mesh>
            <mesh ref={moonRef}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.0}
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
};

// Independent glass petal element for breathing/blooming
interface PetalProps {
    angle: number;
    rad: number;
    idx: number;
}

const BloomingPetal: React.FC<PetalProps> = ({ rad, idx }) => {
    const petalRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (petalRef.current) {
            const bloom = 0.95 + Math.sin(time * 0.75 + idx * 0.6) * 0.06;
            petalRef.current.position.set(
                Math.cos(rad) * bloom,
                Math.sin(rad) * bloom,
                Math.sin(time * 1.2 + idx) * 0.035
            );
            petalRef.current.rotation.z = rad + Math.sin(time * 1.0 + idx) * 0.05;
        }
    });

    return (
        <mesh
            ref={petalRef}
            scale={[1.0, 0.42, 0.18]}
        >
            <sphereGeometry args={[0.8, 32, 16]} />
            <meshPhysicalMaterial
                color="#fff1f2"
                roughness={0.08}
                metalness={0.1}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                transmission={0.88}
                thickness={2.0}
                ior={1.5}
                attenuationColor="#f43f5e"
                attenuationDistance={0.5}
                transparent
                opacity={0.85}
            />
        </mesh>
    );
};

// Interactive 3D Glass Blossom centerpiece
const InteractiveGlassCenter: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    const posX = viewport.width > 9.5 ? (viewport.width * 0.22) : 0;

    useFrame((state: any) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        groupRef.current.rotation.z = time * 0.06;

        const targetRotX = state.pointer.y * 0.45;
        const targetRotY = state.pointer.x * 0.45;

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

        groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <group ref={groupRef} position={[posX, -0.1, 1.5]}>
            {/* Center Core Pistil */}
            <mesh>
                <sphereGeometry args={[0.38, 32, 32]} />
                <meshStandardMaterial
                    color="#fca5a5"
                    roughness={0.2}
                    metalness={0.7}
                    emissive="#f43f5e"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* 5 Blooming Petals arranged pentagonally */}
            {[0, 72, 144, 216, 288].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                return (
                    <BloomingPetal
                        key={idx}
                        angle={angle}
                        rad={rad}
                        idx={idx}
                    />
                );
            })}

            {/* Concentric Tech Orbits circling the blossom center */}
            <OrbitGlowRing radius={1.5} rotX={Math.PI / 4.5} rotY={Math.PI / 6} color="#fb7185" speed={1.1} />
            <OrbitGlowRing radius={1.9} rotX={-Math.PI / 4.5} rotY={-Math.PI / 6} color="#38bdf8" speed={0.8} />
        </group>
    );
};

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

                {/* Floating blossom and falling petals */}
                <InteractiveGlassCenter />
                <PetalParticles count={40} />

                {/* Floating background crystal details */}
                <FloatingCrystal position={[-5.8, 3.2, -1.5]} size={0.25} color="#f472b6" speed={1.1} seed={12} />
                <FloatingCrystal position={[6.2, -2.8, -2]} size={0.3} color="#38bdf8" speed={0.9} seed={24} />
                <FloatingCrystal position={[-1.8, -3.8, -1]} size={0.2} color="#34d399" speed={1.3} seed={38} />
            </Canvas>
        </div>
    );
};

export default Background3D;
