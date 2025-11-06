import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '9xl': '8rem',    // 128px - used in Hero
        '10xl': '9rem',   // 144px
        '11xl': '10rem',  // 160px
        '12xl': '11rem',  // 176px
        '13xl': '12rem',  // 192px
        '14xl': '13rem',  // 208px
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#ff00ff',
        secondary: '#00ffff',
        accent: '#ff69b4',
        'neon-pink': '#ff006e',
        'neon-blue': '#00d9ff',
        'neon-purple': '#9d00ff',
        'dark-bg': '#0a0a0f',
        'dark-card': '#1a1a2e',
      },
    },
  },
  plugins: [],
}

export default config
