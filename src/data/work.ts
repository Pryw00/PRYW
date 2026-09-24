import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

const byFeatured = <T extends { featured?: number }>(a: T, b: T) => a.featured! - b.featured!;

/** Projects for one language, sorted, with a language-free slug. */
export async function getProjects(lang: Lang) {
  const all = await getCollection('projects');
  // `featured` only needs to be set in one language's file; the other inherits it
  const featuredBySlug = new Map<string, number>();
  for (const e of all) {
    const slug = e.id.split('/').slice(1).join('/');
    if (e.data.featured && (e.id.startsWith(`${lang}/`) || !featuredBySlug.has(slug))) featuredBySlug.set(slug, e.data.featured);
  }
  return all
    .filter(({ id }) => id.startsWith(`${lang}/`))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const slug = entry.id.slice(lang.length + 1);
      return { ...entry, slug, featured: featuredBySlug.get(slug) };
    });
}

/** Home page selection: projects marked `featured`, in that order (all projects if none are marked). */
export async function getFeaturedProjects(lang: Lang) {
  const projects = await getProjects(lang);
  const featured = projects.filter((p) => p.featured).sort(byFeatured);
  return featured.length ? featured : projects;
}

export async function getClients() {
  const entries = await getCollection('clients');
  // Live sites with screenshots first, archived ones last
  const rank = (c: (typeof entries)[number]['data']) => (c.status === 'archived' ? 2 : c.thumbnail ? 0 : 1);
  return entries
    .map((e) => ({ ...e.data, slug: e.id }))
    .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

/** Home page selection: clients marked `featured`, in that order (else the first 6 live sites with a screenshot). */
export async function getFeaturedClients() {
  const clients = await getClients();
  const featured = clients.filter((c) => c.featured).sort(byFeatured);
  return featured.length ? featured : clients.filter((c) => c.status !== 'archived' && c.thumbnail).slice(0, 6);
}
