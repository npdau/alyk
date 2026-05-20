---
name: Gallery dark mode toggle
overview: Add a local dark/light mode toggle above the project gallery that switches the gallery background between white and dark navy, styled like the reimg.io toggle with sun/moon icons.
todos:
  - id: build-toggle
    content: Add the reimg.io-style toggle button with sun/moon icons and client script to ProjectGallery.astro
    status: completed
  - id: bg-transition
    content: Add gallery wrapper with background transition between bg-background and bg-navy-900
    status: pending
isProject: false
---

# Gallery Dark Mode Toggle

## What we're building

A pill-shaped toggle switch positioned top-right above the gallery grid on each project page. Clicking it transitions the gallery section background between `bg-background` (white) and `bg-navy-900` (dark navy). This is local to the gallery only - no site-wide theme change.

## Design (matching reimg.io)

- Wider pill track than the existing `Switch` core component (~56px wide)
- White thumb circle slides left/right
- Sun icon visible on the track when in light mode, moon icon when in dark
- Light state: light gray track (`bg-stone-200`), dark icons
- Dark state: dark track (`bg-navy-800`), light icons
- Smooth transition on both the toggle and the gallery background

## Implementation

### 1. Modify `ProjectGallery.astro`

In [src/components/blocks/ProjectGallery.astro](src/components/blocks/ProjectGallery.astro):

- Wrap the gallery grid in a container div with a `data-gallery-theme` attribute
- Add transition classes for the background colour change (`transition-colors duration-500`)
- Add the toggle button (inline, not a separate component - this is a one-off, so it belongs right here or in `custom/`)
- Position the toggle top-right using `flex justify-end` above the grid
- Toggle includes inline SVG sun/moon icons

### 2. Toggle markup

- A `<button>` with the pill track, thumb, and two icon SVGs
- Sun and moon icons sit on opposite ends of the track
- Thumb slides via `translateX` on click
- `aria-label="Toggle gallery background"` for accessibility

### 3. Client-side script

- Click handler toggles `data-gallery-theme` between `light` and `dark`
- Swaps background class on the gallery wrapper (`bg-background` / `bg-navy-900`)
- Moves the thumb and swaps icon visibility
- No localStorage persistence needed (resets on page load - this is a casual toggle)

### 4. No changes to other files

The toggle is self-contained inside `ProjectGallery.astro`. All four project pages already import this block, so they all get the feature automatically.
