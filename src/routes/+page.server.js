import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function load() {
  const dir = path.resolve('src/contents');
  const files = fs.readdirSync(dir);
  
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        title: data.title,
        category: data.category,
        desc: data.desc,
        lastModified: data.lastModified,
        slug: file.replace('.md', ''),
      };
    });

  return {
    posts,
  };
}