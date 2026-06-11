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
					items: [
						{ label: 'Introduction', slug: 'getting-started/index' },
						{ label: 'Installation', slug: 'getting-started/install' },
						{ label: 'Quick Start', slug: 'getting-started/quickstart' },
					],
				},
				{
					label: 'Pipeline',
					items: [
						{ label: 'Overview', slug: 'pipeline' },
						{ label: 'Import', slug: 'pipeline/import' },
						{ label: 'Curation', slug: 'pipeline/curate' },
						{ label: 'Format', slug: 'pipeline/format' },
					],
				},
				{
					label: 'Training',
					items: [
						{ label: 'Overview', slug: 'training' },
						{ label: 'MLX LoRA', slug: 'training/mlx' },
						{ label: 'Cloud Backends', slug: 'training/cloud' },
					],
				},
				{
					label: 'Hermes Integration',
					items: [
						{ label: 'Overview', slug: 'hermes' },
						{ label: 'Plugin', slug: 'hermes/plugin' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Overview', slug: 'reference' },
						{ label: 'Config Schema', slug: 'reference/config' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'arch' },
						{ label: 'System Overview', slug: 'arch/overview' },
					],
				},
			],
		}),
	],
});