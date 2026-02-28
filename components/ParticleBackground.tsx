"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * ───────────────────
 * A lightweight animated star/particle field rendered via CSS + canvas.
 * Provides ambient depth to the dark background.
 *
 * Implementation:
 * - Uses a <canvas> element for performant particle rendering.
 * - Particles are small, semi-transparent dots that drift upward slowly.
 * - Fixed position behind all content (z-index: 0).
 * - Automatically resizes with the window.
 */
interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    hue: number; // 180 = cyan, 270 = purple
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        // ── Resize handler ──
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Create particles ──
        const PARTICLE_COUNT = Math.min(80, Math.floor(window.innerWidth / 20));

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedY: -(Math.random() * 0.3 + 0.05),
            speedX: (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() > 0.5 ? 185 : 270, // cyan or purple
        });

        particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

        // ── Animation loop ──
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
                ctx.fill();

                // Move particle
                p.y += p.speedY;
                p.x += p.speedX;

                // Reset if off-screen
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10 || p.x > canvas.width + 10) {
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
