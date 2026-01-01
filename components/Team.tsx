import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { SkewedText } from './SkewedText';

// --- Cinematic Immersive Layout ---
// Validates "World Class Representation": Full-bleed 3D backdrop with floating glass HUD.
// URL: https://prod.spline.design/OknTiFmph8cwMIK5/scene.splinecode

export const Team: React.FC = () => {
   const [loading, setLoading] = useState(true);

   return (
      <section className="relative w-full min-h-screen flex items-center bg-obsidian overflow-hidden py-20 md:py-0">

         {/* --- 1. The Immersive Backdrop (Spline) --- */}
         <div className="absolute inset-0 z-0">
            {loading && (
               <div className="absolute inset-0 flex items-center justify-center bg-obsidian z-20">
                  <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin"></div>
               </div>
            )}

            {/* 
                Correction: Translate RIGHT (positive) to move the centered subject to the open space on the right.
                Mobile: Scale down and center. Desktop: Shift right.
            */}
            <div className="w-full h-full transform scale-100 md:scale-110 md:translate-x-[25%] transition-all duration-1000" style={{ opacity: loading ? 0 : 1 }}>
               <Spline
                  scene="https://prod.spline.design/OknTiFmph8cwMIK5/scene.splinecode"
                  onLoad={() => setLoading(false)}
               />
            </div>

            {/* Cinematic Vignette & Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
         </div>

         {/* --- 2. The Floating HUD (Content) --- */}
         <div className="relative z-10 w-full px-[clamp(2rem,5vw,5rem)] pointer-events-none">
            <div className="max-w-[1400px] mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                  {/* Left Column: Glass HUD Panel */}
                  <motion.div
                     className="md:col-span-5 pointer-events-auto"
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                     {/* Glass Card Container */}
                     <div className="backdrop-blur-2xl bg-obsidian/60 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden relative group">

                        {/* Noise Texture for Realism */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        {/* Decorative Top Line with Shine */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <div className="absolute -top-[1px] left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent blur-sm group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                        <div className="h-8" /> {/* Spacer for removed 'Live Status' */}

                        <SkewedText>
                           <h2 className="text-5xl md:text-7xl leading-[0.9] text-white font-semibold tracking-tighter mb-8">
                              Direct <br />
                              <span className="font-serif italic font-light text-accent-cyan">Access.</span>
                           </h2>
                        </SkewedText>

                        <p className="text-lg text-white/80 font-light leading-relaxed mb-10 border-l-2 border-accent-cyan/50 pl-6">
                           No layers. No noise. You work directly with the lead architect to build ready-to-deploy agentic systems. <br /><br />
                           <span className="text-sm font-mono text-white/50 tracking-wide">LIMITED ROSTER &bull; SENIOR TALENT ONLY</span>
                        </p>

                        {/* Status Metric */}
                        <div className="mb-10 flex items-center justify-between border-t border-white/10 pt-6">
                           <div>
                              <p className="text-xs font-mono uppercase text-white/40 mb-1">Timeline</p>
                              <p className="text-white text-sm tracking-wide">Booking for <span className="text-accent-cyan font-bold">Q1 2026</span></p>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-mono uppercase text-white/40 mb-1">Capacity</p>
                              <p className="text-white text-sm tracking-wide">2 Slots Remaining</p>
                           </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-4">
                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-white text-black py-4 px-6 flex items-center justify-center gap-4 hover:bg-accent-cyan transition-colors duration-300 font-mono text-xs uppercase tracking-widest font-bold relative overflow-hidden group/btn"
                           >
                              <span className="relative z-10">Request Availability</span>
                              <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>

                              {/* Sheen Effect */}
                              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-0" />
                           </motion.button>
                        </div>
                     </div>
                  </motion.div>

               </div>
            </div>
         </div>

         {/* --- 3. Floating Identity Label (Bottom Right) --- */}
         <motion.div
            className="absolute bottom-12 right-[clamp(2rem,5vw,5rem)] z-10 text-right pointer-events-none hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
         >
            <h3 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter mb-2">Rahul Jha</h3>
            <div className="flex items-center justify-end gap-4">
               <span className="font-serif italic text-2xl text-accent-cyan">The Architect</span>
               <div className="h-[1px] w-12 bg-white/30" />
            </div>
         </motion.div>

      </section>
   );
};