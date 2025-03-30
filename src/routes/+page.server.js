export async function load() {
  const dataModule = await import('/src/contents/data/posts.json');
  const postModules = import.meta.glob('/src/contents/**/README.md', { eager: true, as: 'raw' });

  const posts = dataModule.default.map(item => {
    const postId = item.path;
    const mdPath = `/src/contents/${postId}/README.md`;
    const content = postModules[mdPath]?.default || '';

    return {
      postId,
      metadata: item,
      content
    };
  });

  return { posts };
}