import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import { LivingOrb } from './components/LivingOrb';
import { BentoGrid } from './components/BentoGrid';
import { SmartDock } from './components/SmartDock';
import { Architecture } from './components/Architecture';
import { DevEx } from './components/DevEx';
import { UseCases } from './components/UseCases';
import { Pricing } from './components/Pricing';
import { Team } from './components/Team';

import { SkewedText } from './components/SkewedText';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full px-[clamp(2rem,5vw,5rem)] z-50 flex justify-between items-center transition-all duration-700 ${isScrolled
        ? "py-6 bg-obsidian/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        : "py-[clamp(2rem,5vw,5rem)] bg-transparent"
        }`}
    >
      <div className="pointer-events-auto relative group cursor-pointer">
        <h1 className={`font-serif italic text-2xl text-white font-medium tracking-tight transition-all duration-500 ${!isScrolled && "mix-blend-difference"}`}>
          Agnometry
        </h1>
        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-500 group-hover:w-full" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="hidden md:flex items-center gap-12"
      >
        <nav className="flex items-center gap-8">
          {[
            { label: 'Vision', href: '#manifesto' },
            { label: 'Engine', href: '#platform' },
            { label: 'Blueprint', href: '#architecture' },
            { label: 'Protocol', href: '#docs' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Scale', href: '#pricing' },
            { label: 'Access', href: '#team' },
          ].map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group py-2"
            >
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${isScrolled ? 'text-white/60 group-hover:text-white' : 'text-white/80 group-hover:text-white'}`}>
                {link.label}
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-cyan transition-all duration-300 group-hover:w-full" />
              <span className="absolute -inset-4 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
};

const TrustStrip = () => (
  <div className="w-full border-y border-glass-border bg-glass-bg backdrop-blur-md py-10 px-[clamp(2rem,5vw,5rem)] relative z-20">
    <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
      {/* Logo Placeholders - Glowing geometric shapes */}
      <div className="h-8 w-32 bg-white/10 rounded-sm animate-pulse flex items-center justify-center"><div className="w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div></div>
      <div className="h-8 w-32 bg-white/10 rounded-sm animate-pulse delay-75 flex items-center justify-center"><div className="w-2 h-2 bg-accent-violet rounded-full shadow-[0_0_10px_rgba(138,43,226,0.5)]"></div></div>
      <div className="h-8 w-32 bg-white/10 rounded-sm animate-pulse delay-150 flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div></div>
      <div className="h-8 w-32 bg-white/10 rounded-sm animate-pulse delay-200 flex items-center justify-center"><div className="w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div></div>
    </div>
  </div>
);

const ManifestoSection = () => {
  return (
    <section id="manifesto" className="py-32 px-[clamp(2rem,5vw,5rem)] relative z-10 w-full overflow-hidden scroll-mt-32">
      {/* Subtle Ambient Background for this section */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent-cyan/5 blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">
        {/* Left Column: Headline */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-xs font-mono uppercase tracking-widest text-accent-cyan mb-8"
          >
            01 — The Business Case
          </motion.span>
          <SkewedText>
            <h2 className="text-6xl md:text-8xl leading-[0.9] text-white font-semibold tracking-tighter">
              The <span className="font-serif italic font-light text-accent-cyan">Agentic</span>
              <br />
              ROI Equation.
            </h2>
          </SkewedText>
        </div>

        {/* Right Column: Content & Metrics */}
        <div className="md:col-span-7 flex flex-col justify-center gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-light leading-snug text-white/80"
          >
            Traditional automation is rigid. Human labor is unscalable. Agnometry bridges the gap with <span className="text-white font-normal border-b border-accent-cyan/30 hover:border-accent-cyan transition-colors cursor-crosshair">sovereign agents</span> that deliver <span className="font-serif italic text-accent-cyan">171% average ROI</span> by autonomously executing complex workflows 24/7.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2 group-hover:text-accent-cyan transition-colors">Operational Velocity</h4>
              <p className="text-lg text-white/80 leading-relaxed">
                Slash CapEx by <span className="text-accent-cyan">70%</span>. We encode your business logic into persistent neural workers that operate at machine speed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2 group-hover:text-accent-cyan transition-colors">Sovereign Intelligence</h4>
              <p className="text-lg text-white/80 leading-relaxed">
                Your data stays within your perimeter. We deploy proprietary models trained on your institutional memory, not generic open weights.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian text-white pt-32 pb-12 px-[clamp(2rem,5vw,5rem)] overflow-hidden border-t border-white/5 mt-auto">

      {/* Massive Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] pointer-events-none select-none">
        <h1 className="text-[15vw] md:text-[20vw] font-serif italic text-white/[0.02] leading-none whitespace-nowrap">
          Agnometry
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-24 md:mb-32">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
            </div>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest max-w-[200px] leading-relaxed">
              Engineering the autonomous enterprise future.
            </p>
          </div>

          {/* Col 2: Platform */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-white tracking-tight">Platform</h4>
            <div className="flex flex-col gap-3">
              {['Architecture', 'Capabilities', 'Pricing', 'Documentation'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/50 hover:text-accent-cyan transition-colors text-sm font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-white tracking-tight">Company</h4>
            <div className="flex flex-col gap-3">
              {['Manifesto', 'Studio', 'Carrers'].map((item) => (
                <a key={item} href="#" className="text-white/50 hover:text-accent-cyan transition-colors text-sm font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Connect */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-white tracking-tight">Connect</h4>
            <div className="flex flex-col gap-3">
              {['Twitter', 'LinkedIn', 'Email'].map((item) => (
                <a key={item} href="#" className="text-white/50 hover:text-accent-cyan transition-colors text-sm font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            © 2025 Agnometry Inc.
          </p>

          <div className="flex items-center gap-8">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Privacy</p>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Terms</p>
            <button onClick={scrollToTop} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-obsidian transition-all duration-300 group bg-white/5 backdrop-blur-sm">
              <span className="text-lg group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { CustomCursor } from './components/CustomCursor';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="relative w-full min-h-screen font-sans selection:bg-accent-cyan/30 selection:text-white flex flex-col bg-obsidian text-white">
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <CustomCursor />

      {/* Chat Interface Overlay */}
      <AnimatePresence>
        {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>

      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <LivingOrb />
      </div>

      <Header />

      <main className="relative z-10 w-full flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen w-full flex flex-col items-center px-[clamp(2rem,5vw,5rem)] relative overflow-hidden pt-[20vh]">
          <div className="max-w-[1400px] text-center mix-blend-normal relative z-10">
            <SkewedText className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-semibold tracking-tighter leading-[0.9] text-white mix-blend-difference pb-4"
                style={{ perspective: "1000px" }}
              >
                Sovereign Enterprise
                <br />
                <span className="font-serif italic font-normal ml-8 md:ml-16 block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent-cyan leading-[1.1] py-2">Intelligence.</span>
              </motion.h1>
            </SkewedText>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 text-lg md:text-xl font-light tracking-tight text-white/70 max-w-lg mx-auto leading-relaxed"
            >
              We do not sell software. We engineer autonomous digital labor.
              <br className="hidden md:block" />
              Scale your workforce infinitely with bespoke agents that perceive, reason, and execute.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mt-auto mb-12 text-xs font-mono text-white/40 flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-white/20 mb-2" />
            SCROLL TO OBSERVE
          </motion.div>
        </section>

        {/* Features / Bento Grid Section */}
        <section id="platform" className="relative w-full pb-20 scroll-mt-32">
          <BentoGrid />
        </section>

        <TrustStrip />

        {/* Manifesto Section */}
        <ManifestoSection />

        {/* Methodology / Architecture */}
        <div id="architecture" className="scroll-mt-32">
          <Architecture />
        </div>

        {/* Developer Experience */}
        <div id="docs" className="scroll-mt-32">
          <DevEx />
        </div>

        {/* Use Cases */}
        <div id="capabilities" className="scroll-mt-32">
          <UseCases />
        </div>

        {/* Pricing */}
        <div id="pricing" className="scroll-mt-32">
          <Pricing />
        </div>

        {/* Team */}
        <div id="team" className="scroll-mt-32">
          <Team />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      <SmartDock />
    </div>

  );
};

export default App;