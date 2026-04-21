import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/showcase/src/**/*.{html,ts}',
    './projects/ui-kit/src/**/*.{html,ts}',
    './docs/**/*.{md,html}',
  ],
  theme: {
    extend: {
      borderRadius: {},
      colors: {},
      keyframes: {
        'ui-accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--ui-accordion-content-height)' },
        },
        'ui-accordion-up': {
          from: { height: 'var(--ui-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'ui-accordion-down': 'ui-accordion-down 200ms ease-out',
        'ui-accordion-up': 'ui-accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
