import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { SkewedText } from './SkewedText';

import { Card3D } from './Card3D';

// --- Visualization Components ---

const DataVortex = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="w-40 h-40 relative flex items-center justify-center" style={{ contain: 'layout style paint' }}>
      {/* Spinning Outer Ring */}
      <motion.div
        className="absolute w-full h-full border border-white/10 rounded-full border-dashed"
        style={{ willChange: 'transform' }}
        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Vortex Streams */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full border-t border-accent-violet/40 rounded-full"
          style={{ rotate: i * 60, willChange: 'transform, opacity' }}
          animate={isInView ? { rotate: [i * 60, i * 60 + 360], scale: [1, 0.5], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      {/* Core Particle */}
      <motion.div
        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        style={{ willChange: 'transform, opacity' }}
        animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

const NeuralSphere = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="w-40 h-40 relative flex items-center justify-center perspective-[500px]">
      {/* Main Sphere Glow */}
      <div className="absolute inset-0 bg-accent-cyan/20 blur-[50px] rounded-full" />

      {/* Rotating Orbital Rings */}
      <motion.div
        className="absolute w-32 h-32 border border-accent-cyan/30 rounded-full"
        style={{ rotateX: 60, willChange: 'transform' }}
        animate={isInView ? { rotateZ: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-32 h-32 border border-accent-cyan/30 rounded-full"
        style={{ rotateX: -60, willChange: 'transform' }}
        animate={isInView ? { rotateZ: -360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-40 h-40 border border-white/10 rounded-full"
        style={{ willChange: 'transform' }}
        animate={isInView ? { rotateY: 360 } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Nodes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(0,255,255,1)]"
          style={{ willChange: 'transform' }}
          animate={isInView ? {
            x: Math.cos(i * (Math.PI / 2)) * 40,
            y: Math.sin(i * (Math.PI / 2)) * 40,
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Central Core */}
      <motion.div
        className="w-8 h-8 bg-gradient-to-br from-white to-accent-cyan rounded-full shadow-[0_0_30px_rgba(0,255,255,0.6)] z-10"
        style={{ willChange: 'transform' }}
        animate={isInView ? { scale: [0.9, 1.1, 0.9] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const HelixLoop = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="w-40 h-40 relative flex items-center justify-center" style={{ contain: 'layout style paint' }}>
      {/* Recursive Infinity Path */}
      <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible opacity-80">
        <defs>
          <linearGradient id="helixGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M10,30 Q35,5 60,30 T110,30"
          fill="none"
          stroke="url(#helixGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ willChange: 'stroke-dashoffset, opacity' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M10,30 Q35,55 60,30 T110,30"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />

        {/* Traveling Pulse */}
        <motion.circle r="3" fill="#fff" filter="url(#glow)">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M10,30 Q35,5 60,30 T110,30"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
        </motion.circle>
      </svg>
    </div>
  );
};

// --- Main Component ---

export const Architecture: React.FC = () => {
  return (
    <section className="py-32 px-[clamp(2rem,5vw,5rem)] relative z-10 w-full overflow-visible">

      {/* Deep Space Background for Section */}
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[800px] bg-accent-violet/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Editorial Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32 items-end">
          <div className="md:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-xs font-mono uppercase tracking-widest text-accent-violet mb-8"
            >
              02 — The Methodology
            </motion.span>
            <SkewedText>
              <h2 className="text-6xl md:text-8xl leading-[0.9] text-white font-semibold tracking-tighter">
                The <span className="font-serif italic font-light text-accent-violet">Agentic</span>
                <br />
                Highway.
              </h2>
            </SkewedText>
          </div>
          <div className="md:col-span-5 pb-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-light text-white/70 leading-relaxed"
            >
              A true 3D architecture where data is ingested, reasoned upon, and recursively optimized. No flat logic. <span className="text-white font-normal">Pure depth.</span>
            </motion.p>
          </div>
        </div>

        {/* 3D Visual Pipeline */}
        <div className="relative w-full">

          {/* Volumetric Beam Connector */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-white/5 z-0">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent blur-sm"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 perspective-[2000px]">

            {/* Phase I */}
            <Card3D delay={0.1} className="h-[450px]">
              <div className="flex-grow flex items-center justify-center mb-8">
                <DataVortex />
              </div>
              <div className="text-center mt-auto" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-serif italic text-white mb-2 group-hover:text-accent-violet transition-colors">Ingestion</h3>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Phase I</p>
                <p className="text-sm text-white/60 leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  High-throughput event streams are normalized into vector embeddings.
                </p>
              </div>
            </Card3D>

            {/* Phase II */}
            <Card3D delay={0.2} className="h-[450px]">
              <div className="flex-grow flex items-center justify-center mb-8">
                <NeuralSphere />
              </div>
              <div className="text-center mt-auto" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-serif italic text-white mb-2 group-hover:text-accent-cyan transition-colors">Reasoning</h3>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Phase II</p>
                <p className="text-sm text-white/60 leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Chain-of-thought execution in a persistent, stateful memory context.
                </p>
              </div>
            </Card3D>

            {/* Phase III */}
            <Card3D delay={0.3} className="h-[450px]">
              <div className="flex-grow flex items-center justify-center mb-8">
                <HelixLoop />
              </div>
              <div className="text-center mt-auto" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-serif italic text-white mb-2 group-hover:text-accent-violet transition-colors">Optimization</h3>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Phase III</p>
                <p className="text-sm text-white/60 leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Recursive self-correction loops to minimize error rates and token cost.
                </p>
              </div>
            </Card3D>

          </div>
        </div>

      </div>
    </section>
  );
};