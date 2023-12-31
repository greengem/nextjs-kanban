import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "red": { extend: "light", colors: { primary: { DEFAULT: "#ef4444"} } },
      "orange": { extend: "light", colors: { primary: { DEFAULT: "#f97316"} } },
      "amber": { extend: "light", colors: { primary: { DEFAULT: "#f59e0b"} } },
      "yellow": { extend: "light", colors: { primary: { DEFAULT: "#eab308"} } },
      "lime": { extend: "light", colors: { primary: { DEFAULT: "#84cc16"} } },
      "green": { extend: "light", colors: { primary: { DEFAULT: "#22c55e"} } },
      "emerald": { extend: "light", colors: { primary: { DEFAULT: "#10b981"} } },
      "teal": { extend: "light", colors: { primary: { DEFAULT: "#14b8a6"} } },
      "cyan": { extend: "light", colors: { primary: { DEFAULT: "#06b6d4"} } },
      "sky": { extend: "light", colors: { primary: { DEFAULT: "#0ea5e9"} } },
      "blue": { extend: "light", colors: { primary: { DEFAULT: "#3b82f6"} } },
      "indigo": { extend: "light", colors: { primary: { DEFAULT: "#6366f1"} } },
      "violet": { extend: "light", colors: { primary: { DEFAULT: "#8b5cf6"} } },
      "purple": { extend: "light", colors: { primary: { DEFAULT: "#a855f7"} } },
      "fuchsia": { extend: "light", colors: { primary: { DEFAULT: "#d946ef"} } },
      "pink": { extend: "light", colors: { primary: { DEFAULT: "#ec4899"} } },
      "rose": { extend: "light", colors: { primary: { DEFAULT: "#f43f5e"} } },
    }
  })]
}
export default config
