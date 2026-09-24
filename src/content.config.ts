import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blockColor = z.enum(['orange', 'lime', 'blue', 'yellow', 'pink', 'purple', 'cyan', 'red', 'cream']);

// 'archived' = no longer online; kept as a historical record.
// Projects may add archiveUrl (e.g. a Wayback Machine snapshot) for their detail page.
const status = z.enum(['live', 'archived']).default('live');

// featured: 1, 2, 3… → shown on the home page, in that order
const featured = z.number().int().positive().optional();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    images: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    category: z.enum(['Personal / Político', 'Gobierno', 'Arte y Galerías', 'Restaurantes y Pequeños Negocios']),
    thumbnail: z.string().optional(),
    color: blockColor.optional(),
    // Archived client sites are never linked; their screenshot opens in the lightbox instead
    status,
    featured,
  }),
});

export const collections = { projects, clients };
