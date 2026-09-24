import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

const byFeatured = <T extends { featured?: number }>(a: T, b: T) => a.featured! - b.featured!;

/** Projects for one language, sorted, with a language-free slug. */
export async function getProjects(lang: Lang) {
  const all = await getCollection('projects');
  const slugOf = (id: string) => id.split('/').slice(1).join('/');

  return all
    .filter(({ id }) => id.startsWith(`${lang}/`))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const slug = slugOf(entry.id);
      // featured / liveUrl / links / images only need to be written in one language's file;
      // the other language inherits them when its own value is empty.
      const twin = all.find((e) => e !== entry && slugOf(e.id) === slug)?.data;
      const data = {
        ...entry.data,
        featured: entry.data.featured ?? twin?.featured,
        liveUrl: entry.data.liveUrl || twin?.liveUrl || undefined,
        links: entry.data.links.length ? entry.data.links : (twin?.links ?? []),
        images: entry.data.images.length ? entry.data.images : (twin?.images ?? []),
      };
      return { ...entry, data, slug, featured: data.featured };
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
