---
title: 'Welcome to Your New Site'
description: 'This is a sample blog post to help you get started with your new Astro site.'
pubDate: 2024-01-15
author: 'Your Name'
tags: ['getting-started', 'astro']
draft: false
---

This is a sample blog post to demonstrate the content collection feature. The title above becomes the h1, so start your content with h2 (##) or below.

## Getting Started

You can edit this post by modifying `src/content/blog/welcome.md`. The frontmatter at the top of this file defines the post's metadata.

### Key Features

- **Content Collections**: Type-safe content with Zod schema validation
- **Markdown Support**: Write your content in markdown with full MDX support available
- **Automatic Dates**: Date parsing is handled automatically

## Code Example

Here's a code example:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## Next Steps

1. Edit this post or delete it
2. Create your own posts in `src/content/blog/`
3. Build your blog pages to render this content

Happy building!
