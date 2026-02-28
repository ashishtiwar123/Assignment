"use client";

/**
 * Footer
 * ──────
 * Minimal closing section with gradient divider and branding.
 * Provides scroll room for the stat card animations to complete.
 */
export default function Footer() {
    return (
        <footer className="relative py-24 px-4">
            {/* Gradient divider */}
            <div className="w-full max-w-4xl mx-auto mb-16">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-bold mb-4">
                    <span className="gradient-text">ITZ FIZZ</span>
                </h3>
                <p className="text-white/30 text-sm tracking-widest max-w-md mx-auto mb-8">
                    Premium digital experiences, crafted with precision and passion.
                </p>

                {/* Decorative accent */}
                <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-[1px] bg-neon-cyan/30" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-50" />
                    <div className="w-8 h-[1px] bg-neon-purple/30" />
                </div>

                <p className="mt-8 text-xs text-white/15 tracking-wider">
                    © 2026 ITZ FIZZ — All rights reserved
                </p>
            </div>
        </footer>
    );
}
