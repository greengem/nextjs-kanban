import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        red: { extend: "dark", colors: { primary: { DEFAULT: "#ef4444" } } },
        orange: { extend: "dark", colors: { primary: { DEFAULT: "#f97316" } } },
        amber: { extend: "dark", colors: { primary: { DEFAULT: "#f59e0b" } } },
        yellow: { extend: "dark", colors: { primary: { DEFAULT: "#eab308" } } },
        lime: { extend: "dark", colors: { primary: { DEFAULT: "#84cc16" } } },
        green: { extend: "dark", colors: { primary: { DEFAULT: "#22c55e" } } },
        emerald: {
          extend: "dark",
          colors: { primary: { DEFAULT: "#10b981" } },
        },
        teal: { extend: "dark", colors: { primary: { DEFAULT: "#14b8a6" } } },
        cyan: { extend: "dark", colors: { primary: { DEFAULT: "#06b6d4" } } },
        sky: { extend: "dark", colors: { primary: { DEFAULT: "#0ea5e9" } } },
        blue: { extend: "dark", colors: { primary: { DEFAULT: "#3b82f6" } } },
        indigo: { extend: "dark", colors: { primary: { DEFAULT: "#6366f1" } } },
        violet: { extend: "dark", colors: { primary: { DEFAULT: "#8b5cf6" } } },
        purple: { extend: "dark", colors: { primary: { DEFAULT: "#a855f7" } } },
        fuchsia: {
          extend: "dark",
          colors: { primary: { DEFAULT: "#d946ef" } },
        },
        pink: { extend: "dark", colors: { primary: { DEFAULT: "#ec4899" } } },
        rose: { extend: "dark", colors: { primary: { DEFAULT: "#f43f5e" } } },
      },
    }),
  ],
};
export default config;
