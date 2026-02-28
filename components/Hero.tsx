"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero Section
 * ─────────────
 * Full-viewport section with the "WELCOME ITZ FIZZ" headline.
 *
 * Animation logic:
 * - On mount, a GSAP timeline runs a staggered fade-up on each word.
 * - Each word starts invisible (opacity 0) and 60px below its final position.
 * - Words animate in sequentially with 0.15s stagger and elastic easing.
 * - The tagline and scroll indicator fade in after the headline completes.
 */
export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Grab all animated word spans
            const words = headlineRef.current?.querySelectorAll(".hero-word");
            if (!words) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Staggered fade-up for each word in the headline
            tl.fromTo(
                words,
                { opacity: 0, y: 60, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.15,
                }
            );

            // Tagline fades in after headline
            tl.fromTo(
                taglineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.3" // overlap slightly with the last word
            );

            // Scroll indicator fades in last
            tl.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.2"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split the headline into individually animatable word spans
    const headlineWords = ["WELCOME", "ITZ", "FIZZ"];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
            {/* Radial gradient glow behind headline */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-3xl" />
            </div>

            {/* Headline */}
            <h1
                ref={headlineRef}
                className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8"
            >
                {headlineWords.map((word, i) => (
                    <span
                        key={i}
                        className="hero-word inline-block text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-ultra-wide uppercase text-white/95"
                        style={{ perspective: "800px" }}
                    >
                        {word === "FIZZ" ? (
                            <span className="gradient-text">{word}</span>
                        ) : (
                            word
                        )}
                    </span>
                ))}
            </h1>

            {/* Tagline */}
            <p
                ref={taglineRef}
                className="relative z-10 mt-6 md:mt-8 text-base md:text-xl text-white/40 tracking-widest font-light max-w-xl text-center leading-relaxed"
            >
                Crafting digital experiences with precision, motion, and soul.
            </p>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-white/30 tracking-[0.3em] uppercase">
                    Scroll
                </span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan/60 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-neon-cyan/80 animate-pulse" />
                </div>
            </div>
        </section>
    );
}
