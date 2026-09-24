import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blockColor = z.enum(['orange', 'lime', 'blue', 'yellow', 'pink', 'purple', 'cyan', 'red', 'cream']);

// 'archived' = no longer online; kept as a historical record.
// Projects may add archiveUrl (e.g. a Wayback Machine snapshot) for their detail page.
const status = z.enum(['live', 'archived']).default('live');

// Gallery image: a path in public/ ("/images/…") or { src, caption }
const galleryImage = z.union([z.string(), z.object({ src: z.string(), caption: z.string().optional() })]);

// featured: 1, 2, 3… → shown on the home page, in that order
const featured = z.number().int().positive().optional();

const projects = defineCollection({
  // README.md in each folder documents the fields; it is not content
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/README.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    // Project gallery (detail page mosaic + lightbox)
    images: z.array(galleryImage).default([]),
    // Main "visit" link (live site, app store…) — shown in the hero and the sidebar
    liveUrl: z.string().optional(),
    // Extra links with their own label, e.g. { label: "Demo", url: "https://…" }
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    order: z.number(),
    credit: z.string().default('Diseño y desarrollo web por Wilson Yépez / @Pryw00'),
    color: blockColor.default('purple'),
    art: z.enum(['pixel', 'bars', 'shield', 'waves', 'dots']).default('dots'),
    year: z.string(),
    kind: z.enum(['web', 'game', 'app']),
    stack: z.array(z.string()).default([]),
    size: z.enum(['sm', 'tall', 'wide']).default('sm'),
    status,
    featured,
    archiveUrl: z.string().url().optional(),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    category: z.enum(['Personal / Político', 'Gobierno', 'Arte y Galerías', 'Restaurantes y Pequeños Negocios']),
    thumbnail: z.string().optional(),
    color: blockColor.optional(),
    // Archived client sites are never linked; their screenshot + gallery open in the lightbox instead
    status,
    gallery: z.array(galleryImage).default([]),
    featured,
  }),
});

export const collections = { projects, clients };
