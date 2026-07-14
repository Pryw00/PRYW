import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    category: z.enum(['Personal / Político', 'Gobierno', 'Arte y Galerías', 'Restaurantes y Pequeños Negocios']),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { projects, clients };
