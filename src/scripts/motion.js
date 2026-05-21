/* global window, document, Node */

/**
 * Motion - GSAP-driven decorative animations
 *
 * Layer 1: Base reveals via `.reveal` class (and direction variants).
 *          Items batched together cascade automatically by DOM order
 *          (left-to-right within rows, top-to-bottom across blocks).
 * Layer 2: Component-pattern hover/idle interactions (added incrementally).
 * Layer 3: Hero moments (added per instance).
 *
 * Plus: page-load fade-in on `.hero-image` so hero banners ease in
 * cleanly on every navigation rather than snapping into place.
 *
 * Loaded once globally from BaseLayout.astro. All decorative animations
 * respect prefers-reduced-motion and skip wholesale when it's set.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Mirror the project's signature easing curve so decorative motion
// feels of-a-piece with UI-state transitions across the site.
CustomEase.create('alyk', '0.22, 0.61, 0.36, 1');

const REVEAL_DURATION = 1.1;
const REVEAL_DISTANCE = 32;
const REVEAL_STAGGER = 0.13;
const HERO_FADE_DURATION = 0.9;

function fromStateFor(el) {
  if (el.classList.contains('reveal-left')) {
    return { opacity: 0, x: -REVEAL_DISTANCE, y: 0, scale: 1 };
  }
  if (el.classList.contains('reveal-right')) {
    return { opacity: 0, x: REVEAL_DISTANCE, y: 0, scale: 1 };
  }
  if (el.classList.contains('reveal-scale')) {
    return { opacity: 0, x: 0, y: 0, scale: 0.95 };
  }
  return { opacity: 0, x: 0, y: REVEAL_DISTANCE, scale: 1 };
}

function sortByDomOrder(elements) {
  return [...elements].sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
}

function animateReveals(elements) {
  if (!elements.length) return;

  const ordered = sortByDomOrder(elements);

  // Force the from state so HMR re-runs and refresh-mid-scroll cases
  // both start from a known position regardless of any prior inline
  // styles GSAP may have set on a previous run.
  ordered.forEach((el) => gsap.set(el, fromStateFor(el)));

  // Single tween with GSAP's native stagger - applies in array order
  // (DOM order after the sort), so cards cascade top-to-bottom and
  // left-to-right deterministically.
  gsap.to(ordered, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: REVEAL_DURATION,
    ease: 'alyk',
    stagger: REVEAL_STAGGER,
    // Only clear the perf hint - keep the inline transform so the
    // final translate(0,0) keeps overriding the CSS .reveal rule.
    clearProps: 'willChange',
  });
}

function isInTriggerZone(el) {
  // Element has crossed the `top 88%` line when its top is above
  // 88% of the viewport height (i.e. visible or already past upward).
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.88;
}

function initReveals() {
  const reveals = gsap.utils.toArray('.reveal');
  if (!reveals.length) return;

  // Set every reveal to its from state up-front so the first paint is
  // deterministic and there's no chance of a flash before GSAP attaches.
  reveals.forEach((el) => gsap.set(el, fromStateFor(el)));

  // Split into elements already past the trigger at init (above-the-fold
  // hero content, project info on short heroes, refresh-mid-scroll
  // sections) versus elements that will enter as the user scrolls.
  // ScrollTrigger.batch doesn't reliably batch already-past-trigger
  // elements together at init, so we animate them ourselves with a
  // single sorted cascade and only register the remainder with
  // ScrollTrigger.
  const alreadyVisible = reveals.filter(isInTriggerZone);
  const willScrollIn = reveals.filter((el) => !alreadyVisible.includes(el));

  if (alreadyVisible.length) {
    animateReveals(alreadyVisible);
  }

  if (willScrollIn.length) {
    ScrollTrigger.batch(willScrollIn, {
      start: 'top 88%',
      once: true,
      onEnter: animateReveals,
      batchMax: 12,
    });
  }
}

function initHeroImage() {
  const heroImages = gsap.utils.toArray('.hero-image');
  if (!heroImages.length) return;

  heroImages.forEach((el) => {
    const reveal = () => {
      gsap.to(el, {
        opacity: 1,
        duration: HERO_FADE_DURATION,
        ease: 'alyk',
      });
    };

    // Image element vs. wrapper - handle both.
    const target = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (target && !target.complete) {
      target.addEventListener('load', reveal, { once: true });
    } else {
      reveal();
    }
  });
}

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  initReveals();
  initHeroImage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
