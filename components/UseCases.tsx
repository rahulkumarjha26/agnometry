import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useTime, useSpring, useInView } from 'framer-motion';
import { SkewedText } from './SkewedText';

// --- COMPLEX 3D VISUALIZATIONS ---

// 1. Neural Hive (Orchestration): Advanced self-organizing system
const NeuralHive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Pre-compute random values to avoid recalculating on every render
  const synapses = useMemo(() =>
    [...Array(8)].map(() => ({
      width: 200 + Math.random() * 100,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px] overflow-visible"
      style={{ contain: 'layout style' }}
    >
      <motion.div
        className="relative w-[400px] h-[400px] preserve-3d"
        style={{ transformStyle: "preserve-3d", willChange: 'transform' }}
        animate={isInView ? { rotateY: 360, rotateX: 10 } : { rotateY: 0 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {/* --- CENTRAL INTELLIGENCE CORE --- */}
        <div className="absolute inset-0 flex items-center justify-center preserve-3d" style={{ transformStyle: "preserve-3d" }}>
          {/* Inner Core - Pulsing Energy */}
          <motion.div
            className="w-20 h-20 bg-white rounded-full shadow-[0_0_80px_rgba(255,255,255,0.9),inset_0_0_30px_rgba(0,255,255,0.5)] blur-[1px]"
            style={{ willChange: 'transform, opacity' }}
            animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Shells - Rotating Gyroscope */}
          {[0, 1].map((i) => (
            <motion.div
              key={`core-shell-${i}`}
              className="absolute w-32 h-32 border border-accent-cyan/40 rounded-full"
              style={{ transformStyle: "preserve-3d", willChange: 'transform' }}
              animate={isInView ? { rotateX: 360, rotateY: i === 0 ? 360 : -360 } : {}}
              transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-t-2 border-accent-cyan/80 blur-[1px]" />
            </motion.div>
          ))}
        </div>

        {/* --- ORBITAL RINGS SYSTEM --- */}
        {[
          { size: 280, rotation: { x: 60, y: 45 }, speed: 25, particles: 3 },
          { size: 380, rotation: { x: -30, y: 20 }, speed: 35, particles: 4 },
          { size: 480, rotation: { x: 80, y: -10 }, speed: 45, particles: 5 },
        ].map((ring, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute inset-0 flex items-center justify-center preserve-3d"
            style={{
              transformStyle: "preserve-3d",
              rotateX: ring.rotation.x,
              rotateY: ring.rotation.y,
            }}
          >
            <motion.div
              className="absolute rounded-full border border-white/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
              style={{
                width: ring.size,
                height: ring.size,
                transformStyle: "preserve-3d",
                willChange: 'transform',
              }}
              animate={isInView ? { rotateZ: 360 } : {}}
              transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
            >
              {/* Ring Structure */}
              <div className="absolute inset-0 rounded-full border border-white/10" />

              {/* Active Nodes on Ring */}
              {[...Array(ring.particles)].map((_, j) => {
                const angle = (360 / ring.particles) * j;
                return (
                  <div
                    key={`node-${i}-${j}`}
                    className="absolute w-3 h-3 bg-accent-cyan rounded-full shadow-[0_0_15px_cyan]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translate(${ring.size / 2}px) rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                  </div>
                );
              })}

              {/* Data Packet - High Speed Traveler */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-1 h-1"
                style={{ willChange: 'transform' }}
                animate={isInView ? { rotate: 360 } : {}}
                transition={{ duration: ring.speed / 3, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-6 h-6 bg-white rounded-full blur-md opacity-60"
                  style={{ transform: `translate(${ring.size / 2}px)` }}
                />
                <div
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ transform: `translate(${ring.size / 2}px)` }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        {/* --- CONNECTING SYNAPSES (Reduced from 12 to 8 for performance) --- */}
        {synapses.map((synapse, i) => (
          <motion.div
            key={`synapse-${i}`}
            className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-accent-cyan via-white to-transparent origin-left"
            style={{
              width: synapse.width,
              transformStyle: "preserve-3d",
              rotateX: synapse.rotateX,
              rotateY: synapse.rotateY,
              rotateZ: synapse.rotateZ,
              willChange: 'transform, opacity',
            }}
            animate={isInView ? {
              opacity: [0, 0.6, 0],
              scaleX: [0.2, 1, 0.2],
              width: [100, 300, 100]
            } : { opacity: 0 }}
            transition={{
              duration: synapse.duration,
              repeat: Infinity,
              delay: synapse.delay,
              ease: "easeInOut"
            }}
          />
        ))}

      </motion.div>

      {/* Volumetric Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent-cyan/10 to-transparent blur-[80px] pointer-events-none"
        style={{ contain: 'strict' }}
      />
    </div>
  )
}

// 2. Fluid Mesh (Interfaces): Morphing organic shapes
const FluidMesh = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center" style={{ contain: 'layout style paint' }}>
      {/* Overlapping morphing circles to simulate liquid */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 border-2 border-accent-violet/40 rounded-[40%] blur-sm"
          style={{ willChange: 'transform, border-radius' }}
          animate={isInView ? {
            rotate: 360,
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
          } : {}}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.div
        className="absolute w-40 h-40 bg-accent-violet/20 blur-[60px]"
        style={{ willChange: 'transform', contain: 'strict' }}
        animate={isInView ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  )
}

// 3. Governance Lens (Governance): Structured, rigid scanning rings
const GovernanceLens = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center perspective-[800px]" style={{ contain: 'layout style paint' }}>
      {/* Concentric Rigidity */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-accent-emerald/40 rounded-full"
          style={{
            width: 100 + i * 60,
            height: 100 + i * 60,
            borderStyle: i % 2 === 0 ? "solid" : "dashed",
            borderWidth: 1,
            willChange: 'transform',
          }}
          animate={isInView ? { rotate: i % 2 === 0 ? 360 : -360, rotateX: 20 } : {}}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Scanning Line */}
      <motion.div
        className="absolute w-[300px] h-[2px] bg-accent-emerald shadow-[0_0_20px_#10b981]"
        style={{ willChange: 'transform, opacity' }}
        animate={isInView ? { rotate: 360, opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute w-4 h-4 bg-accent-emerald rounded-full shadow-[0_0_20px_#10b981]" />
    </div>
  )
}

// --- Content Data ---

const features = [
  {
    id: "01",
    title: "Autonomous Orchestration",
    desc: "Decouple operations from human latency. Agents handle 94% of process logic, creating self-healing workflows that scale indefinitely.",
    visual: <NeuralHive />,
    align: "right"
  },
  {
    id: "02",
    title: "Polymorphic Interfaces",
    desc: "The UI is no longer static. It is a fluid runtime that generates bespoke components in milliseconds to match user intent.",
    visual: <FluidMesh />,
    align: "left"
  },
  {
    id: "03",
    title: "Cognitive Governance",
    desc: "Total semantic oversight. 100% data auditability at the token level, ensuring compliance and pattern recognition beyond human capacity.",
    visual: <GovernanceLens />,
    align: "right"
  }
];

export const UseCases: React.FC = () => {
  return (
    <section className="py-32 px-[clamp(2rem,5vw,5rem)] relative z-10 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Editorial Header */}
        <div className="mb-32 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-8"
          >
            04 — Competence
          </motion.span>
          <SkewedText>
            <h2 className="text-6xl md:text-9xl leading-[0.8] text-white font-semibold tracking-tighter">
              Sovereign <br />
              <span className="font-serif italic font-light text-white/50">Capabilities.</span>
            </h2>
          </SkewedText>
        </div>

        {/* Alternating Layout */}
        <div className="flex flex-col gap-32">
          {features.map((feature, i) => (
            <div key={feature.id} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${feature.align === 'left' ? 'md:flex-row-reverse' : ''}`}>

              {/* Text Side */}
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-6 opacity-50">
                  <div className="h-[1px] w-12 bg-white"></div>
                  <span className="font-mono text-sm">{feature.id}</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">{feature.title}</h3>
                <p className="text-lg text-white/60 font-light leading-relaxed max-w-md">{feature.desc}</p>
                <button className="mt-12 text-xs font-mono uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-white transition-colors">
                  Explore Architecture
                </button>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl opacity-20" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative z-10"
                >
                  {feature.visual}
                </motion.div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};