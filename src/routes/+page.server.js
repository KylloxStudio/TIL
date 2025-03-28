export async function load() {
  const dataModule = await import('/src/contents/data/posts.json');
  const postModules = import.meta.glob('/src/contents/**/README.md', { eager: true, as: 'raw' });

  const posts = dataModule.default.map(item => {
    const slug = item.path;
    const mdPath = `/src/contents/${slug}/README.md`;
    const content = postModules[mdPath]?.default || '';

    return {
      slug,
      metadata: item,
      content
    };
  });

  return { posts };
}