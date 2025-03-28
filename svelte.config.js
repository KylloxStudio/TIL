import adapter from '@sveltejs/adapter-auto';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';

export default defineConfig({
  kit: {
    adapter: adapter(),
  },
  extensions: ['.svelte', '.md'],
  preprocess: mdsvex({
    extension: '.md',
  }),
});
