"use client";

import Hero from "@/components/Hero";
import ScrollVisual from "@/components/ScrollVisual";
import StatCards from "@/components/StatCards";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";

/**
 * Main page composition:
 * 1. ParticleBackground — ambient animated star field (fixed behind content)
 * 2. Hero — full-viewport headline with staggered GSAP intro animation
 * 3. ScrollVisual — central visual element driven by GSAP ScrollTrigger scrub
 * 4. StatCards — glassmorphism stat cards that appear sequentially on scroll
 * 5. Footer — closing section with gradient divider
 */
export default function Home() {
    return (
        <main className="relative z-10">
            {/* Fixed ambient particle background */}
            <ParticleBackground />

            {/* Hero: full viewport with headline animation */}
            <Hero />

            {/* Central visual element with scroll-driven motion */}
            <ScrollVisual />

            {/* Animated stat cards that appear on scroll */}
            <StatCards />

            {/* Footer / spacer */}
            <Footer />
        </main>
    );
}
