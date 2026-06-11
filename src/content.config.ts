import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';

const docs = defineCollection({
	loader: docsLoader(),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

export const collections = { docs };