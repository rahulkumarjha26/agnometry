import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const Card3D: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay }}
            className={`relative group cursor-pointer ${className}`}
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-accent-cyan/30 group-hover:shadow-[0_0_50px_rgba(0,255,255,0.1)]"
                style={{ transform: "translateZ(0px)", contain: 'layout style paint' }}
            />
            <div className="relative p-10 flex flex-col items-center h-full" style={{ transform: "translateZ(40px)" }}>
                {children}
            </div>
        </motion.div>
    );
};
