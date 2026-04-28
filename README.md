# Astro Starter

A design system starter for building small business websites with AI assistance.

## The Idea

This starter solves a common problem: when AI generates websites, you get either messy one-off code or you're fighting a component library's opinions. This starter gives you:

- **Speed** from AI-assisted development
- **Consistency** from a simple component system
- **Control** over every design decision
- **Maintainability** from clear structure

## How It Works

Everything flows in one direction:

```
Tokens → Core Components → Blocks → Pages
```

1. **Tokens** (`src/styles/globals.css`) — Your brand colours, fonts, spacing
2. **Core Components** (`src/components/core/`) — Buttons, cards, inputs - reusable primitives
3. **Blocks** (`src/components/blocks/`) — Page sections like Hero, Features, FAQ
4. **Pages** (`src/pages/`) — Pure composition - import blocks, pass content

## Quick Start

```bash
# Clone the starter
git clone [this-repo] my-site
cd my-site

# Install dependencies
pnpm install

# Start development
pnpm dev
```

Then open [http://localhost:4321](http://localhost:4321)

## Project Structure

```
src/
├── components/
│   ├── core/           # Reusable UI primitives (Button, Card, Input...)
│   ├── blocks/         # Page sections (Hero, Features, Footer...)
│   └── custom/         # One-off components that break the rules
├── layouts/
│   ├── BaseLayout.astro    # HTML document wrapper
│   └── PageLayout.astro    # Standard page with nav/footer
├── pages/              # Your site pages
├── content/            # Blog posts and other content
├── styles/
│   └── globals.css     # Design tokens and base styles
└── lib/
    └── utils.ts        # Helper functions
```

## Documentation

Detailed guides in the `/docs` folder:

| Guide                                                | What You'll Learn                   |
| ---------------------------------------------------- | ----------------------------------- |
| [Getting Started](docs/getting-started.md)           | First steps after cloning           |
| [Design Workflow](docs/design-workflow.md)           | How to apply a new design           |
| [Creating Components](docs/creating-components.md)   | Building core components and blocks |
| [Adding Content](docs/adding-content.md)             | Blog posts and content pages        |
| [Deployment Checklist](docs/deployment-checklist.md) | Going live on Netlify               |

## What's Included

### Core Components

| Component   | Purpose                     |
| ----------- | --------------------------- |
| Button      | CTAs, form submits, actions |
| Card        | Content containers          |
| Container   | Max-width wrapper           |
| Link        | Navigation and inline links |
| Input       | Form text inputs            |
| Textarea    | Multi-line text input       |
| Label       | Form labels                 |
| Badge       | Status indicators           |
| Section     | Full-width page sections    |
| Avatar      | Team/user photos            |
| Separator   | Visual dividers             |
| Tabs        | Tabbed content              |
| Accordion   | FAQs, collapsible content   |
| Spinner     | Loading states              |
| Breadcrumbs | Navigation hierarchy        |
| Switch      | Toggle switches             |

### Blocks

| Block       | Purpose                     |
| ----------- | --------------------------- |
| TopNav      | Site header with navigation |
| Footer      | Site footer with links      |
| Hero        | Landing page hero section   |
| Features    | Feature cards grid          |
| ImageText   | Two-column image + text     |
| CTA         | Call-to-action section      |
| ContactForm | Contact form with fields    |
| FAQ         | FAQ section with accordion  |

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm check      # Run Astro type checking
```

## Tech Stack

- [Astro 5](https://astro.build) — Static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS
- [TypeScript](https://www.typescriptlang.org) — Type safety

## License

MIT
