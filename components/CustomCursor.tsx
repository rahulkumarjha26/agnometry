import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
    const [isText, setIsText] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the cursor
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Velocity for distortion (Squash & Stretch)
    const velocityX = useVelocity(cursorX);
    const velocityY = useVelocity(cursorY);
    const scaleX = useTransform(velocityX, [-1000, 0, 1000], [1.2, 1, 1.2]);
    const scaleY = useTransform(velocityY, [-1000, 0, 1000], [0.8, 1, 0.8]);

    // Rotation based on movement direction
    const rotate = useTransform(velocityX, [-1000, 1000], [-45, 45]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // If not hovering an element, follow mouse directly
            if (!hoveredRect) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            } else {
                // If hovering, snap to center of element
                const centerX = hoveredRect.left + hoveredRect.width / 2;
                const centerY = hoveredRect.top + hoveredRect.height / 2;
                mouseX.set(centerX);
                mouseY.set(centerY);
            }

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const isButton = target.closest('button') || target.closest('a') || target.getAttribute('role') === 'button';
            const isTextInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
            const isTextElement = target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN';

            if (isButton) {
                const rect = (isButton as HTMLElement).getBoundingClientRect();
                setHoveredRect(rect);
                setIsText(false);
            } else if (isTextInput || (isTextElement && window.getSelection()?.toString())) {
                // Only treat as text if it's an input or user is selecting (simplified for now to just text elements)
                // Actually, let's just do it for all text elements to give that "I-beam" feel
                setHoveredRect(null);
                setIsText(true);
            } else {
                setHoveredRect(null);
                setIsText(false);
            }
        };

        const handleScroll = () => {
            // Update rect if scrolling while hovering
            if (hoveredRect) {
                setHoveredRect(null); // Reset to avoid detached cursor
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hoveredRect, mouseX, mouseY, isVisible]);

    return (
        <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference">
            {/* The Fluid Observer Aura */}
            <motion.div
                className="fixed top-0 left-0 bg-accent-cyan rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scaleX: hoveredRect ? 1 : scaleX, // Disable distortion when locked
                    scaleY: hoveredRect ? 1 : scaleY,
                    rotate: hoveredRect ? 0 : rotate,
                }}
                animate={{
                    width: hoveredRect ? hoveredRect.width + 8 : (isText ? 2 : 20),
                    height: hoveredRect ? hoveredRect.height + 8 : (isText ? 24 : 20),
                    borderRadius: hoveredRect ? "12px" : (isText ? "2px" : "50%"),
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isText ? "#ffffff" : (hoveredRect ? "rgba(255, 255, 255, 0.02)" : "#00ffff"),
                    border: hoveredRect ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    backdropFilter: hoveredRect ? "brightness(1.3) saturate(1.2)" : "none",
                    mixBlendMode: isText ? "difference" : "normal",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.5 // Heavier feel
                }}
            />

            {/* The Core (Only visible when not hovering a button) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: hoveredRect ? 0 : (isText ? 0 : 1),
                    opacity: hoveredRect ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};
