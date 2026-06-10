#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const pages = [
	{ dir: 'getting-started', files: ['index', 'install', 'quickstart'] },
	{ dir: 'pipeline', files: ['index', 'import', 'curate', 'format'] },
	{ dir: 'training', files: ['index', 'mlx', 'cloud'] },
	{ dir: 'hermes', files: ['index', 'plugin'] },
	{ dir: 'reference', files: ['index', 'config'] },
	{ dir: 'arch', files: ['index', 'overview'] },
];

const template = (id, dir, file) => `---
import StarlightPage from '@astrojs/starlight/components/StarlightPage.astro';
import { getCollection } from 'astro:content';

const entries = await getCollection('docs');
const entry = entries.find(e => e.id === '${id}');

const { Content } = await entry.render();

// Pass frontmatter as expected by StarlightPage
const frontmatter = {
	title: entry.data.title,
	description: entry.data.description,
};
---

<StarlightPage frontmatter={frontmatter}>
	{Content}
</StarlightPage>
`;

pages.forEach(({ dir, files }) => {
	files.forEach(file => {
		const id = file === 'index' ? `${dir}.md` : `${dir}/${file}.md`;
		const filePath = `/Users/chrislyons/dev/hermetic-docs/src/pages/docs/${dir}/${file}.astro`;
		fs.writeFileSync(filePath, template(id, dir, file));
		console.log(`Created: ${filePath} (id: ${id})`);
	});
});

console.log('All pages created!');