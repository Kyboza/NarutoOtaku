import { Config } from 'tailwindcss'
import { PluginAPI } from 'tailwindcss/types/config'
import textShadow from 'tailwindcss-textshadow'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rock: ['Rock Salt', 'cursive'],
        notojp: ['Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.65rem',
      },
      blur: {
        custom: '3px',
      },
      animation: {
        hamburgerOpen: 'hamburgerOpen 0.3s ease forwards',
        hamburgerClose: 'hamburgerClose 0.3s ease forwards',
        homeNavigation: 'homeNavigation 1s ease forwards',
      },
      keyframes: {
        hamburgerOpen: {
          '0%': {
            transform: 'scaleX(1)',
            transformOrigin: 'center',
          },
          '100%': {
            transform: 'scaleX(0.1)',
            transformOrigin: 'center',
          },
        },
        hamburgerClose: {
          '0%': {
            transform: 'scaleX(0.1)',
            transformOrigin: 'center',
          },
          '100%': {
            transform: 'scaleX(1)',
            transformOrigin: 'center',
          },
        },
        homeNavigation: {
          '0%': {
            transform: 'translateY(-75%)',
            opacity: '0',
            transformOrigin: 'center',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            transformOrigin: 'center',
          },
        },
      },
      textShadow: {
        'letter-border': '1px 0px 0px rgba(0, 0, 0, 1)',
      },
      screens: {
		
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        // Add any custom utilities here (if necessary)
      })
    },
    textShadow,
    animate,
  ],
} satisfies Config
