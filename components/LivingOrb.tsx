import React from 'react';
import { motion } from 'framer-motion';

export const LivingOrb: React.FC = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0"
    >
      <div
        className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-60"
      >
        {/* Amber Blob */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          className="absolute top-0 left-0 w-full h-full bg-accent-cyan/20 rounded-full blur-[100px] mix-blend-screen"
        />

        {/* Bronze Blob */}
        <motion.div
          animate={{
            x: [0, -70, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 35, // Slower
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          className="absolute top-1/4 right-0 w-3/4 h-3/4 bg-accent-violet/20 rounded-full blur-[120px] mix-blend-screen"
        />

        {/* Obsidian/Gold Blob */}
        <motion.div
          animate={{
            x: [0, 60, -80, 0],
            y: [0, 50, 20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30, // Slower
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          className="absolute bottom-0 left-1/4 w-3/4 h-3/4 bg-white/10 rounded-full blur-[110px] mix-blend-screen"
        />
      </div>
    </div>
  );
};