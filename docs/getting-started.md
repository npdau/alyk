# Getting Started

This guide walks you through setting up a new site using this starter.

## Prerequisites

You'll need:

- **Node.js 18+** installed on your computer
- **pnpm** package manager (`npm install -g pnpm`)
- A code editor (VS Code recommended)
- A terminal/command line

## Step 1: Clone the Starter

```bash
git clone [this-repo] my-site
cd my-site
```

Replace `my-site` with your project name (use lowercase, no spaces).

## Step 2: Install Dependencies

```bash
pnpm install
```

This downloads all the packages the project needs. It might take a minute.

## Step 3: Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. You should see the starter homepage.

**The development server automatically refreshes when you save changes.**

## Step 4: Configure Your Site

### Update Site URL

Open `astro.config.mjs` and change the site URL:

```js
export default defineConfig({
  site: 'https://your-domain.com', // Your actual domain
  // ...
});
```

### Update Site Name

Open `src/components/seo/SEO.astro` and update:

```js
const SITE_NAME = 'Your Business Name';
const TWITTER_HANDLE = '@yourhandle'; // Or leave empty
```

### Update Navigation

Open `src/components/blocks/TopNav.astro` and edit the navigation items:

```js
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];
```

### Update Footer

Open `src/components/blocks/Footer.astro` and edit:

- Company links
- Social media links
- Copyright text

## Step 5: Replace Placeholder Content

1. **Logo** — Replace "Your Logo" text in TopNav and Footer with your actual logo
2. **Favicon** — Replace `public/favicon.svg` with your icon
3. **OG Image** — Replace `public/og-image.png` with your social sharing image (1200x630px)
4. **Homepage content** — Edit `src/pages/index.astro`

## Project Structure Overview

```
src/
├── components/
│   ├── core/       # UI primitives (Button, Card, etc.)
│   ├── blocks/     # Page sections (Hero, Footer, etc.)
│   └── custom/     # One-off components
├── layouts/        # Page templates
├── pages/          # Your site pages (URL = filename)
├── content/        # Blog posts (if using)
├── styles/         # CSS and design tokens
└── lib/            # Helper functions
```

### Key Files

| File                           | Purpose                                 |
| ------------------------------ | --------------------------------------- |
| `src/styles/globals.css`       | Design tokens (colours, fonts, spacing) |
| `src/layouts/PageLayout.astro` | Standard page template                  |
| `src/pages/index.astro`        | Homepage                                |
| `astro.config.mjs`             | Astro configuration                     |

## Common Commands

| Command        | What It Does                     |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start development server         |
| `pnpm build`   | Build for production             |
| `pnpm preview` | Preview production build locally |
| `pnpm check`   | Check for TypeScript errors      |

## Next Steps

1. **Apply your design** — See [Design Workflow](design-workflow.md)
2. **Customise components** — See [Creating Components](creating-components.md)
3. **Add blog posts** — See [Adding Content](adding-content.md)
4. **Go live** — See [Deployment Checklist](deployment-checklist.md)

## Getting Help

If something's not working:

1. Check the terminal for error messages
2. Make sure you saved all files
3. Try stopping the dev server (Ctrl+C) and running `pnpm dev` again
4. Check the [Astro documentation](https://docs.astro.build)

## Troubleshooting

### "Module not found" errors

Run `pnpm install` again to make sure all packages are installed.

### Styles not updating

Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows).

### Port 4321 already in use

Another dev server is running. Find and close it, or use a different port:

```bash
pnpm dev -- --port 3000
```
