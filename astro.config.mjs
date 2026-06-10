// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://hermetic.pages.dev',
	base: '/docs',
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
						{ label: 'Introduction', link: '/docs/' },
						{ label: 'Installation', link: '/docs/getting-started/install/' },
						{ label: 'Quick Start', link: '/docs/getting-started/quickstart/' },
					],
				},
				{
					label: 'Pipeline',
					items: [
						{ label: 'Overview', link: '/docs/pipeline/' },
						{ label: 'Import', link: '/docs/pipeline/import/' },
						{ label: 'Curation', link: '/docs/pipeline/curate/' },
						{ label: 'Format', link: '/docs/pipeline/format/' },
					],
				},
				{
					label: 'Training',
					items: [
						{ label: 'Overview', link: '/docs/training/' },
						{ label: 'MLX LoRA', link: '/docs/training/mlx/' },
						{ label: 'Cloud Backends', link: '/docs/training/cloud/' },
					],
				},
				{
					label: 'Hermes Integration',
					items: [
						{ label: 'Overview', link: '/docs/hermes/' },
						{ label: 'Plugin', link: '/docs/hermes/plugin/' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Overview', link: '/docs/reference/' },
						{ label: 'Config Schema', link: '/docs/reference/config/' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', link: '/docs/arch/' },
						{ label: 'System Overview', link: '/docs/arch/overview/' },
					],
				},
			],
		}),
	],
});