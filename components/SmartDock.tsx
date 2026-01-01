import React from 'react';
import { motion } from 'framer-motion';

export const SmartDock: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/50 rounded-full"
      >
        {/* Primary Action: High Contrast White Pill */}
        <button
          className="relative px-6 py-2.5 bg-white text-black rounded-full overflow-hidden group transition-transform active:scale-95"
          onClick={() => console.log('Launch Console')}
        >
          <span className="relative z-10 text-xs font-semibold tracking-wide">Launch Console</span>
          {/* Subtle sheen on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </button>

        {/* Secondary Action: Subtle Text */}
        <button
          className="px-6 py-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95"
          onClick={() => scrollTo('team')}
        >
          <span className="text-xs font-medium tracking-wide">Request Access</span>
        </button>

      </motion.div>
    </div>
  );
};