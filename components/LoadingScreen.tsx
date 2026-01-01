import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
    "Initializing Neural Workers...",
    "Quantifying Intelligence...",
    "Establishing Sovereign Perimeter...",
    "Loading Enterprise Memory...",
    "Calibrating Agentic Protocols...",
    "Synthesizing Digital Labor...",
];

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        // Cycle quotes
        const quoteInterval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }, 2000);

        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Fast at first, then slows down
                const increment = prev < 60 ? Math.random() * 10 : Math.random() * 2;
                return Math.min(prev + increment, 99);
            });
        }, 150);

        // Ensure we hit 100% when window loads
        const handleLoad = () => {
            setProgress(100);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(quoteInterval);
            clearInterval(progressInterval);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 800); // Slight delay at 100% before exit
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/5 blur-[100px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
                {/* Logo / Spinner */}
                <div className="relative w-16 h-16">
                    <motion.div
                        className="absolute inset-0 border-2 border-white/10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute inset-0 border-t-2 border-accent-cyan rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center gap-2 h-12">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={quoteIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm font-mono text-white/60 uppercase tracking-widest text-center"
                        >
                            {QUOTES[quoteIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-accent-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                </div>

                {/* Percentage */}
                <div className="font-mono text-xs text-white/30 tabular-nums">
                    {Math.round(progress)}%
                </div>
            </div>
        </motion.div>
    );
};
