/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        "background-dark": 'hsl(var(--background__dark))',
        foreground: 'hsl(var(--foreground))',
        "foreground-dark": 'hsl(var(--foreground__dark))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: "hsl(var(--primary_dark))",
          foreground: 'hsl(var(--primary-foreground))',
          "foreground-dark": 'hsl(var(--primary-foreground__dark))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          dark: "hsl(var(--destructive__dark))",
          foreground: 'hsl(var(--destructive-foreground))',
          "foreground-dark": 'hsl(var(--destructive-foreground__dark))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
