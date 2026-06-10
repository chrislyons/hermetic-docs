const { getCollection } = await import('astro:content');
const entries = await getCollection('docs');
console.log('Entries:');
entries.forEach(e => console.log('  slug:', e.slug, '| path:', e.id));