import type { Config } from "tailwindcss";

// Playful Geometric design system tokens — mirrored verbatim from mydesignsystem/tailwind.config.ts
// so components copied from that library render pixel-identically here.
export default {
  content: [
    "./app/prototipo-2/**/*.{ts,tsx}",
    "./components/design-system/**/*.{ts,tsx}",
    "./components/proto2/**/*.{ts,tsx}",
  ],
  corePlugins: {
    // Prototype 1 (app/page.tsx + home.css) ships its own reset; keep Tailwind's
    // global preflight off so it never leaks into that route.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: "#FFFDF5",
        foreground: "#1E293B",
        muted: "#F1F5F9",
        "muted-foreground": "#64748B",
        accent: "#8B5CF6",
        "accent-foreground": "#FFFFFF",
        secondary: "#F472B6",
        tertiary: "#FBBF24",
        quaternary: "#34D399",
        border: "#E2E8F0",
        input: "#FFFFFF",
        card: "#FFFFFF",
        ring: "#8B5CF6",
      },
      fontFamily: {
        heading: ["Outfit", "system-ui", "sans-serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.8rem", { lineHeight: "1.5" }],
        sm: ["1rem", { lineHeight: "1.5" }],
        base: ["1.25rem", { lineHeight: "1.6" }],
        lg: ["1.5625rem", { lineHeight: "1.4" }],
        xl: ["1.953rem", { lineHeight: "1.3" }],
        "2xl": ["2.441rem", { lineHeight: "1.2" }],
        "3xl": ["3.052rem", { lineHeight: "1.15" }],
        "4xl": ["3.815rem", { lineHeight: "1.1" }],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        full: "9999px",
      },
      borderWidth: {
        DEFAULT: "2px",
        3: "3px",
      },
      boxShadow: {
        pop: "4px 4px 0px 0px #1E293B",
        "pop-hover": "6px 6px 0px 0px #1E293B",
        "pop-active": "2px 2px 0px 0px #1E293B",
        "pop-card": "8px 8px 0px 0px #E2E8F0",
        "pop-card-featured": "8px 8px 0px 0px #F472B6",
        "pop-focus": "4px 4px 0px 0px #8B5CF6",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "75%": { transform: "rotate(-3deg)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #1E293B22 1.5px, transparent 1.5px)",
      },
      backgroundSize: {
        "dot-grid": "20px 20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
