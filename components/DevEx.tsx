import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkewedText } from './SkewedText';
import { Card3D } from './Card3D';

const codeSnippet = `const Agent = new Agnometry.Entity({
  role: 'System_Architect',
  capabilities: [
    'write_code', 
    'deploy_infrastructure',
    'self_optimize'
  ],
  constraints: [
    'zero_hallucination', 
    'security_level_max'
  ]
});

// Execute business logic with natural intent
await Agent.solve(complexity);`;

const terminalLogs = [
  { text: "Compiling natural intent...", color: "text-accent-emerald" },
  { text: "Optimizing execution graph...", color: "text-white/60" },
  { text: "Deploying sovereign worker...", color: "text-white/60" },
  { text: "Verifying constraints...", color: "text-accent-emerald" },
  { text: "Done in 12ms.", color: "text-accent-emerald font-bold" },
];

const TypewriterCode: React.FC<{ code: string }> = ({ code }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && code) {
      let i = 0;
      setDisplayedCode(''); // Reset on start
      const interval = setInterval(() => {
        setDisplayedCode(code.substring(0, i));
        i++;
        if (i > code.length) clearInterval(interval);
      }, 50); // Slowed down to 50ms for better performance
      return () => clearInterval(interval);
    }
  }, [isInView, code]);

  return (
    <pre ref={ref} className="font-mono text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
      <code>
        {displayedCode}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2.5 h-4 bg-accent-emerald ml-1 align-middle"
        />
      </code>
    </pre>
  );
};

const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<typeof terminalLogs>([]);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      setLogs([]); // Clear logs on start
      const interval = setInterval(() => {
        if (i < terminalLogs.length) {
          const nextLog = terminalLogs[i];
          if (nextLog) {
            setLogs(prev => [...prev, nextLog]);
          }
          i++;
        } else {
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="font-mono text-xs space-y-2 h-[120px] overflow-hidden">
      <div className="text-white/40 border-b border-white/10 pb-2 mb-2 font-semibold tracking-wider">TERMINAL OUTPUT</div>
      {logs.map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={log?.color || "text-white"}
        >
          <span className="opacity-50 mr-2">{`>`}</span>
          {log?.text || ""}
        </motion.div>
      ))}
    </div>
  );
}

export const DevEx: React.FC = () => {
  return (
    <section className="py-32 px-[clamp(2rem,5vw,5rem)] relative z-10 w-full overflow-visible">
      {/* Ambient Emerald Glow */}
      <div className="absolute top-1/2 left-0 w-full h-[600px] bg-accent-emerald/5 blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">

        {/* Text Side */}
        <div className="order-2 md:order-1 relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-xs font-mono uppercase tracking-widest text-accent-emerald mb-8"
          >
            03 — The Code
          </motion.span>

          <SkewedText>
            <h2 className="text-6xl md:text-8xl leading-[0.9] text-white font-semibold tracking-tighter mb-8">
              Sovereign <br />
              <span className="font-serif italic font-light text-accent-emerald">Logic.</span>
            </h2>
          </SkewedText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl font-light text-white/70 leading-relaxed max-w-lg"
          >
            Natural language intent compiled into deterministic execution. We define <span className="text-white border-b border-accent-emerald/30">constraints</span>, <span className="text-white border-b border-accent-emerald/30">roles</span>, and <span className="text-white border-b border-accent-emerald/30">capabilities</span>, then let the system handle the implementation details.
          </motion.p>
        </div>

        {/* 3D Code Editor Side */}
        <div className="order-1 md:order-2 perspective-[2000px]">
          <Card3D className="w-full">
            <div className="w-full bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">

              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-auto text-xs font-mono text-white/30 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
                  sovereign_agent.ts
                </div>
              </div>

              {/* Code Area */}
              <div className="p-6 min-h-[300px] bg-gradient-to-b from-transparent to-white/[0.02]">
                <TypewriterCode code={codeSnippet} />
              </div>

              {/* Terminal Area */}
              <div className="border-t border-white/10 bg-black/50 p-4 backdrop-blur-sm">
                <Terminal />
              </div>
            </div>

            {/* Holographic Projection Effect */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-accent-emerald/20 blur-xl rounded-[100%]" />
          </Card3D>
        </div>

      </div>
    </section>
  );
};