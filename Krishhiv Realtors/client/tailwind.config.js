/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#14532D',
        secondary: '#22C55E',
        accent: '#A3E635',
        background: '#EFFAF1',
        surface: '#FFFFFF',
        textPrimary: '#10231B',
        textMuted: '#5F7168',
        gold: {
          light: '#BBF7D0',
          DEFAULT: '#22C55E',
          dark: '#15803D',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(20, 83, 45, 0.12)',
        luxury: '0 20px 60px rgba(20, 83, 45, 0.15)',
        card: '0 4px 24px rgba(20, 83, 45, 0.08)',
        gold: '0 4px 20px rgba(34, 197, 94, 0.3)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #14532D 0%, #15803D 52%, #166534 100%)',
        'gradient-gold': 'linear-gradient(135deg, #22C55E 0%, #A3E635 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(20,83,45,0.72) 0%, rgba(21,128,61,0.42) 50%, rgba(20,83,45,0.88) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
        'counter': 'counter 2s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideLeft: { from: { opacity: 0, transform: 'translateX(30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
