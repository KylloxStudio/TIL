import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { defineConfig } from 'vite';

export default defineConfig({
  kit: {
    adapter: adapter(),
  },
  extensions: ['.svelte', '.md'], // .md 파일도 Svelte 컴포넌트처럼 사용
  preprocess: mdsvex({
    extension: '.md',
  }),
});
