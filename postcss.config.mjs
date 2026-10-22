// Tailwind CSS v4 runs as a PostCSS plugin.
// Without this file, Next.js passes app/globals.css through PostCSS untouched,
// so Tailwind-specific at-rules like `@theme` fail to parse.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
