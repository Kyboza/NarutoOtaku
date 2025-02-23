import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import textShadow from 'tailwindcss-textshadow';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rock: ['Rock Salt', 'cursive'],
        notojp: ['Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        "xxs": "0.65rem"
      },
      blur: {
        'custom': '3px',
      },
      animation: {
        'hamburgerOpen': 'hamburgerOpen 0.3s ease forwards',
        'hamburgerClose': 'hamburgerClose 0.3s ease forwards'
      },
      keyframes: {
        hamburgerOpen: {
          '0%': { transform: 'scaleX(1)', transformOrigin: 'center' }, // Start at normal width
          '100%': { transform: 'scaleX(0.1)', transformOrigin: 'center' }, // Shrink to 0 width
        },
        hamburgerClose: {
          '0%': { transform: 'scaleX(0.1)', transformOrigin: 'center' }, // Start at normal width
          '100%': { transform: 'scaleX(1)', transformOrigin: 'center' }, // Shrink to 0 width
        },
      },
      textShadow: {
        'letter-border': '1px 0px 0px rgba(0, 0, 0, 1)',
      },
      screens: {
        'landscape-sm': { raw: '(orientation: landscape) and (min-width: 640px)' },
        'landscape-md': { raw: '(orientation: landscape) and (min-width: 768px)' },
        'landscape-lg': { raw: '(orientation: landscape) and (min-width: 1024px)' },
        'landscape-xl': { raw: '(orientation: landscape) and (min-width: 1280px)' },
      },
    },
  },
  plugins: [
    function({ addUtilities }: PluginAPI) {
      addUtilities({
        // Add any custom utilities here (if necessary)
      });
    },
    textShadow,
  ],
} satisfies Config;
