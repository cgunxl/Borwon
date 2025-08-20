/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Futuristic Theme Color System
        'bg': {
          'deep': '#0B0D10',
          'base': '#0F1115',
          'raised': '#151922'
        },
        'surface': {
          '1': '#1B202A',
          '2': '#222835'
        },
        'stroke': {
          'soft': '#2A313B',
          'strong': '#3A4452'
        },
        'text': {
          'primary': '#E6F7F5',
          'secondary': '#B3C6C2',
          'muted': '#869590'
        },
        'accent': {
          'primary': '#00FFC6',
          'primary-2': '#00E6A8',
          'aqua': '#66FFF5',
          'ice': '#DFFCF6'
        },
        'shadow': {
          'glow': 'rgba(0,255,198,0.24)'
        },
        'overlay': {
          'veil': 'rgba(10,12,16,0.6)'
        },
        'focus': {
          'ring': 'rgba(0,230,168,0.65)'
        },
        'code': {
          'green': '#00E6A8',
          'cyan': '#66FFF5',
          'gray': '#9AA6AC'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
        'thai': ['Noto Sans Thai', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        'xl': '14px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'fluid': 'fluid 20s ease-in-out infinite',
        // New futuristic animations
        'waveShift': 'waveShift 14s ease-in-out infinite',
        'scanLines': 'scanLines 12s linear infinite',
        'pulseGlow': 'pulseGlow 2.2s infinite',
        'lineSweep': 'lineSweep 1.6s linear infinite',
        'dashDraw': 'dashDraw 2.8s ease forwards',
        'floatUp': 'floatUp 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' }
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
        },
        fluid: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(0.9)' },
          '75%': { transform: 'rotate(270deg) scale(1.05)' }
        },
        // New futuristic keyframes
        waveShift: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(0)' }
        },
        scanLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' }
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,255,198,0.35)' },
          '70%': { boxShadow: '0 0 0 18px rgba(0,255,198,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,255,198,0)' }
        },
        lineSweep: {
          '0%': { opacity: '0', transform: 'translateX(-20%) skewX(-10deg)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(120%) skewX(-10deg)' }
        },
        dashDraw: {
          'to': { strokeDashoffset: '0' }
        },
        floatUp: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        'glow': '0 8px 24px rgba(0,255,198,0.24)',
        'glow-lg': '0 12px 36px rgba(0,255,198,0.3)',
        'glow-xl': '0 20px 60px rgba(0,255,198,0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0,255,198,0.2)',
        'card': '0 10px 30px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.02)',
        'card-hover': '0 14px 40px rgba(0,0,0,0.6)',
        'glow-edge': '0 0 0 1px rgba(0,255,198,0.12)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-ocean': 'linear-gradient(135deg, #0066cc 0%, #00ff88 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-light': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(21,25,34,0.9), rgba(15,17,21,0.9))',
        'gradient-waves': 'radial-gradient(1200px 800px at 70% -20%, rgba(0,255,198,0.10), transparent), linear-gradient(180deg,#0B0D10 0%,#0F1115 60%,#151922 100%)',
        'gradient-scan': 'repeating-linear-gradient(180deg, rgba(102,255,245,0.15) 0, rgba(102,255,245,0.15) 2px, transparent 2px, transparent 8px)',
        'gradient-conic-waves': 'conic-gradient(from 180deg at 50% 50%, rgba(102,255,245,0.06), rgba(0,0,0,0) 45%, rgba(0,255,198,0.08) 60%, rgba(0,0,0,0))'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: []
}