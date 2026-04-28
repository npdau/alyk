# Deployment Checklist

This guide walks you through deploying your site to Netlify and ensuring everything is production-ready.

## Pre-Deployment Checklist

### Content & SEO

- [ ] **Every page has a unique title** (under 60 characters)
- [ ] **Every page has a meta description** (150-160 characters)
- [ ] **All images have alt text**
- [ ] **OG image exists** at `public/og-image.png` (1200x630px)
- [ ] **Favicon updated** at `public/favicon.svg`
- [ ] **Site URL configured** in `astro.config.mjs`

### Configuration

- [ ] **Site name updated** in `src/components/seo/SEO.astro`
- [ ] **Navigation links correct** in TopNav
- [ ] **Footer links correct** (social, legal pages)
- [ ] **Contact form action set** (if using ContactForm block)
- [ ] **Analytics code added** (if using)

### Quality Checks

- [ ] **Build passes:** Run `pnpm build` with no errors
- [ ] **Preview looks correct:** Run `pnpm preview` and check the site
- [ ] **Mobile responsive:** Test at 375px width
- [ ] **Links work:** Click through all navigation and buttons
- [ ] **Forms work:** Test contact form submission
- [ ] **No placeholder content:** Search for "Lorem", "Your", "Example"

## Building for Production

```bash
# Check for TypeScript errors
pnpm check

# Build the site
pnpm build

# Preview the built site locally
pnpm preview
```

The built site is in the `dist/` folder.

## Deploying to Netlify

### Option A: Connect Git Repository (Recommended)

1. Push your code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your Git provider and select your repository
5. Configure build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
   - **Node version:** 18 or higher
6. Click **"Deploy site"**

Netlify will now automatically deploy when you push to your main branch.

### Environment Variables (If Needed)

If your site uses environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add your variables
3. Redeploy the site

## Netlify Configuration

Create `netlify.toml` in your project root for advanced settings:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

# Redirects (if needed)
[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301

# Custom headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

## Custom Domain Setup

### Adding Your Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `yourbusiness.com`)
4. Follow the DNS configuration instructions

### DNS Configuration

At your domain registrar, add these records:

**For apex domain (yourbusiness.com):**

```
Type: A
Host: @
Value: 75.2.60.5
```

**For www subdomain:**

```
Type: CNAME
Host: www
Value: your-site-name.netlify.app
```

### HTTPS

Netlify automatically provisions an SSL certificate. It may take a few minutes after DNS propagates.

## Post-Deployment Checks

### Immediately After Deploy

- [ ] Site loads at your custom domain
- [ ] HTTPS is working (padlock icon)
- [ ] Homepage looks correct
- [ ] Navigation works
- [ ] Forms submit correctly

### SEO Verification

- [ ] Check [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap: `https://yourdomain.com/sitemap-index.xml`
- [ ] Test social sharing at [opengraph.xyz](https://www.opengraph.xyz/)

### Performance Check

Run [PageSpeed Insights](https://pagespeed.web.dev/) on your live site.

**Target scores:**

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Common Issues

### Build Fails

**Check the Netlify build log for errors.** Common causes:

- Missing dependencies: Ensure `pnpm-lock.yaml` is committed
- TypeScript errors: Run `pnpm check` locally first
- Node version mismatch: Set `NODE_VERSION` in netlify.toml

### Images Not Loading

- Check paths start with `/` (e.g., `/images/hero.jpg`)
- Ensure images are in `public/` folder
- Check file names match exactly (case-sensitive)

### 404 on Page Refresh

If using client-side routing (rare in Astro), add a redirect rule:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Slow Initial Load

- Check image sizes (compress large images)
- Ensure no unnecessary JavaScript
- Check for render-blocking resources

## Form Handling

### Netlify Forms (Simple)

Add `netlify` attribute to your form:

```html
<form name="contact" method="POST" netlify>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

Submissions appear in Netlify dashboard under **Forms**.

### External Form Services

For more control, use services like:

- [Formspree](https://formspree.io)
- [Basin](https://usebasin.com)
- [Getform](https://getform.io)

Update the form `action` attribute:

```html
<form action="https://formspree.io/f/your-id" method="POST"></form>
```

## Going Live Checklist

### Final Pre-Launch

- [ ] All placeholder content replaced
- [ ] Legal pages exist (Privacy Policy, Terms)
- [ ] Contact information correct
- [ ] Business hours/location correct (if applicable)
- [ ] Social media links working

### DNS & Domain

- [ ] Domain purchased and verified
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] www redirects to non-www (or vice versa)

### Analytics & Tracking

- [ ] Google Analytics installed (if using)
- [ ] Google Search Console verified
- [ ] Sitemap submitted

### Backups

- [ ] Code pushed to Git repository
- [ ] Important assets backed up

## Maintenance

### Regular Tasks

- Update dependencies monthly: `pnpm update`
- Check for broken links periodically
- Review analytics for issues
- Update content as needed

### Monitoring

Netlify provides:

- Deploy notifications (email, Slack)
- Form submission notifications
- Build status badges

## Need Help?

- [Netlify Docs](https://docs.netlify.com)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Astro Discord](https://astro.build/chat)
