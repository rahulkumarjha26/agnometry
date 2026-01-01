import React from 'react';

export const VoidGate: React.FC = () => {
    return (
        <div className="relative w-full h-96 bg-obsidian flex flex-col items-center justify-center overflow-hidden">
            {/* The Thread */}
            <div className="relative w-[1px] h-full bg-white/5 overflow-hidden">
                {/* The Pulse */}
                <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-accent-cyan to-transparent animate-drop" />
            </div>

            {/* Optional: Subtle Vignette to focus the eye */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian pointer-events-none" />

            <style>{`
            @keyframes drop {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(400%); }
            }
            .animate-drop {
                animation: drop 3s cubic-bezier(0.45, 0, 0.55, 1) infinite;
            }
        `}</style>
        </div>
    );
};
