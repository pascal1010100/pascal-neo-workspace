// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores base
        primary: {
          DEFAULT: '#FF2A6D', // Rosa neón
          50: '#FFE6EE',
          100: '#FFCCDD',
          200: '#FF99BB',
          300: '#FF6699',
          400: '#FF3377',
          500: '#FF2A6D',
          600: '#E6004C',
          700: '#B3003C',
          800: '#80002B',
          900: '#4D001A',
        },
        secondary: {
          DEFAULT: '#00F0FF', // Cian neón
          50: '#E6FBFF',
          100: '#CCF7FF',
          200: '#99EEFF',
          300: '#66E4FF',
          400: '#33DBFF',
          500: '#00F0FF',
          600: '#00B8CC',
          700: '#008699',
          800: '#005C66',
          900: '#00333A',
        },
        accent: {
          DEFAULT: '#B829E8', // Púrpura neón
          50: '#F2E6FA',
          100: '#E6CCF5',
          200: '#CC99EB',
          300: '#B366E0',
          400: '#9933D6',
          500: '#B829E8',
          600: '#8A00B3',
          700: '#660086',
          800: '#4D0066',
          900: '#330040',
        },
        neon: {
          pink: '#FF2A6D',
          cyan: '#00F0FF',
          purple: '#B829E8',
          yellow: '#FFD300',
          green: '#39FF14'
        },
        background: {
          DEFAULT: '#0A0A1A',
          50: '#E6E6F0',
          100: '#CCCCE0',
          200: '#9999C1',
          300: '#6666A2',
          400: '#333383',
          500: '#0A0A1A',
          600: '#080814',
          700: '#06060F',
          800: '#04040A',
          900: '#020205',
        },
        surface: {
          DEFAULT: '#1A1A2E',
          50: '#E8E8F0',
          100: '#D1D1E0',
          200: '#A3A3C1',
          300: '#7575A2',
          400: '#474783',
          500: '#1A1A2E',
          600: '#151525',
          700: '#10101C',
          800: '#0A0A12',
          900: '#050509',
        },
      },
      fontFamily: {
        sans: ['var(--font-comic-neue)', 'Comic Neue', 'cursive', 'system-ui', 'sans-serif'],
        mono: ['var(--font-vt323)', 'VT323', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'], // Necesitarás cargar esta fuente
        kawaii: ['Nunito', 'Comic Sans MS', 'cursive'] // Fuente más redondeada para elementos kawaii
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'neon-flicker': 'neonFlicker 1.5s infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        neonPulse: {
          '0%': { 'text-shadow': '0 0 5px #FF2A6D, 0 0 10px #FF2A6D, 0 0 20px #FF2A6D' },
          '100%': { 'text-shadow': '0 0 10px #FF2A6D, 0 0 20px #FF2A6D, 0 0 30px #FF2A6D, 0 0 40px #FF2A6D' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            'text-shadow': '0 0 5px #FF2A6D, 0 0 10px #FF2A6D, 0 0 20px #FF2A6D',
            'box-shadow': '0 0 10px #FF2A6D, 0 0 20px #FF2A6D, 0 0 30px #FF2A6D',
          },
          '20%, 24%, 55%': {
            'text-shadow': 'none',
            'box-shadow': 'none',
          },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 2px #00F0FF) drop-shadow(0 0 4px #00F0FF)' },
          '100%': { filter: 'drop-shadow(0 0 6px #00F0FF) drop-shadow(0 0 12px #00F0FF)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
      boxShadow: {
        'neon-sm': '0 0 2px theme("colors.primary.500"), 0 0 4px theme("colors.primary.500")',
        'neon': '0 0 5px theme("colors.primary.500"), 0 0 10px theme("colors.primary.500")',
        'neon-md': '0 0 10px theme("colors.primary.500"), 0 0 20px theme("colors.primary.500")',
        'neon-lg': '0 0 15px theme("colors.primary.500"), 0 0 30px theme("colors.primary.500")',
        'neon-xl': '0 0 20px theme("colors.primary.500"), 0 0 40px theme("colors.primary.500")',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;