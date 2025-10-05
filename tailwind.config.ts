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
        primary: {
          DEFAULT: '#FF6B9E',
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFB3D1',
          300: '#FF80B2',
          400: '#FF4D94',
          500: '#FF6B9E',
          600: '#E6005C',
          700: '#B30047',
          800: '#800033',
          900: '#4D001F',
        },
        secondary: {
          DEFAULT: '#00F0FF',
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
          DEFAULT: '#FFE66D',
          50: '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF2CC',
          300: '#FFEBB3',
          400: '#FFE499',
          500: '#FFE66D',
          600: '#FFD700',
          700: '#CCAC00',
          800: '#998100',
          900: '#665600',
        },
        background: {
          DEFAULT: '#0A0E23',
          50: '#E6E8F0',
          100: '#CCD1E0',
          200: '#99A3C1',
          300: '#6675A2',
          400: '#334783',
          500: '#0A0E23',
          600: '#080B1C',
          700: '#060815',
          800: '#04060E',
          900: '#020307',
        },
        surface: {
          DEFAULT: '#1A1F3D',
          50: '#E8E9F0',
          100: '#D1D3E0',
          200: '#A3A7C1',
          300: '#757CA2',
          400: '#475083',
          500: '#1A1F3D',
          600: '#151932',
          700: '#101327',
          800: '#0A0C1B',
          900: '#050610',
        },
      },
      fontFamily: {
        sans: ['var(--font-comic-neue)', 'Comic Neue', 'cursive', 'system-ui', 'sans-serif'],
        mono: ['var(--font-vt323)', 'VT323', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        }
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