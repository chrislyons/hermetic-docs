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
						{ label: 'Introduction', slug: 'getting-started.md' },
						{ label: 'Installation', slug: 'getting-started/install.md' },
						{ label: 'Quick Start', slug: 'getting-started/quickstart.md' },
					],
				},
				{
					label: 'Pipeline',
					items: [
						{ label: 'Overview', slug: 'pipeline.md' },
						{ label: 'Import', slug: 'pipeline/import.md' },
						{ label: 'Curation', slug: 'pipeline/curate.md' },
						{ label: 'Format', slug: 'pipeline/format.md' },
					],
				},
				{
					label: 'Training',
					items: [
						{ label: 'Overview', slug: 'training.md' },
						{ label: 'MLX LoRA', slug: 'training/mlx.md' },
						{ label: 'Cloud Backends', slug: 'training/cloud.md' },
					],
				},
				{
					label: 'Hermes Integration',
					items: [
						{ label: 'Overview', slug: 'hermes.md' },
						{ label: 'Plugin', slug: 'hermes/plugin.md' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Overview', slug: 'reference.md' },
						{ label: 'Config Schema', slug: 'reference/config.md' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'arch.md' },
						{ label: 'System Overview', slug: 'arch/overview.md' },
					],
				},
			],
		}),
	],
});