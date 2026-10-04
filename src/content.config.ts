import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.preprocess((val) => (typeof val === 'string' && val.trim() ? val : '無題'), z.string()),
    pubDate: z.preprocess((val) => {
      if (typeof val === 'string' || val instanceof Date) {
        const d = new Date(val);
        if (!isNaN(d.getTime())) return d;
      }
      return new Date();
    }, z.date()),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
