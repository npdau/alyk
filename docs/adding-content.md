# Adding Content

How to add, organize, and customize content in your site.

---

## Quick Start: Adding a Blog Post

1. Create a new file in `src/content/blog/`:

```
src/content/blog/my-new-post.md
```

2. Add frontmatter and content:

```md
---
title: 'My Post Title'
description: 'A brief description for SEO and previews.'
pubDate: 2024-01-15
author: 'Your Name'
tags: ['web', 'tutorial']
---

Your content starts here. Write in Markdown.

## Section Heading

**Important:** The post title from frontmatter becomes the h1.
Start your content with h2 (##) or below — never include an h1 in the markdown body.
```

3. Visit `/blog/my-new-post` to see your post

---

## Understanding Content Collections

Astro uses "content collections" to manage structured content. The system has three parts:

```
src/
├── content/
│   └── blog/                    ← Your content files
│       ├── welcome.md
│       └── another-post.md
├── content.config.ts            ← Schema definitions
└── pages/
    └── blog/
        ├── index.astro          ← Listing page
        └── [...slug].astro      ← Individual post page
```

**How it works:**

1. **Schema** (`content.config.ts`) defines what fields your content must have
2. **Content files** (`.md` in `src/content/blog/`) contain your actual posts
3. **Pages** (`src/pages/blog/`) display the content

---

## Frontmatter Reference

Every post needs frontmatter (the metadata between `---` marks):

```md
---
title: 'How to Build a Website'
description: 'A step-by-step guide to modern web development.'
pubDate: 2024-06-15
author: 'Jane Smith'
tags: ['web', 'tutorial', 'beginners']
image: '/images/blog/web-dev.jpg'
updatedDate: 2024-07-20
draft: false
---
```

### Field Reference

| Field         | Required | Type     | Description                                      |
| ------------- | -------- | -------- | ------------------------------------------------ |
| `title`       | Yes      | string   | Post title (becomes the h1)                      |
| `description` | Yes      | string   | Summary for SEO and previews (150-160 chars)     |
| `pubDate`     | Yes      | date     | Publication date (YYYY-MM-DD)                    |
| `author`      | No       | string   | Author name (defaults to "Anonymous")            |
| `tags`        | No       | string[] | Array of tags for categorization                 |
| `image`       | No       | string   | Featured image path                              |
| `updatedDate` | No       | date     | Last updated date (shows "Updated" in post)      |
| `draft`       | No       | boolean  | Set `true` to hide from listings (default false) |

---

## Renaming the Collection

The starter uses "blog" but you can rename it to anything: guides, articles, news, docs, etc.

### Step 1: Rename the Content Folder

```bash
mv src/content/blog src/content/guides
```

### Step 2: Update the Schema

Edit `src/content.config.ts`:

```ts
// Before
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  // ...
});

export const collections = { blog };

// After
const guides = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/guides',
  }),
  // ...
});

export const collections = { guides };
```

### Step 3: Rename the Pages Folder

```bash
mv src/pages/blog src/pages/guides
```

### Step 4: Update Page Imports

In `src/pages/guides/index.astro` and `src/pages/guides/[...slug].astro`:

```ts
// Before
const posts = await getCollection('blog');

// After
const posts = await getCollection('guides');
```

Also update any links from `/blog/...` to `/guides/...`.

### Step 5: Run Dev Server

```bash
pnpm dev
```

Astro will regenerate types. Your content now lives at `/guides/`.

---

## Customizing the Schema

Add or remove fields to match your content needs.

### Adding a New Field

1. Edit `src/content.config.ts`:

```ts
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    // Existing fields
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Anonymous'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // New fields - add yours here
    category: z.enum(['tutorial', 'news', 'opinion']).optional(),
    readingTime: z.number().optional(), // minutes
    featured: z.boolean().default(false),
  }),
});
```

2. Use the new field in your templates:

```astro
---
// In [...slug].astro or index.astro
const { post } = Astro.props;
---

{post.data.featured && <Badge>Featured</Badge>}
{post.data.readingTime && <span>{post.data.readingTime} min read</span>}
```

### Schema Validation Types

Zod provides validation. Common patterns:

```ts
// Required string
title: z.string(),

// Optional string
subtitle: z.string().optional(),

// String with default
author: z.string().default('Anonymous'),

// Date (coerce converts strings to dates)
pubDate: z.coerce.date(),

// Array of strings
tags: z.array(z.string()).default([]),

// Boolean with default
draft: z.boolean().default(false),

// Enum (restricted values)
status: z.enum(['draft', 'review', 'published']),

// Number
readingTime: z.number().min(1).max(60),

// URL validation
externalLink: z.string().url().optional(),
```

---

## Creating Additional Collections

Your site might need multiple content types (blog + projects, or guides + docs).

### Example: Adding a Projects Collection

1. Create the folder: `src/content/projects/`

2. Add to `src/content.config.ts`:

```ts
const blog = defineCollection({
  // ... existing blog config
});

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    year: z.number(),
    image: z.string(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects };
```

3. Create content files in `src/content/projects/`:

```md
---
title: 'E-commerce Redesign'
description: 'Complete redesign of checkout flow'
client: 'Acme Corp'
year: 2024
image: '/images/projects/acme.jpg'
featured: true
technologies: ['React', 'Node.js', 'Stripe']
---

Project details here...
```

4. Create pages at `src/pages/projects/` following the blog pattern.

---

## Adding Images

### Option A: Public Folder (Simple)

Put images in `public/images/`:

```
public/
└── images/
    └── blog/
        └── my-image.jpg
```

Reference with absolute path:

```md
![Alt text](/images/blog/my-image.jpg)
```

Or in frontmatter:

```md
---
image: '/images/blog/my-image.jpg'
---
```

### Option B: Colocated Images (Organized)

Keep images with the post:

```
src/content/blog/
└── my-post/
    ├── index.md
    └── hero.jpg
```

Reference in frontmatter:

```md
---
image: ./hero.jpg
---
```

---

## Querying Content

### Get All Posts

```ts
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
```

### Filter Published Posts

```ts
const publishedPosts = (await getCollection('blog')).filter((post) => !post.data.draft);
```

### Sort by Date

```ts
const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

### Filter by Tag

```ts
const tutorialPosts = posts.filter((post) => post.data.tags?.includes('tutorial'));
```

### Get Recent Posts

```ts
const recentPosts = posts
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 5);
```

### Get a Single Post

```ts
import { getEntry } from 'astro:content';

const post = await getEntry('blog', 'welcome');
```

---

## Writing Tips

### Heading Structure

**Important:** The frontmatter `title` becomes the page's h1. Never include an h1 (`#`) in your markdown body.

```md
---
title: 'My Post Title' <!-- This becomes <h1> -->
---

## First Section <!-- Start with h2 -->

Content here...

### Subsection <!-- h3 for deeper levels -->
```

### SEO Best Practices

- **Title:** Clear and descriptive, under 60 characters
- **Description:** Summarize the content, 150-160 characters
- **Images:** Always include descriptive alt text

### Draft Posts

Set `draft: true` to work on a post without publishing:

```md
---
title: 'Work in Progress'
draft: true
---
```

Draft posts:

- Won't appear in listings (index page)
- Can still be accessed directly by URL during development
- Are excluded from production build

---

## Troubleshooting

### Types Not Updating

After changing the schema, restart the dev server:

```bash
# Stop with Ctrl+C, then:
pnpm dev
```

### Collection Not Found

Make sure:

1. The folder exists: `src/content/[collection-name]/`
2. The collection is exported in `content.config.ts`
3. The glob pattern matches your files

### Invalid Frontmatter

Zod validates your frontmatter. Common errors:

```
Error: "pubDate" is required
→ Add pubDate to your frontmatter

Error: Expected string, received number
→ Wrap values in quotes: title: "My Title"

Error: Invalid date
→ Use YYYY-MM-DD format: pubDate: 2024-01-15
```

---

## Next Steps

- [Deployment Checklist](deployment-checklist.md) — Go live with your content
- [Design Workflow](design-workflow.md) — Customize the look and feel
