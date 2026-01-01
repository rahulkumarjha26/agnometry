import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Simulate loading progress - smoother and slower for elegance
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Very smooth, non-linear progression
                const increment = Math.max(0.5, (100 - prev) * 0.05 * Math.random());
                return Math.min(prev + increment, 99.9);
            });
        }, 100);

        const handleLoad = () => {
            setProgress(100);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(progressInterval);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 1200); // Wait for exit animation
            }, 1000); // Hold at 100% for a moment
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden cursor-none"
            initial={{ opacity: 1 }}
            animate={{
                opacity: isExiting ? 0 : 1,
                pointerEvents: isExiting ? 'none' : 'auto'
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            {/* Central Typography */}
            <div className="relative z-10 overflow-hidden">
                <motion.h1
                    initial={{ y: 20, opacity: 0, filter: "blur(20px)" }}
                    animate={{
                        y: isExiting ? -20 : 0,
                        opacity: isExiting ? 0 : 1,
                        filter: isExiting ? "blur(10px)" : "blur(0px)"
                    }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif italic text-4xl md:text-6xl text-white font-medium tracking-tight mix-blend-difference"
                >
                    Agnometry
                </motion.h1>

                {/* Subtle underline reveal */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isExiting ? 0 : "100%", opacity: isExiting ? 0 : 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[1px] bg-accent-cyan mt-4 mx-auto"
                />
            </div>

            {/* Minimalist Progress Counter (Bottom Right) */}
            <motion.div
                className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className="flex items-baseline gap-1">
                    <span className="font-mono text-4xl md:text-5xl font-light text-white/90 tabular-nums tracking-tighter">
                        {Math.floor(progress).toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm text-accent-cyan/80 mb-1">%</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                    System Initialization
                </span>
            </motion.div>

            {/* Ambient Glow - Breathing */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1.1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none"
            />
        </motion.div>
    );
};
