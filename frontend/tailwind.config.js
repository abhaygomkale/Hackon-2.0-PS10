/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#2563EB',
        'emergency-red': '#EF4444',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shine: {
          '100%': { transform: 'translateX(150%) skewX(-20deg)' },
        }
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        fadeIn: 'fadeIn 0.3s ease-out',
        shine: 'shine 1.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
