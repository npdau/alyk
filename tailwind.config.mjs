/** @type {import('tailwindcss').Config} */
export default {
  /*
   * Tailwind CSS v4 Configuration
   *
   * With Tailwind v4, all design tokens and customization should happen
   * in CSS using the @theme directive in src/styles/globals.css
   *
   * This config file is minimal - only settings that can't be in CSS.
   */

  darkMode: 'class',

  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
};
