import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * Content Collections (Astro 5 Content Layer API)
 *
 * Define your content schemas here. Collections can load from:
 * - Local files (glob loader)
 * - CMSs, APIs, databases (custom loaders)
 *
 * Usage:
 * 1. Create markdown files in src/content/guides/
 * 2. Run `pnpm dev` to generate types
 * 3. Query with getCollection('guides') or getEntry('guides', 'slug')
 *
 * Frontmatter example:
 * ---
 * title: "My Guide Title"
 * description: "A brief description for SEO"
 * pubDate: 2024-01-15
 * author: "Your Name"
 * tags: ["astro", "tutorial"]
 * image: "/images/guides/my-guide.jpg"
 * draft: true
 * ---
 */

const guides = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/guides',
  }),
  schema: z.object({
    // Required
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),

    // Optional
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Anonymous'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
