import React from 'react';
import { motion } from 'framer-motion';
import { SkewedText } from './SkewedText';

// --- Meaningful 3D Visuals (Literal Metaphors) ---

// 1. Discovery (Radar Scan): Represents "Searching" & "Mapping"
const VisualScan = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="relative w-48 h-48 border border-white/10 rounded-full flex items-center justify-center bg-accent-cyan/5 shadow-[0_0_30px_rgba(34,211,238,0.05)_inset]">
      {/* Grid Lines */}
      <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.7]" />
      <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.4]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-white/10" />
        <div className="h-full w-[1px] bg-white/10 absolute" />
      </div>

      {/* Radar Beam (Conic Gradient) - STABLE ROTATION */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(34, 211, 238, 0.4) 360deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Center Point */}
      <div className="absolute w-2 h-2 bg-accent-cyan rounded-full z-10 shadow-[0_0_10px_cyan]" />

      {/* Blips */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
          style={{
            top: 40 + i * 35,
            left: 100 + (i % 2 === 0 ? 30 : -30)
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2, delay: i * 0.8, repeat: Infinity }}
        />
      ))}
    </div>
  </div>
);

// 2. Solution (Self-Assembling Cube): Represents "Building" & "Structure"
const VisualAssembly = () => (
  <div className="relative w-full h-64 flex items-center justify-center perspective-[800px]">
    <motion.div
      className="relative w-32 h-32"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Core Cube */}
      <div className="absolute inset-8 bg-accent-violet/20 backdrop-blur-sm border border-accent-violet/50 box-border animate-pulse" style={{ transform: "translateZ(0)" }} />

      {/* Floating Plates Assembling */}
      <motion.div
        className="absolute inset-0 border-2 border-accent-violet"
        animate={{ z: [60, 20, 60], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(40px)" }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-accent-violet"
        animate={{ z: [-60, -20, -60], opacity: [0, 1, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(-40px)" }}
      />
    </motion.div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-violet/5 blur-3xl rounded-full" />
  </div>
);

// 3. Evolution (DNA Helix): Represents "Growth" & "Intelligence"
const VisualHelix = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="relative w-20 h-40 flex flex-col items-center justify-between">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full h-[2px] bg-accent-emerald/30 relative"
          style={{ top: i * 5 }}
        >
          <motion.div
            className="absolute left-0 w-2 h-2 bg-accent-emerald rounded-full shadow-[0_0_5px_#10b981]"
            animate={{ x: [0, 70, 0], scale: [0.8, 1.2, 0.8], zIndex: [0, 10, 0] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 w-2 h-2 bg-accent-emerald rounded-full shadow-[0_0_5px_#10b981]"
            animate={{ x: [0, -70, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-emerald/5 blur-3xl rounded-full" />
  </div>
);


const plans = [
  {
    title: "Discovery",
    visual: <VisualScan />,
    sub: "The Audit",
    copy: "We analyze your business. We map your workflows and identify exactly where AI agents can save you money.",
    cta: "Start Analysis",
    accent: "text-accent-cyan",
    border: "hover:border-accent-cyan/30"
  },
  {
    title: "Solution",
    visual: <VisualAssembly />,
    sub: "The Build",
    copy: "We build your workforce. Bespoke agents, trained on your data, deployed securely into your private cloud.",
    cta: "Start Build",
    accent: "text-accent-violet",
    border: "hover:border-accent-violet/30"
  },
  {
    title: "Evolution",
    visual: <VisualHelix />,
    sub: "The Partner",
    copy: "We keep you ahead. A dedicated R&D team ensuring your agents grow smarter as the technology advances.",
    cta: "Join Lab",
    accent: "text-accent-emerald",
    border: "hover:border-accent-emerald/30"
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-32 px-[clamp(2rem,5vw,5rem)] relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto">

        {/* Simple, Human Header */}
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-8"
          >
            05 — Engagement
          </motion.span>
          <div className="flex justify-center">
            <SkewedText>
              <h2 className="text-5xl md:text-7xl leading-[1.1] text-white font-serif italic text-center">
                How we work <br /> <span className="text-white/50 not-italic font-sans font-bold tracking-tighter">together.</span>
              </h2>
            </SkewedText>
          </div>
        </div>

        {/* Clean, Open Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group p-8 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors duration-500 ${plan.border}`}
            >
              {/* Visual Anchor */}
              <div className="mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex justify-center">
                {plan.visual}
              </div>

              {/* Content */}
              <div className="text-center">
                <span className={`text-xs font-mono uppercase tracking-widest mb-3 block ${plan.accent}`}>{plan.sub}</span>
                <h3 className="text-3xl text-white font-medium mb-6 tracking-tight">{plan.title}</h3>
                <p className="text-white/60 font-light leading-relaxed mb-10 min-h-[80px]">
                  {plan.copy}
                </p>

                <button className="px-8 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white hover:text-black transition-all duration-300">
                  {plan.cta}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};