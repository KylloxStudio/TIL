import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import markdown from './src/lib/vite-plugin-markdown.js';

export default defineConfig({
	plugins: [sveltekit(), markdown()]
});
