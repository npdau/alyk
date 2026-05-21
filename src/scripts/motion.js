/* global window, document */

/**
 * Motion - GSAP-driven decorative animations
 *
 * Layer 1: Base reveals via `.reveal` class (and direction/delay variants).
 * Layer 2: Component-pattern hover/idle interactions (added incrementally).
 * Layer 3: Hero moments (added per instance).
 *
 * Loaded once globally from BaseLayout.astro. All animations respect
 * prefers-reduced-motion and skip wholesale when reduced motion is set.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Mirror the project's signature easing curve so decorative motion
// feels of-a-piece with UI-state transitions across the site.
CustomEase.create('alyk', '0.22, 0.61, 0.36, 1');

const REVEAL_DURATION = 0.8;
const REVEAL_DISTANCE = 24;
const REVEAL_STAGGER = 0.1;
const REVEAL_DELAY_STEP = 0.15;

function initReveals() {
  const reveals = gsap.utils.toArray('.reveal');
  if (!reveals.length) return;

  ScrollTrigger.batch(reveals, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const delayClass = Array.from(el.classList).find((c) => c.startsWith('reveal-delay-'));
        const delayStep = delayClass ? Number(delayClass.replace('reveal-delay-', '')) : 0;

        let from = { opacity: 0, y: REVEAL_DISTANCE };
        if (el.classList.contains('reveal-left')) {
          from = { opacity: 0, x: -REVEAL_DISTANCE, y: 0 };
        } else if (el.classList.contains('reveal-right')) {
          from = { opacity: 0, x: REVEAL_DISTANCE, y: 0 };
        } else if (el.classList.contains('reveal-scale')) {
          from = { opacity: 0, scale: 0.95, y: 0 };
        }

        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: REVEAL_DURATION,
          ease: 'alyk',
          delay: delayStep * REVEAL_DELAY_STEP,
        });
      });
    },
    batchMax: 6,
    interval: REVEAL_STAGGER,
  });
}

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  initReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
