# Motion Framework Rule - Feedback & Suggested Edits

Feedback for the Astro Motion Framework rule built in Claude Desktop. Compiled after applying the rule to a real existing Astro project (ALYK) and identifying gaps.

The first three items are load-bearing additions. The rest are polish.

---

## 1. Add a pre-install audit step (highest priority)

The current rule jumps from "this framework exists" straight to "install GSAP." On any project that isn't greenfield, this is a recipe for double-animations. Add a Step 0 before the install instructions.

**Suggested addition:**

> **Step 0 - Audit existing motion before installing**
>
> Before scaffolding the framework, sweep the codebase for:
>
> 1. **CSS hover animations on cards/buttons** that overlap with Layer 2 patterns (e.g. `group-hover:scale-*`, `hover:translate-*`, `transition-transform duration-*` on cards). These will conflict with GSAP - flag for removal once `.service-card` / `.btn-primary` / etc. are applied.
> 2. **Orphaned `@theme` animation tokens** (e.g. `--animate-fade-in`, `--animate-slide-in-up`) and their `@keyframes`. If nothing references them, remove. Layer 1 reveals replace this category entirely.
> 3. **DIY `IntersectionObserver` scroll reveals**. Delete entirely - Layer 1 owns scroll-driven reveals globally.
> 4. **Existing animation libraries** (Motion One, AOS, Framer Motion, anime.js, etc.). Removing these is a precondition, not a parallel step.
>
> Report findings before making changes. The cleanup happens as its own commit before installing GSAP.

---

## 2. Add an explicit "what NOT to touch" list

The rule talks about decorative motion but never says functional UI state transitions are out of scope. An agent doing a cleanup sweep can easily rip out essential micro-interactions thinking it's "consolidating animation."

**Suggested addition:**

> **Functional UI state - leave alone**
>
> The framework governs **decorative motion** (reveals, hover lifts, hero moments). It does **not** govern functional UI state feedback. Do not migrate or remove:
>
> - `transition-colors`, `transition-opacity`, `transition-shadow` for hover/focus/active states
> - Focus ring transitions (accessibility)
> - Accordion / disclosure expand-collapse
> - Modal / dialog / dropdown / popover open-close
> - Switch / toggle / checkbox state
> - Hamburger menu line-to-X transforms
> - Mobile menu staggered item reveals (bespoke component state)
> - Tiny indicator nudges (e.g. arrow `translate-x-0.5` on hover, chevron rotate on expand)
>
> Rule of thumb: state feedback = keep, decorative = migrate.

---

## 3. Mandate "blanket pass first, iterate after"

The rule lists where `.reveal` applies but doesn't sequence the work. Without explicit ordering, an agent will piecemeal it block-by-block over multiple turns, which produces inconsistent results.

**Suggested addition:**

> **Order of operations when introducing the framework**
>
> 1. Audit (Step 0)
> 2. Install GSAP, scaffold `motion.js` and `motion.css`, wire into `BaseLayout` and `globals.css`
> 3. **Layer 1 blanket pass** - apply `.reveal` to every eligible block in a single change. Consistency is the point: if some blocks fade in and others don't, the site looks broken. Eligible = page section blocks (hero, intro, services, projects, testimonials, CTA, FAQ, content, etc.). Skip nav, footer, internals of revealing cards.
> 4. **Layer 2 patterns** - apply per-component, one at a time, with the user. Remove conflicting CSS hover classes as you go.
> 5. **Layer 3 hero moments** - last, only when explicitly requested.
>
> Don't compress steps 3 and 4 into one chat. Ship the blanket reveal first; iterate on hover patterns separately.

---

## 4. Per-block application rubric

The current "apply to: sections, headings, body paragraphs..." list is fine but vague. A concrete rubric makes the blanket pass deterministic.

**Suggested addition:**

> **Per-block application rubric**
>
> - **Hero / intro blocks**: heading + sub + CTA, each with incremental `reveal-delay-*` for cascade
> - **Single-section content blocks**: apply `.reveal` to the section root - one fade-up per block is enough
> - **Grid / card blocks**: apply `.reveal` to each card, not the grid container - GSAP's `ScrollTrigger.batch()` will stagger them automatically
> - **Image + text blocks**: image and text get separate `.reveal` so they fade independently
> - **Quote / stat / testimonial blocks**: apply to the quote / stat element directly

---

## 5. Reuse the project's existing easing tokens

Most polished projects already have a signature easing curve. Defaulting GSAP eases to `power3.out` ignores it and creates a tonal mismatch between decorative motion and UI state feedback.

**Suggested addition:**

> **Easing consistency**
>
> Before defining GSAP eases, check the project's existing CSS for shared easing curves (often a custom `cubic-bezier` used across UI transitions). Mirror that curve in `motion.js` via `CustomEase` so decorative motion feels of-a-piece with UI state transitions. Default `power3.out` is fine only when no existing convention exists.

---

## 6. Pin a GSAP version note

One line is enough.

**Suggested addition:**

> Install GSAP 3.13+ (the version where Webflow's free-for-all licensing applies to all premium plugins).

---

## 7. Soften the "no React" scope

The current "no `client:*` React islands in pages" is binary and excludes real projects that have one or two islands.

**Suggested rewording:**

> Applies to Astro projects where the **bulk** of pages are `.astro` components. Occasional React islands (forms, complex widgets) are fine - just don't animate them with this framework; let them own their own motion.

---

## 8. Address Astro View Transitions

Projects using `<ViewTransitions />` need GSAP and ScrollTrigger to re-init on `astro:page-load`, otherwise reveals stop firing after the first navigation.

**Suggested addition:**

> **Astro View Transitions**
>
> If the project uses `<ViewTransitions />` from `astro:transitions`, GSAP must re-initialise on `astro:page-load` (not just `DOMContentLoaded`). Wrap init in:
>
> ```js
> document.addEventListener('astro:page-load', initMotion);
> ```
>
> Kill old `ScrollTrigger` instances in `astro:before-swap` to prevent leaks:
>
> ```js
> document.addEventListener('astro:before-swap', () => {
>   ScrollTrigger.getAll().forEach((t) => t.kill());
> });
> ```

---

## 9. Promote the logo intro sessionStorage trick

Currently buried in the reference doc. Without it, the logo entrance replays on every page navigation - a real footgun. Move that one line up to the main rule's pattern library.

**Suggested addition (to main rule, Layer 2 patterns):**

> `.logo-intro` - first-load entrance with `back.out` ease. **Always store a flag in `sessionStorage`** so it doesn't replay on every page navigation within a session.

---

## 10. Provide the canonical first-use prompt

Both rule files describe the workflow but neither contains an exact paste-ready prompt for a fresh project.

**Suggested addition (in reference doc):**

> **Canonical first-use prompt** (paste after referencing `@astro-motion-framework-reference.mdc`):
>
> _"Audit existing motion in this project per Step 0. Report findings, then in one pass: clean up conflicts, install GSAP, scaffold motion.js and motion.css, wire into BaseLayout and globals.css, and apply `.reveal` to every eligible block (Layer 1 blanket pass). Stop before any Layer 2 hover patterns - we'll do those one at a time."_

---

## Summary of why these matter

The first three items prevent specific failure modes I observed when applying the rule to ALYK:

- **Item 1** caught two `group-hover:scale-[1.03]` Tailwind classes on card images that would have run alongside the equivalent GSAP `.service-card` pattern, plus five orphaned `@theme` animation tokens that nothing referenced.
- **Item 2** prevents an over-zealous agent from removing essential UI state (focus rings, hamburger transforms, accordion expand) thinking it's part of the cleanup.
- **Item 3** prevents the "some blocks fade in, others don't" problem where motion feels half-finished.

Items 4-10 are quality-of-life additions that make the rule more deterministic and project-aware.
