export async function load() {
  const files = import.meta.glob("/src/contents/*.md");

  const posts = Object.keys(files).map((path) => {
    const slug = path.split("/").pop().replace(".md", "");
    return { slug };
  });

  return { posts };
}