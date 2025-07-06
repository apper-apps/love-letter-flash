/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        'misty-rose': '#FFE4E1',
        'hot-pink': '#FF69B4',
        'light-pink': '#FFC0CB',
        'lavender-blush': '#FFF5F5',
        'deep-pink': '#FF1493',
        'romantic-pink': '#FFB6C1',
        'soft-pink': '#FFC0CB',
        'blush': '#DE3163',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
'typewriter': 'typewriter 3s steps(40, end)',
        'float': 'float 6s ease-in-out infinite',
        'heart-fall': 'heartFall 4s ease-out forwards',
        'click-ripple': 'clickRipple 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartFall: {
          '0%': { 
            transform: 'translateY(-20px) scale(0) rotate(0deg)',
            opacity: '0'
          },
          '10%': {
            transform: 'translateY(0px) scale(1) rotate(45deg)',
            opacity: '1'
          },
          '90%': {
            transform: 'translateY(100vh) scale(0.8) rotate(315deg)',
            opacity: '0.8'
          },
          '100%': {
            transform: 'translateY(110vh) scale(0) rotate(360deg)',
            opacity: '0'
          }
        },
        clickRipple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0'
          }
        },
      },
    },
  },
  plugins: [],
}