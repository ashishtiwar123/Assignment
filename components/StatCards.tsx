"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stat card data — each card displays a metric with glassmorphism styling.
 */
const stats = [
    {
        value: "500+",
        label: "Projects Delivered",
        icon: "🚀",
        accentColor: "from-neon-cyan/20 to-neon-cyan/5",
        borderColor: "hover:border-neon-cyan/30",
        glowColor: "rgba(0,240,255,0.08)",
    },
    {
        value: "99.9%",
        label: "Uptime Guaranteed",
        icon: "⚡",
        accentColor: "from-neon-purple/20 to-neon-purple/5",
        borderColor: "hover:border-neon-purple/30",
        glowColor: "rgba(168,85,247,0.08)",
    },
    {
        value: "10K+",
        label: "Active Users",
        icon: "👥",
        accentColor: "from-neon-pink/20 to-neon-pink/5",
        borderColor: "hover:border-neon-pink/30",
        glowColor: "rgba(236,72,153,0.08)",
    },
    {
        value: "24/7",
        label: "Expert Support",
        icon: "🛡️",
        accentColor: "from-neon-cyan/20 to-neon-purple/5",
        borderColor: "hover:border-neon-cyan/30",
        glowColor: "rgba(0,240,255,0.06)",
    },
];

/**
 * StatCards
 * ─────────
 * 4 glassmorphism stat cards that appear sequentially on scroll.
 *
 * Animation logic:
 * - Each card starts hidden (opacity 0, translated 60px down, slight scale).
 * - GSAP ScrollTrigger with `scrub: 1` and `stagger: 0.15` reveals them
 *   sequentially as the user scrolls this section into view.
 * - Cards use a combination of backdrop-blur, semi-transparent bg,
 *   and neon border glow for the glassmorphism effect.
 */
export default function StatCards() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current?.querySelectorAll(".stat-card");
            if (!cards) return;

            // Section title animation
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1,
                    },
                }
            );

            // Sequential card reveal with stagger
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.92,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24"
        >
            {/* Section title */}
            <div ref={titleRef} className="text-center mb-16">
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/30 mb-4">
                    — By the Numbers —
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white/90">
                    What We <span className="gradient-text">Deliver</span>
                </h2>
            </div>

            {/* Cards grid */}
            <div
                ref={cardsRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
            >
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`stat-card group relative rounded-2xl p-6 md:p-8 border border-white/[0.06] transition-all duration-500 cursor-default ${stat.borderColor}`}
                        style={{
                            background: "rgba(17, 17, 24, 0.5)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                        }}
                    >
                        {/* Top accent gradient bar */}
                        <div
                            className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${stat.accentColor} rounded-t-2xl`}
                        />

                        {/* Hover glow effect */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                boxShadow: `0 0 40px ${stat.glowColor}, inset 0 0 40px ${stat.glowColor}`,
                            }}
                        />

                        {/* Icon */}
                        <div className="text-3xl md:text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            {stat.icon}
                        </div>

                        {/* Value */}
                        <div className="text-3xl md:text-4xl font-extrabold text-white/95 mb-2 tracking-tight">
                            {stat.value}
                        </div>

                        {/* Label */}
                        <div className="text-sm text-white/40 tracking-wide font-light">
                            {stat.label}
                        </div>

                        {/* Bottom corner accent dot */}
                        <div
                            className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                            style={{
                                background: `linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
