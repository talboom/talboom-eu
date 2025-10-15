import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    fullDescription: z.string().optional(),
    date: z.date(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

export const collections = { blog };