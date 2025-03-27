export async function load() {
  const postModules = import.meta.glob('/src/contents/**/README.md', { eager: true });
  const dataModule = await import('/src/contents/data/posts.json');

  const posts = Object.entries(postModules).map(([path, mod]) => {
    const content = mod.default;
    const slug = path.split('/').slice(-3, -1)[0] + '/' + path.split('/').slice(-3, -1)[1];
    const metadata = dataModule.default.find(item => item.path == slug);

    return {
      slug,
      metadata,
      content
    };
  });

  return { posts };
}