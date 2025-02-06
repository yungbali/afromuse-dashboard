module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1459F5',
        'dark-bg': '#1A1A1A',
        'dark-card': '#2D2D2D',
        'positive': '#2EBE7B',
        'negative': '#DA5C54',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
      }
    }
  },
  plugins: [],
}
