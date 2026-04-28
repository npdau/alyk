# Creating Components

This guide explains how to create and modify components in this starter.

## Understanding the Component Hierarchy

```
Tokens (globals.css)
    ↓
Core Components (src/components/core/)
    ↓
Blocks (src/components/blocks/)
    ↓
Pages (src/pages/)
```

Each layer only references the one above it. This keeps everything maintainable.

## Core Components

Core components are the building blocks. They're:

- **Reusable** — Used across many blocks
- **Prop-driven** — Customised via props, not by editing the file
- **Token-only** — Never use arbitrary values like `bg-blue-500`

### Anatomy of a Core Component

```astro
---
/**
 * Button Component
 *
 * Brief description of what it does.
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="lg">Large outline</Button>
 */

// 1. Define the props interface
interface Props {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** If provided, renders as a link */
  href?: string;
  /** Additional CSS classes */
  class?: string;
}

// 2. Destructure props with defaults
const { variant = 'primary', size = 'md', href, class: className } = Astro.props;

// 3. Define styles using tokens only
const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors';

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const sizeStyles = {
  sm: 'h-9 px-3 text-sm rounded-md',
  md: 'h-10 px-4 py-2 text-sm rounded-lg',
  lg: 'h-11 px-6 text-base rounded-lg',
};
---

<!-- 4. Render with class:list for conditional classes -->{
  href ? (
    <a href={href} class:list={[baseStyles, variantStyles[variant], sizeStyles[size], className]}>
      <slot />
    </a>
  ) : (
    <button class:list={[baseStyles, variantStyles[variant], sizeStyles[size], className]}>
      <slot />
    </button>
  )
}
```

### Creating a New Core Component

1. Create a new file in `src/components/core/`
2. Follow the pattern above
3. Use only token-based Tailwind classes
4. Export via props interface

### Adding Variants to Existing Components

Open the component and add to the variants object:

```js
const variantStyles = {
  primary: '...',
  secondary: '...',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', // New!
};
```

Then update the Props interface:

```ts
interface Props {
  variant?: 'primary' | 'secondary' | 'destructive'; // Added
}
```

## Blocks

Blocks are page sections. They're:

- **Composed** — Made from core components
- **Prop-driven** — Content passed as props
- **Self-contained** — Include their own layout/spacing

### Anatomy of a Block

```astro
---
/**
 * Features Block
 *
 * A grid of feature cards.
 */
import Section from '@/components/core/Section.astro';
import Card from '@/components/core/Card.astro';

// 1. Define props for the content
interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  headline?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

// 2. Destructure with defaults
const { headline, description, features, columns = 3 } = Astro.props;

// 3. Define layout variations
const columnStyles = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};
---

<!-- 4. Compose using core components -->
<Section>
  {
    headline && (
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold">{headline}</h2>
        {description && <p class="text-muted-foreground mt-4">{description}</p>}
      </div>
    )
  }

  <div class:list={['grid gap-6', columnStyles[columns]]}>
    {
      features.map((feature) => (
        <Card>
          {feature.icon && <div class="mb-4 text-3xl">{feature.icon}</div>}
          <h3 class="font-semibold">{feature.title}</h3>
          <p class="text-muted-foreground mt-2">{feature.description}</p>
        </Card>
      ))
    }
  </div>
</Section>
```

### Creating a New Block

1. Identify the section in your design
2. Create a new file in `src/components/blocks/`
3. Import core components you need
4. Define props for the content
5. Compose the layout

### When to Create a Block vs Modify Existing

**Modify existing** when:

- The structure is the same, just different content
- You need a new prop option (like `columns={4}`)

**Create new** when:

- The layout is fundamentally different
- It serves a different purpose

## Custom Components

Custom components break the rules. They can use:

- Arbitrary Tailwind values (`bg-[#ff6b35]`)
- Custom gradients
- Specific animations
- One-off designs

### When to Use Custom

Ask yourself:

1. Does this need a colour that's not in our tokens?
2. Is this a one-off design for a specific campaign?
3. Does it need custom animations or effects?

If yes → put it in `src/components/custom/`

### Example Custom Component

```astro
---
/**
 * GradientHero
 *
 * A special hero with a custom gradient background.
 * Lives in custom/ because it uses arbitrary values.
 */
import Container from '@/components/core/Container.astro';
import Button from '@/components/core/Button.astro';

interface Props {
  headline: string;
  subheadline: string;
}

const { headline, subheadline } = Astro.props;
---

<!-- Using arbitrary gradient that doesn't fit our tokens -->
<section class="bg-gradient-to-br from-[#667eea] to-[#764ba2] py-20 text-white">
  <Container>
    <h1 class="text-5xl font-bold">{headline}</h1>
    <p class="mt-6 text-xl text-white/80">{subheadline}</p>
    <Button class="mt-8" variant="secondary">Get Started</Button>
  </Container>
</section>
```

**Note:** Even custom components should still use core components where possible (Button, Container, etc.).

## Common Patterns

### Responsive Layouts

Use Tailwind's responsive prefixes:

```html
<!-- Stack on mobile, side-by-side on desktop -->
<div class="grid grid-cols-1 gap-8 lg:grid-cols-2"></div>
```

### Conditional Rendering

```astro
{image && <img src={image.src} alt={image.alt} />}

{
  items.length > 0 && (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  )
}
```

### Passing Additional Classes

Always accept a `class` prop:

```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<div class:list={['base-styles', className]}></div>
```

### Slots for Flexible Content

```astro
<!-- Component -->
<div class="card">
  <slot name="header" />
  <slot />
  <!-- Default slot -->
  <slot name="footer" />
</div>

<!-- Usage -->
<Card>
  <h3 slot="header">Title</h3>
  <p>Main content goes here</p>
  <Button slot="footer">Action</Button>
</Card>
```

## Checklist for New Components

### Core Component

- [ ] File in `src/components/core/`
- [ ] Props interface defined
- [ ] Default values for optional props
- [ ] Only uses token-based Tailwind classes
- [ ] JSDoc comment with examples
- [ ] Accepts `class` prop for customisation

### Block

- [ ] File in `src/components/blocks/`
- [ ] Uses core components
- [ ] Props for all content (no hardcoded text)
- [ ] Includes Section wrapper for consistent spacing
- [ ] Responsive layout

### Custom Component

- [ ] File in `src/components/custom/`
- [ ] Clear comment explaining why it's custom
- [ ] Still uses core components where possible
- [ ] Prop-driven for reusability

## Tips

1. **Start with props** — Define what content the component needs before building it
2. **Keep it simple** — One component, one job
3. **Use tokens** — If you find yourself using arbitrary values, add a token or use custom/
4. **Test on mobile** — Check your components at small screen sizes
