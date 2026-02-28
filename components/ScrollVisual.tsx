"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollVisual
 * ─────────────
 * A central abstract geometric car silhouette that responds to scroll.
 *
 * Animation logic (GSAP ScrollTrigger with scrub):
 * - The visual starts centered and slightly small (scale 0.8).
 * - As the user scrolls through this section, it:
 *   1. Translates horizontally (left → right) via translateX
 *   2. Scales up smoothly from 0.8 → 1.15
 *   3. Rotates subtly from -5° → 5°
 * - `scrub: 1` ties animation progress directly to scroll position
 *   with 1 second of smoothing for fluid feel.
 * - Only transform properties are animated for GPU-accelerated rendering.
 */
export default function ScrollVisual() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Car movement: tied to scroll via scrub ──
            gsap.fromTo(
                carRef.current,
                {
                    x: -120,
                    scale: 0.8,
                    rotation: -5,
                    opacity: 0.3,
                },
                {
                    x: 120,
                    scale: 1.15,
                    rotation: 5,
                    opacity: 1,
                    ease: "none", // linear mapping to scroll
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",   // begin when section top hits 80% of viewport
                        end: "bottom 20%",  // end when section bottom hits 20% of viewport
                        scrub: 1,           // 1s smooth catch-up to scroll position
                    },
                }
            );

            // ── Glow pulse follows the car ──
            gsap.fromTo(
                glowRef.current,
                { scale: 0.6, opacity: 0 },
                {
                    scale: 1.4,
                    opacity: 0.6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1.5,
                    },
                }
            );

            // ── Section title fade in ──
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 50%",
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
            className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
        >
            {/* Section title */}
            <h2
                ref={titleRef}
                className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/30 mb-16 text-center"
            >
                — Driven by Motion —
            </h2>

            {/* Glow backdrop */}
            <div
                ref={glowRef}
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)",
                    willChange: "transform, opacity",
                }}
            />

            {/* Car / Abstract Visual Element */}
            <div
                ref={carRef}
                className="relative z-10"
                style={{ willChange: "transform, opacity" }}
            >
                {/* Stylized car SVG */}
                <svg
                    viewBox="0 0 400 180"
                    className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] h-auto"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Car body — sleek silhouette */}
                    <path
                        d="M50 120 L80 70 Q100 40 140 35 L260 35 Q300 40 320 70 L350 120 Z"
                        fill="url(#carBodyGradient)"
                        stroke="url(#carStrokeGradient)"
                        strokeWidth="1.5"
                    />
                    {/* Windshield */}
                    <path
                        d="M105 68 L130 42 L250 42 L280 68 Z"
                        fill="rgba(0,240,255,0.08)"
                        stroke="rgba(0,240,255,0.3)"
                        strokeWidth="0.8"
                    />
                    {/* Hood line */}
                    <line
                        x1="50"
                        y1="120"
                        x2="350"
                        y2="120"
                        stroke="rgba(0,240,255,0.4)"
                        strokeWidth="1"
                    />
                    {/* Bottom panel */}
                    <rect
                        x="40"
                        y="120"
                        width="320"
                        height="18"
                        rx="4"
                        fill="url(#panelGradient)"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="0.5"
                    />
                    {/* Front wheel */}
                    <circle cx="110" cy="140" r="22" fill="#0a0a0f" stroke="rgba(0,240,255,0.5)" strokeWidth="1.5" />
                    <circle cx="110" cy="140" r="14" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="0.8" />
                    <circle cx="110" cy="140" r="5" fill="rgba(0,240,255,0.6)" />
                    {/* Rear wheel */}
                    <circle cx="290" cy="140" r="22" fill="#0a0a0f" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" />
                    <circle cx="290" cy="140" r="14" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="0.8" />
                    <circle cx="290" cy="140" r="5" fill="rgba(168,85,247,0.6)" />
                    {/* Headlight glow */}
                    <ellipse
                        cx="52"
                        cy="110"
                        rx="8"
                        ry="5"
                        fill="rgba(0,240,255,0.8)"
                    />
                    <ellipse
                        cx="52"
                        cy="110"
                        rx="16"
                        ry="10"
                        fill="rgba(0,240,255,0.15)"
                    />
                    {/* Tail light */}
                    <ellipse
                        cx="348"
                        cy="110"
                        rx="6"
                        ry="4"
                        fill="rgba(236,72,153,0.8)"
                    />
                    <ellipse
                        cx="348"
                        cy="110"
                        rx="14"
                        ry="8"
                        fill="rgba(236,72,153,0.15)"
                    />
                    {/* Accent lines */}
                    <line x1="80" y1="95" x2="160" y2="95" stroke="rgba(0,240,255,0.15)" strokeWidth="0.5" />
                    <line x1="240" y1="95" x2="320" y2="95" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" />

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="carBodyGradient" x1="50" y1="120" x2="350" y2="40">
                            <stop offset="0%" stopColor="rgba(0,240,255,0.08)" />
                            <stop offset="50%" stopColor="rgba(17,17,24,0.9)" />
                            <stop offset="100%" stopColor="rgba(168,85,247,0.08)" />
                        </linearGradient>
                        <linearGradient id="carStrokeGradient" x1="0" y1="0" x2="400" y2="0">
                            <stop offset="0%" stopColor="rgba(0,240,255,0.6)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
                        </linearGradient>
                        <linearGradient id="panelGradient" x1="40" y1="120" x2="360" y2="140">
                            <stop offset="0%" stopColor="rgba(0,240,255,0.04)" />
                            <stop offset="100%" stopColor="rgba(168,85,247,0.04)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Ground reflection */}
                <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
                <div className="mt-1 h-[1px] w-3/4 mx-auto bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent" />
            </div>
        </section>
    );
}
