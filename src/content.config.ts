import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections (Astro 5 Content Layer API)
 *
 * Define your content schemas here. Collections can load from:
 * - Local files (glob loader)
 * - CMSs, APIs, databases (custom loaders)
 *
 * Usage:
 * 1. Create markdown files in src/content/blog/
 * 2. Run `pnpm dev` to generate types
 * 3. Query with getCollection('blog') or getEntry('blog', 'slug')
 *
 * Frontmatter example:
 * ---
 * title: "My Post Title"
 * description: "A brief description for SEO"
 * pubDate: 2024-01-15
 * author: "Your Name"
 * tags: ["astro", "tutorial"]
 * image: "/images/blog/my-post.jpg"
 * draft: true
 * ---
 */

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
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

export const collections = { blog };
