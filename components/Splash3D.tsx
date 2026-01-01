import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Trail, CameraShake, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

interface Splash3DProps {
    onComplete: () => void;
}

function ParticleField(props: any) {
    const ref = useRef<any>();
    const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 2.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00ffff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function NeuralCore() {
    const groupRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Breathing scale
            const scale = 1 + Math.sin(t * 2) * 0.05;
            groupRef.current.scale.set(scale, scale, scale);
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = t * 0.5;
            ring1Ref.current.rotation.y = t * 0.3;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = t * -0.4;
            ring2Ref.current.rotation.z = t * 0.2;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.y = t * 0.6;
            ring3Ref.current.rotation.z = t * -0.3;
        }
    });

    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={groupRef}>
                {/* Central Dense Core */}
                <Sphere args={[0.5, 32, 32]}>
                    <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </Sphere>

                {/* Inner Glow Sphere */}
                <Sphere args={[0.4, 32, 32]}>
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </Sphere>

                {/* Rotating Rings */}
                <mesh ref={ring1Ref}>
                    <torusGeometry args={[0.8, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#8a2be2" transparent opacity={0.6} />
                </mesh>
                <mesh ref={ring2Ref}>
                    <torusGeometry args={[1.1, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
                </mesh>
                <mesh ref={ring3Ref}>
                    <torusGeometry args={[1.4, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>
            </group>
        </Float>
    );
}

function DataStreams() {
    const streamRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (streamRef.current) {
            streamRef.current.rotation.y += 0.02;
        }
    });

    return (
        <group ref={streamRef}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Trail
                    key={i}
                    width={2}
                    length={8}
                    color={new THREE.Color(i % 2 === 0 ? "#00ffff" : "#8a2be2")}
                    attenuation={(t) => t * t}
                >
                    <mesh position={[Math.sin(i) * 3, Math.cos(i) * 3, 0]}>
                        <sphereGeometry args={[0.05]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </Trail>
            ))}
        </group>
    )
}

function CameraController({ isExiting }: { isExiting: boolean }) {
    const { camera } = useThree();

    useFrame((state, delta) => {
        if (isExiting) {
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, -10, delta * 2);
            camera.fov = THREE.MathUtils.lerp(camera.fov, 120, delta * 2);
            camera.updateProjectionMatrix();
        } else {
            // Subtle mouse parallax could go here if needed, but CameraShake handles the vibe well
        }
    });

    return (
        <CameraShake
            maxYaw={0.05}
            maxPitch={0.05}
            maxRoll={0.05}
            yawFrequency={0.1}
            pitchFrequency={0.1}
            rollFrequency={0.1}
            intensity={1}
            decayRate={0.65}
        />
    );
}

export const Splash3D: React.FC<Splash3DProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.max(0.2, (100 - prev) * 0.08 * Math.random());
                return Math.min(prev + increment, 100);
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 1500);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{
                opacity: isExiting ? 0 : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <div className="absolute inset-0 w-full h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false }}>
                    <color attach="background" args={['#050505']} />

                    <Scene isExiting={isExiting} />

                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        <ChromaticAberration offset={[0.002, 0.002]} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: isExiting ? 0 : 1,
                        scale: isExiting ? 1.5 : 1,
                        filter: isExiting ? "blur(20px)" : "blur(0px)"
                    }}
                    transition={{ duration: 1 }}
                    className="text-center z-50"
                >
                    <h1 className="font-serif italic text-6xl md:text-8xl text-white tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                        Agnometry
                    </h1>
                </motion.div>
            </div>

            {/* Progress Counter - Centered Bottom */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center mix-blend-difference z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-baseline gap-2">
                    <span className="font-mono text-5xl text-white tabular-nums tracking-tighter">
                        {Math.floor(progress).toString().padStart(3, '0')}
                    </span>
                    <span className="font-mono text-sm text-accent-cyan">%</span>
                </div>
                <div className="w-32 h-[2px] bg-white/10 mt-2 relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute inset-0 bg-accent-cyan"
                        initial={{ x: '-100%' }}
                        animate={{ x: `${progress - 100}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

function Scene({ isExiting }: { isExiting: boolean }) {
    return (
        <>
            <CameraController isExiting={isExiting} />
            <ParticleField />
            <NeuralCore />
            <DataStreams />
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        </>
    );
}
