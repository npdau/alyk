import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  // ============================================================
  // SITE CONFIGURATION
  // ============================================================

  // REQUIRED for sitemap generation and canonical URLs
  // Update this to your actual domain before deploying
  site: 'https://example.com',

  // Only set this if deploying to a subdirectory (e.g., github.io/repo-name)
  // base: '/repo-name',

  // ============================================================
  // TRAILING SLASH CONFIGURATION
  // ============================================================
  //
  // This is a critical decision that affects SEO and hosting compatibility.
  // READ THE README.md for detailed guidance on when to change this.
  //
  // Options:
  // - 'never'  → /about     (generates about.html)
  // - 'always' → /about/    (generates about/index.html)
  // - 'ignore' → both work  (not recommended for SEO)
  //
  // Most modern hosts (Netlify, Vercel, Cloudflare) work with 'never'.
  // AWS S3 and some traditional hosts prefer 'always'.
  //
  trailingSlash: 'never',

  // ============================================================
  // BUILD CONFIGURATION
  // ============================================================

  build: {
    // 'file'      → about.html (pairs with trailingSlash: 'never')
    // 'directory' → about/index.html (pairs with trailingSlash: 'always')
    // 'preserve'  → keeps your file structure as-is
    format: 'file',

    // Output directory for compiled assets (CSS, JS)
    assets: '_astro',
  },

  // ============================================================
  // OUTPUT MODE
  // ============================================================
  //
  // 'static'  → Pre-renders all pages at build time (default, best for SEO)
  // 'server'  → Server-side renders all pages on request
  // 'hybrid'  → Pre-renders by default, opt-in to SSR per page
  //
  // For most marketing sites and blogs, 'static' is ideal.
  // Change to 'hybrid' if you need some dynamic server-rendered pages.
  //
  output: 'static',

  // ============================================================
  // INTEGRATIONS
  // ============================================================

  integrations: [
    // React integration for shadcn/ui components
    // Components need client directives (client:load, client:visible, etc.)
    react(),

    // MDX support for enhanced Markdown with JSX components
    mdx(),

    // Sitemap generation
    // Automatically generates sitemap-index.xml at build time
    // Respects your trailingSlash configuration
    sitemap({
      // Optionally filter which pages appear in sitemap
      // filter: (page) => !page.includes('/admin/'),
      // Optionally set change frequency
      // changefreq: 'weekly',
      // Optionally set priority
      // priority: 0.7,
    }),
  ],

  // ============================================================
  // VITE CONFIGURATION
  // ============================================================

  vite: {
    plugins: [
      // Tailwind CSS v4 Vite plugin
      tailwindcss(),
    ],

    // Resolve configuration for path aliases
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },

  // ============================================================
  // SERVER CONFIGURATION (Development)
  // ============================================================

  server: {
    // Development server port
    port: 4321,

    // Open browser automatically on start
    // open: true,

    // Host configuration for network access
    // host: true, // Allows access from other devices on network
  },

  // ============================================================
  // MARKDOWN CONFIGURATION
  // ============================================================

  markdown: {
    // Syntax highlighting
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },

    // GitHub Flavored Markdown features
    gfm: true,

    // Smart quotes and punctuation
    smartypants: true,

    // Rehype plugins for processing HTML output
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },

  // ============================================================
  // EXPERIMENTAL FEATURES
  // ============================================================

  // experimental: {
  //   // Enable experimental features as needed
  // },

  // ============================================================
  // IMAGE CONFIGURATION
  // ============================================================

  image: {
    // Allow images from these domains
    domains: ['images.unsplash.com'],

    // Allow images matching these patterns
    remotePatterns: [{ hostname: '**.cloudinary.com' }, { hostname: '**.amazonaws.com' }],
  },

  // ============================================================
  // ENVIRONMENT VARIABLES (Type-safe with astro:env)
  // ============================================================

  env: {
    schema: {
      // Public variables (available in client-side code)
      // PUBLIC_API_URL: envField.string({
      //   context: 'client',
      //   access: 'public',
      //   default: 'https://api.example.com'
      // }),
      // Server-only secrets (never exposed to client)
      // DATABASE_URL: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
      // API_KEY: envField.string({
      //   context: 'server',
      //   access: 'secret'
      // }),
    },
    // Validate that all required secrets are present
    validateSecrets: true,
  },

  // ============================================================
  // SECURITY CONFIGURATION
  // ============================================================

  security: {
    // CSRF protection - validates Origin header matches Host
    // Enabled by default in Astro 5, explicitly configured here
    checkOrigin: true,
  },

  // ============================================================
  // REDIRECTS
  // ============================================================
  //
  // Note: Redirects don't always handle trailing slashes as expected.
  // See: https://github.com/withastro/astro/issues/12532
  //
  // redirects: {
  //   '/old-page': '/new-page',
  // },
});
