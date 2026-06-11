// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://hermetic.pages.dev',
	base: '/',
	vite: {
		cacheDir: false,
		build: {
			minify: false,
		},
	},
	integrations: [
		starlight({
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				PageTitle: './src/components/PageTitle.astro',
				Header: './src/components/Header.astro',
			},
			title: 'Hermetic',
			description: 'Import chat exports. Curate. Train LoRA. Personalize Hermes agents.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/chrislyons/hermetic' },
			],
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://hermetic.pages.dev/docs/og-image.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://hermetic.pages.dev/docs/og-image.png' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap' } },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Pipeline',
					autogenerate: { directory: 'pipeline' },
				},
				{
					label: 'Training',
					autogenerate: { directory: 'training' },
				},
				{
					label: 'Hermes Integration',
					autogenerate: { directory: 'hermes' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Architecture',
					autogenerate: { directory: 'arch' },
				},
			],
		}),
	],
});