import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B2D8A',
          light: '#8B4DAB',
          dark: '#4E1F66',
          50: '#F5EEF9',
          100: '#E5D4F0',
          200: '#C9A5DD',
          300: '#AD77CA',
          400: '#914FB2',
          500: '#6B2D8A',
          600: '#5A2574',
          700: '#4E1F66',
          800: '#3A1750',
          900: '#26103A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E3C867',
          dark: '#A8871F',
        },
        sky: {
          DEFAULT: '#DDE8F3',
          light: '#EEF4FA',
          dark: '#B8CDE2',
        },
        cream: '#FFFDF8',
        surface: {
          DEFAULT: '#FFFFFF',
          dim: '#F7F3FA',
        },
        elite: {
          text: '#2D1B3D',
          muted: '#6B5A7A',
          border: '#E8DFF0',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(107, 45, 138, 0.08)',
        'card-hover': '0 8px 32px rgba(107, 45, 138, 0.16)',
        ambient: '0 1px 3px rgba(0,0,0,0.08)',
        gold: '0 0 0 3px #D4AF37',
      },
      backgroundImage: {
        'elite-gradient': 'linear-gradient(135deg, #6B2D8A 0%, #4E1F66 60%, #1a0933 100%)',
        'hero-gradient': 'linear-gradient(135deg, #DDE8F3 0%, #EEF4FA 50%, #F5EEF9 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #A8871F)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'ping-once': 'ping-once 1s ease-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
