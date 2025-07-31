/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      colors: {
        // Theme 1 - Minimalist
        'theme1': {
          primary: '#f8fafc',
          secondary: '#e2e8f0',
          accent: '#64748b',
          text: '#1e293b',
        },
        // Theme 2 - Dark
        'theme2': {
          primary: '#0f172a',
          secondary: '#1e293b',
          accent: '#3b82f6',
          text: '#f1f5f9',
        },
        // Theme 3 - Colorful
        'theme3': {
          primary: '#fef3c7',
          secondary: '#fbbf24',
          accent: '#ef4444',
          text: '#92400e',
        },
      },
    },
  },
  plugins: [],
} 