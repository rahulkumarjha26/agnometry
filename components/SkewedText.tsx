import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export const SkewedText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Transform scroll velocity into a skew value. 
    // We clamp it so it doesn't get too crazy.
    const skewX = useTransform(smoothVelocity, [-2000, 2000], [1, -1]);

    return (
        <motion.div style={{ skewX }} className={className}>
            {children}
        </motion.div>
    );
};
