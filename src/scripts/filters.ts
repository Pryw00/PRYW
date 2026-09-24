/* Filter chips: <div data-filters="projects"> <button data-filter="Web"> …
   Items: any element inside [data-filter-scope="projects"] with a data-<key> attribute,
   where <key> is given by data-filter-key on the filters container
   (a single button can override it with its own data-filter-key). */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filters]').forEach((group) => {
    const scope = document.querySelector<HTMLElement>(`[data-filter-scope="${group.dataset.filters}"]`);
    const key = group.dataset.filterKey ?? 'kind';
    if (!scope) return;
    const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const items = scope.querySelectorAll<HTMLElement>(`[data-${key}]`);
    const camel = (k: string) => k.replace(/-(\w)/g, (_, c) => c.toUpperCase());

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.filter!;
        const k = camel(btn.dataset.filterKey ?? key);
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

        const shown: HTMLElement[] = [];
        items.forEach((item) => {
          const match = value === '*' || item.dataset[k] === value;
          item.hidden = !match;
          if (match) shown.push(item);
        });

        // Hide empty category sections, if any
        scope.querySelectorAll<HTMLElement>('[data-filter-section]').forEach((sec) => {
          sec.hidden = !sec.querySelector(`[data-${key}]:not([hidden])`);
        });

        gsap.fromTo(shown, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.04, overwrite: true });
        ScrollTrigger.refresh();
      });
    });
  });
}

document.addEventListener('astro:page-load', initFilters);
