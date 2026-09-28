import { defineConfig } from 'vite';
import { pagesBase } from './site.config.js';

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? pagesBase : './',
  build: { target: 'es2022' },
  server: { host: '127.0.0.1' },
}));
