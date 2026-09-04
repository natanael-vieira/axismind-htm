import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        axis: {
          canvas: '#F2EFE7',
          surface: '#F7F4ED',
          muted: '#EBE6DC',
          ink: '#28363B',
          body: '#5F6C70',
          line: '#D8D1C6',
          teal: '#426A73',
          lavender: '#9A90AA',
          clay: '#9E5D4A',
          peach: '#F2B68F',
        },
      },
      borderRadius: {
        axis: '1.75rem',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(40, 54, 59, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
