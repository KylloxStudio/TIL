export async function load({ params }) {
  const dataModule = await import('/src/contents/data/posts.json');

  const post = dataModule.default.filter(post => post.path == 'TIL/' + params.postId)[0];
  const title = post.title;

  return { title };
}