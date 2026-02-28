import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                neon: {
                    cyan: "#00f0ff",
                    purple: "#a855f7",
                    pink: "#ec4899",
                },
                dark: {
                    900: "#0a0a0f",
                    800: "#111118",
                    700: "#1a1a24",
                    600: "#22222e",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Inter", "system-ui", "sans-serif"],
            },
            letterSpacing: {
                "ultra-wide": "0.35em",
                "mega-wide": "0.5em",
            },
            animation: {
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                pulseGlow: {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
