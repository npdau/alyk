# Design Workflow

How to go from idea to working website using this starter.

---

## Part 1: Getting Your Design

Before any code gets written, you need a design to work from. Here are your options:

### Option A: AI-Generated Designs

Use AI tools to generate full website designs from prompts:

- **Google Stitch** — Generate complete website designs from text descriptions
- **Figma AI** — Generate layouts and components within Figma
- **Midjourney / DALL-E** — Generate website mockup images
- **Claude / ChatGPT** — Describe what you want, get layout suggestions and wireframes

**Tips for AI design prompts:**

- Be specific about your industry (e.g., "veterinary clinic", "law firm", "bakery")
- Mention the vibe you want (e.g., "modern and minimal", "warm and friendly", "professional")
- Reference sites you like (e.g., "similar to Stripe's homepage")
- Specify what pages you need (e.g., "homepage, about, services, contact")

### Option B: Screenshots & Inspiration

Find websites you like and screenshot them:

- **Competitor websites** — See what others in your industry are doing
- **[Dribbble](https://dribbble.com)** — Design inspiration
- **[Awwwards](https://awwwards.com)** — Award-winning web design
- **[Land-book](https://land-book.com)** — Landing page designs
- **[Mobbin](https://mobbin.com)** — Mobile app designs

Take full-page screenshots of sites you like. Note what specifically you like about each.

### Option C: Figma or Design Files

If you have a designer or bought a template:

- Export screens as PNG/JPG for reference
- Note the exact colours (use colour picker)
- Export any icons or assets you need
- Get font names and weights

### Option D: Sketch It Out

Even rough sketches work:

- Draw on paper or whiteboard
- Use simple tools like Excalidraw or Whimsical
- Take photos of physical sketches
- Focus on layout, not perfection

### Create a Design Reference Folder

Organise everything in one place:

```
design-reference/
├── screenshots/
│   ├── homepage-inspiration.png
│   ├── competitor-site.png
│   ├── mobile-nav-reference.png
│   └── hero-section-i-like.png
├── assets/
│   ├── logo.svg
│   ├── hero-image.jpg
│   └── team-photos/
├── colours.md          # Hex codes you've identified
├── fonts.md            # Font names from the design
└── notes.md            # What you like, what to avoid
```

**Tip:** Add `design-reference/` to `.gitignore` if you don't want to commit large image files.

### What to Extract From Your Design

Before handing off to AI, note these things:

1. **Colours** — Primary colour, background, text colour, any accent colours
2. **Fonts** — What font is used? (Check Google Fonts if unsure)
3. **Corner style** — Sharp corners or rounded? How rounded?
4. **Spacing** — Tight and compact or loose and airy?
5. **Shadows** — Are they used? Subtle or prominent?
6. **Overall vibe** — Professional? Playful? Minimal? Bold?

---

## Part 2: Implementation Workflow (For AI)

These are step-by-step instructions for implementing the design.

### Phase 1: Analyse the Design

Before writing any code, extract all design information.

### 1.1 Colours

Identify every colour used in the design:

| Role               | Where Used                          | Hex/Value |
| ------------------ | ----------------------------------- | --------- |
| Primary            | Buttons, links, highlights          | #\_\_\_   |
| Primary foreground | Text on primary backgrounds         | #\_\_\_   |
| Secondary          | Secondary buttons, tags             | #\_\_\_   |
| Background         | Page background                     | #\_\_\_   |
| Foreground         | Body text                           | #\_\_\_   |
| Muted              | Secondary backgrounds, disabled     | #\_\_\_   |
| Muted foreground   | Secondary text, placeholders        | #\_\_\_   |
| Border             | Dividers, input borders, card edges | #\_\_\_   |
| Accent             | Hover states, highlights            | #\_\_\_   |
| Destructive        | Error states, delete buttons        | #\_\_\_   |

### 1.2 Typography

| Element    | Font Family | Weight | Size |
| ---------- | ----------- | ------ | ---- |
| Body text  |             |        |      |
| Headings   |             |        |      |
| Navigation |             |        |      |
| Buttons    |             |        |      |

### 1.3 Spacing

Note the spacing scale used:

- Section padding (vertical space between major sections)
- Card padding (internal padding in cards/containers)
- Gap between elements (buttons, form fields, grid items)

### 1.4 Corner Radius

| Element | Radius                      |
| ------- | --------------------------- |
| Buttons | sharp / sm / md / lg / full |
| Cards   |                             |
| Inputs  |                             |
| Images  |                             |

### 1.5 Shadows

Are shadows used? How prominent?

- None
- Subtle (barely visible)
- Medium (noticeable depth)
- Strong (prominent elevation)

## Phase 2: Update Design Tokens

Open `src/styles/globals.css` and update the `@theme` block with extracted values.

```css
@theme {
  /* Colours - convert hex to oklch */
  --color-primary: oklch(/* from design */);
  --color-primary-foreground: oklch(/* from design */);
  --color-secondary: oklch(/* from design */);
  --color-background: oklch(/* from design */);
  --color-foreground: oklch(/* from design */);
  --color-muted: oklch(/* from design */);
  --color-muted-foreground: oklch(/* from design */);
  --color-border: oklch(/* from design */);

  /* Typography */
  --font-sans: 'FontName', system-ui, sans-serif;

  /* Radius */
  --radius-sm: /* from design */;
  --radius-md: /* from design */;
  --radius-lg: /* from design */;
}
```

If the design uses Google Fonts, add the font link in `src/layouts/BaseLayout.astro`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=FontName:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## Phase 3: Inventory Core Components

Look at the design and list every UI element that appears multiple times.

For each element, determine:

1. **Does it already exist?** Check `src/components/core/`
2. **Does it need modification?** (new variant, new size, new prop)
3. **Does it need to be created?**

### Existing Core Components

| Component   | File              | Variants                                 | Sizes                |
| ----------- | ----------------- | ---------------------------------------- | -------------------- |
| Button      | Button.astro      | primary, secondary, outline, ghost       | sm, md, lg           |
| Card        | Card.astro        | default, outline                         | -                    |
| Container   | Container.astro   | -                                        | sm, md, lg, xl, full |
| Link        | Link.astro        | default, muted                           | -                    |
| Input       | Input.astro       | -                                        | -                    |
| Textarea    | Textarea.astro    | -                                        | -                    |
| Label       | Label.astro       | -                                        | -                    |
| Badge       | Badge.astro       | default, secondary, outline, destructive | -                    |
| Section     | Section.astro     | -                                        | sm, md, lg           |
| Avatar      | Avatar.astro      | -                                        | sm, md, lg, xl       |
| Separator   | Separator.astro   | horizontal, vertical                     | -                    |
| Tabs        | Tabs.astro        | -                                        | -                    |
| Accordion   | Accordion.astro   | -                                        | -                    |
| Spinner     | Spinner.astro     | -                                        | sm, md, lg           |
| Breadcrumbs | Breadcrumbs.astro | chevron, slash, dot (separator)          | -                    |
| Switch      | Switch.astro      | -                                        | sm, md, lg           |

### Decision Tree for Core Components

```
Is this UI element in the design?
├── YES: Does a core component exist for it?
│   ├── YES: Does it match the design?
│   │   ├── YES → Use as-is
│   │   └── NO → Can it match by adjusting tokens only?
│   │       ├── YES → Adjust tokens in globals.css
│   │       └── NO → Add a new variant to the component
│   └── NO → Create new core component
└── NO → Skip
```

## Phase 4: Inventory Blocks

Look at the design and identify every distinct page section.

For each section, determine:

1. **Does a similar block exist?** Check `src/components/blocks/`
2. **Can an existing block be configured via props?**
3. **Does a new block need to be created?**

### Existing Blocks

| Block       | File              | Purpose                              |
| ----------- | ----------------- | ------------------------------------ |
| TopNav      | TopNav.astro      | Site header with navigation          |
| Footer      | Footer.astro      | Site footer with links               |
| Hero        | Hero.astro        | Landing page hero with headline, CTA |
| Features    | Features.astro    | Grid of feature cards                |
| ImageText   | ImageText.astro   | Two-column image + text              |
| CTA         | CTA.astro         | Call-to-action section               |
| ContactForm | ContactForm.astro | Contact form                         |
| FAQ         | FAQ.astro         | FAQ with accordion                   |

### Decision Tree for Blocks

```
Is this section in the design?
├── YES: Does a block exist for this type of section?
│   ├── YES: Can it match by passing different props?
│   │   ├── YES → Use existing block with props
│   │   └── NO → Does it need a new variant/option?
│   │       ├── YES → Add prop to existing block
│   │       └── NO → Create new block
│   └── NO → Create new block
└── NO → Skip
```

## Phase 5: Plan Pages

List every page needed and what blocks each page uses.

| Page    | Route    | Blocks Used                         |
| ------- | -------- | ----------------------------------- |
| Home    | /        | TopNav, Hero, Features, CTA, Footer |
| About   | /about   | TopNav, Hero, ImageText, Footer     |
| Contact | /contact | TopNav, ContactForm, Footer         |
| etc.    |          |                                     |

## Phase 6: Implementation Order

Execute in this exact order:

1. **Tokens first** — Update `globals.css` with all design tokens
2. **Core components** — Create or modify core components
3. **Blocks** — Create or modify blocks (using core components)
4. **Pages** — Compose pages from blocks
5. **Refinements** — Adjust as needed

## Phase 7: Refinement Strategy

If something doesn't look right, fix it at the highest possible level:

### Level 1: Token Adjustment (Best)

Change affects entire site consistently.

```css
/* globals.css */
--color-primary: oklch(0.6 0.2 260); /* Adjust this */
```

Use when: The colour/spacing/radius is wrong everywhere.

### Level 2: Core Component Adjustment

Change affects all instances of that component.

```js
// In Button.astro
const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-full', // Add rounded-full
};
```

Use when: A specific component type needs adjustment everywhere it appears.

### Level 3: Block Adjustment

Change affects all instances of that block.

```astro
<!-- In Hero.astro -->
<Section class="from-muted to-background bg-gradient-to-b" />
```

Use when: A specific section type needs adjustment.

### Level 4: Custom Component (Last Resort)

Create a one-off component in `src/components/custom/`.

```astro
---
/**
 * GradientHero
 *
 * Custom hero with specific gradient that doesn't fit the token system.
 * Lives in custom/ because it uses arbitrary values.
 */
---

<section class="bg-gradient-to-br from-[#667eea] to-[#764ba2]"></section>
```

Use when: The design requires something that doesn't fit the token system and is truly unique.

**Rules for custom components:**

- Still use core components where possible (Button, Container, etc.)
- Still accept props for content (no hardcoded text)
- Comment explaining why it's custom
- Can use arbitrary Tailwind values

## Checklist

Before starting implementation:

- [ ] All colours extracted from design
- [ ] Typography identified (font family, weights, sizes)
- [ ] Spacing scale noted
- [ ] Corner radius documented
- [ ] Shadow usage documented
- [ ] Core components inventoried (exists / needs variant / needs creation)
- [ ] Blocks inventoried (exists / needs variant / needs creation)
- [ ] Pages planned with block composition
- [ ] Implementation order clear

## Example Walkthrough

### Given Design: Veterinary Clinic Website

**Phase 1 Analysis:**

- Primary: Green (#22c55e)
- Background: Warm cream (#faf7f2)
- Text: Dark brown (#292524)
- Corners: Very rounded (friendly feel)
- Shadows: Subtle

**Phase 2 Tokens:**

```css
@theme {
  --color-primary: oklch(0.72 0.19 142);
  --color-background: oklch(0.98 0.01 80);
  --color-foreground: oklch(0.22 0.02 50);
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
}
```

**Phase 3 Core Components:**

- Button: Exists, works with token changes
- Card: Exists, works with token changes
- Badge: Needs "success" variant for availability status

**Phase 4 Blocks:**

- Hero: Exists, will use with pet image
- Features: Exists, will use for services
- Team: Does not exist → Create new block
- Testimonials: Does not exist → Create new block

**Phase 5 Pages:**

- Home: Hero, Features (services), Team preview, CTA
- About: Hero, Team full, ImageText
- Services: Hero, Features detailed
- Contact: Hero, ContactForm

**Phase 6 Implementation:**

1. Update tokens in globals.css
2. Add "success" variant to Badge
3. Create Team block
4. Create Testimonials block
5. Build pages
6. Refine

---

## Part 3: Working With AI

How to communicate with Claude Code (or similar) to implement your design.

### What to Share

When starting a new project, share:

1. **Your design reference** — Screenshots, images, or descriptions
2. **The design-reference folder** — If you created one
3. **Specific colours** — Any hex codes you've identified
4. **Font preferences** — If you know what fonts you want
5. **What pages you need** — Homepage, about, contact, etc.

### Good Prompts

**Starting a new site:**

> "I have a design for a veterinary clinic website. Here's a screenshot of the homepage. The primary colour is green (#22c55e), and I want a warm, friendly feel. Can you implement this using the starter?"

**Extracting design details:**

> "Look at this screenshot and extract the colours, fonts, and spacing for me. Fill out the design analysis tables."

**Implementing a section:**

> "This hero section needs a large headline, subtext, two buttons, and an image on the right. Which block should I use or do we need to create one?"

**Refining the look:**

> "The buttons look too sharp. I want them more rounded like in the design. Should we change the tokens or the component?"

### What AI Will Do

Following this workflow, AI will:

1. Analyse your design and extract tokens
2. Update `globals.css` with your brand colours/fonts
3. Check which components exist vs need creation
4. Build or modify blocks to match your sections
5. Compose pages from blocks
6. Refine until it matches your design

### Iterating on the Design

After the first pass:

- **"Make it more [adjective]"** — AI will adjust tokens or components
- **"This section doesn't match"** — Share the specific screenshot
- **"Can we try a different layout?"** — AI will propose alternatives
- **"The spacing feels off"** — AI will adjust padding/margins

---

## Quick Reference

**Token file:** `src/styles/globals.css`

**Core components:** `src/components/core/`

**Blocks:** `src/components/blocks/`

**Custom components:** `src/components/custom/`

**Pages:** `src/pages/`

**Refinement order:** Tokens → Core → Blocks → Custom
