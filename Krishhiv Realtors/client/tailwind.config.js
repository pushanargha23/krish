/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0B1F3A',
        secondary: '#C8A96A',
        accent: '#D4AF37',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        textPrimary: '#1E1E1E',
        textMuted: '#6B7280',
        gold: {
          light: '#E8D5A3',
          DEFAULT: '#C8A96A',
          dark: '#A07840',
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
        glass: '0 8px 32px rgba(11, 31, 58, 0.12)',
        luxury: '0 20px 60px rgba(11, 31, 58, 0.15)',
        card: '0 4px 24px rgba(11, 31, 58, 0.08)',
        gold: '0 4px 20px rgba(200, 169, 106, 0.3)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6b 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C8A96A 0%, #D4AF37 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0.3) 50%, rgba(11,31,58,0.8) 100%)',
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
