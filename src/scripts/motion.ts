/* ============================================================
   Motion — GSAP + ScrollTrigger + Lenis.
   Declarative hooks (all optional, add to any element):
     data-split            split text into chars that rise in
     data-split="words"    same, by word
     .reveal               fade/slide up when scrolled into view
     data-scrub-words      words light up as you scroll past
     data-parallax="0.2"   vertical parallax (desktop only)
     data-count="23"       count up from 0
     data-typewriter       type the text out
     data-marquee          horizontal loop; reacts to scroll speed
     data-magnetic         pulls towards the pointer
     data-cursor="Ver"     custom cursor label on hover
   Re-initialised on every Astro page load (View Transitions).
   ============================================================ */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;
let cleanups: Array<() => void> = [];

/* -- Smooth scroll (created once, survives navigation) ------- */
function initLenis() {
  if (lenis || reduceMotion) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as any).__lenis = lenis;
}

/* -- Text splitting ------------------------------------------ */
function splitText(el: HTMLElement, mode: 'chars' | 'words') {
  if (el.dataset.splitDone) return el.querySelectorAll<HTMLElement>('.split-char');
  el.setAttribute('aria-label', el.textContent?.trim().replace(/\s+/g, ' ') ?? '');

  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? '').split(/(\s+)/).forEach((word) => {
          if (!word) return;
          if (/^\s+$/.test(word)) { frag.append(' '); return; }
          const w = document.createElement('span');
          w.className = 'split-word';
          w.setAttribute('aria-hidden', 'true');
          w.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;margin-bottom:-0.08em';
          const parts = mode === 'chars' ? [...word] : [word];
          parts.forEach((p) => {
            const c = document.createElement('span');
            c.className = 'split-char';
            c.textContent = p;
            w.append(c);
          });
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = '1';
  return el.querySelectorAll<HTMLElement>('.split-char');
}

/* -- Individual effects -------------------------------------- */
function splitReveals() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const chars = splitText(el, el.dataset.split === 'words' ? 'words' : 'chars');
    const inHero = el.closest('[data-hero]');
    gsap.from(chars, {
      yPercent: 110,
      rotate: el.dataset.split === 'words' ? 0 : 8,
      duration: 1.1,
      ease: 'expo.out',
      stagger: el.dataset.split === 'words' ? 0.05 : 0.025,
      delay: inHero ? 0.15 : 0,
      scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 88%' },
    });
  });
}

function reveals() {
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

function scrubWords() {
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    const words = splitText(el, 'words');
    gsap.fromTo(
      words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });
}

function parallax() {
  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || '0.15');
        gsap.fromTo(
          el,
          { yPercent: amount * 50 },
          {
            yPercent: -amount * 50,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    },
  });
}

function counters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = { v: 0 };
    const end = parseInt(el.dataset.count || '0', 10);
    gsap.to(target, {
      v: end,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(target.v)).padStart(2, '0'); },
    });
  });
}

function typewriters() {
  document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach((el) => {
    const text = el.textContent ?? '';
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const state = { n: 0 };
    gsap.to(state, {
      n: text.length,
      duration: text.length * 0.045,
      delay: parseFloat(el.dataset.typewriter || '0') || 0.9,
      ease: 'none',
      onUpdate: () => { el.textContent = text.slice(0, Math.round(state.n)); },
    });
  });
}

function marquees() {
  const tweens: gsap.core.Tween[] = [];
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    const reverse = track.dataset.marquee === 'reverse';
    const t = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: parseFloat(track.dataset.speed || '30'), ease: 'none', repeat: -1 },
    );
    tweens.push(t);
  });
  if (!tweens.length) return;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 6);
      tweens.forEach((t) => {
        gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(t, { timeScale: 1, duration: 1.2, delay: 0.2, ease: 'power2.out' });
      });
    },
  });
}

function magnetic() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
}

/* -- Custom cursor (element persists across navigations) ----- */
let cursorBound = false;
function cursor() {
  const el = document.getElementById('cursor');
  if (!el || !finePointer) return;
  const label = el.querySelector<HTMLElement>('.cursor-label')!;

  if (!cursorBound) {
    cursorBound = true;
    document.documentElement.classList.add('has-cursor');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); el.classList.add('is-visible'); });
    document.addEventListener('pointerleave', () => el.classList.remove('is-visible'));
    document.addEventListener('pointerover', (e) => {
      const target = (e.target as Element).closest<HTMLElement>('[data-cursor], a, button');
      if (target?.dataset.cursor) {
        label.textContent = target.dataset.cursor;
        el.classList.add('is-label');
        el.classList.remove('is-link');
      } else if (target) {
        el.classList.add('is-link');
        el.classList.remove('is-label');
      } else {
        el.classList.remove('is-link', 'is-label');
      }
    });
  }
  el.classList.remove('is-link', 'is-label');
}

/* -- Pause looping artwork while off-screen ------------------ */
let inviewObserver: IntersectionObserver | null = null;
function inview() {
  inviewObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle('is-inview', e.isIntersecting)),
    { rootMargin: '10% 0px' },
  );
  document.querySelectorAll('.art-host').forEach((el) => inviewObserver!.observe(el));
}

/* -- Lifecycle ----------------------------------------------- */
function init() {
  cursor();
  inview();
  if (reduceMotion) return;

  document.documentElement.classList.add('motion-ready');
  initLenis();
  lenis?.resize();

  ctx = gsap.context(() => {
    splitReveals();
    reveals();
    scrubWords();
    parallax();
    counters();
    typewriters();
    marquees();
  });
  magnetic();

  // Fonts change line metrics; recalc trigger positions once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

function destroy() {
  inviewObserver?.disconnect();
  ctx?.revert();
  ctx = null;
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
document.addEventListener('astro:after-swap', () => lenis?.scrollTo(0, { immediate: true }));

// Allow other scripts (e.g. the mobile menu) to pause smooth scrolling.
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop(); else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
