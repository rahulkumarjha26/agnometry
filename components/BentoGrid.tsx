import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const CardWrapper: React.FC<{ children: React.ReactNode; delay: number; className?: string }> = ({ children, delay, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 80, damping: 20, delay }}
    className={`
      bg-ceramic/50 backdrop-blur-xl border border-white/10 
      p-8 md:p-12 rounded-3xl flex flex-col justify-between 
      shadow-2xl hover:shadow-accent-cyan/20 transition-all duration-700
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const CountUp: React.FC<{ value: number; suffix?: string; decimals?: number }> = ({ value, suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2500, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  const display = useTransform(spring, (current) => current.toFixed(decimals) + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const TrendGraph: React.FC = () => (
  <div className="w-full h-full relative flex flex-col">
    {/* Chart Area */}
    <div className="flex-1 relative">
      <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient for Agentic line - cyan glow */}
          <linearGradient id="cyanglow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="1" />
          </linearGradient>

          {/* Gradient for Manual line - red warning */}
          <linearGradient id="redwarn" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filter for cyan line */}
          <filter id="cyanGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines - subtle */}
        <line x1="0" y1="100" x2="200" y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        <line x1="0" y1="20" x2="0" y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

        {/* Manual Cost - Exponential rise (bad) */}
        <motion.path
          d="M 10,90 Q 60,80 100,50 T 190,10"
          fill="none"
          stroke="url(#redwarn)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {/* Agentic Cost - Flat/optimal (good) */}
        <motion.path
          d="M 10,90 Q 30,88 60,87 Q 100,86 140,86 T 190,86"
          fill="none"
          stroke="url(#cyanglow)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#cyanGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />

        {/* End point indicator for Agentic */}
        <motion.circle
          cx="190"
          cy="86"
          r="3"
          fill="#00ffff"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.1, duration: 0.4 }}
        >
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
        </motion.circle>

        {/* Axis labels */}
        <text x="5" y="15" fontSize="9" fill="white" fillOpacity="0.3" fontFamily="monospace">COST</text>
        <text x="170" y="112" fontSize="9" fill="white" fillOpacity="0.3" fontFamily="monospace">SCALE</text>
      </svg>
    </div>

    {/* Legend - bottom */}
    <div className="flex items-center justify-center gap-6 pt-2 pb-1">
      <div className="flex items-center gap-2">
        <div className="w-3 h-[2px] bg-[#ff4d4d] opacity-60" style={{ background: 'linear-gradient(90deg, rgba(255,77,77,0.4), rgba(255,77,77,0.9))' }} />
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Manual</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-[2px] bg-accent-cyan shadow-[0_0_8px_rgba(0,255,255,0.4)]" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-white/80">Agentic</span>
      </div>
    </div>
  </div>
);

export const BentoGrid: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-[clamp(2rem,5vw,5rem)] py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">

        {/* Card 1: Metric */}
        <CardWrapper delay={0.2}>
          <div className="flex flex-col h-full justify-between">
            <span className="font-serif italic text-2xl text-white/60">Average ROI</span>
            <div>
              <h3 className="font-serif italic text-7xl md:text-8xl text-white tracking-tighter tabular-nums">
                <CountUp value={171} suffix="%" decimals={0} />
              </h3>
              <p className="mt-4 text-sm font-sans tracking-tight uppercase text-accent-cyan">Proven Efficiency</p>
            </div>
          </div>
        </CardWrapper>

        {/* Card 2: Visual */}
        <CardWrapper delay={0.4}>
          <div className="flex flex-col h-full">
            <div className="flex-1 w-full flex items-center justify-center">
              <TrendGraph />
            </div>
            <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-end">
              <span className="text-sm font-sans tracking-tight uppercase text-white/50">Cost vs Scale</span>
              <span className="font-serif italic text-lg tabular-nums text-white">
                -70% CapEx
              </span>
            </div>
          </div>
        </CardWrapper>

        {/* Card 3: Philosophy */}
        <CardWrapper delay={0.6} className="bg-obsidian/[0.02]">
          <div className="flex flex-col h-full justify-center">
            <p className="font-sans text-2xl md:text-3xl font-light leading-[1.1] tracking-tight text-white">
              "In 2025, the competitive advantage is no longer about headcount. It's about <span className="font-serif italic text-accent-cyan">compute density</span> per employee."
            </p>
          </div>
        </CardWrapper>

      </div>
    </div>
  );
};