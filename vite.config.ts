
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'wasi.github.io', // Ensures assets are loaded correctly on GitHub Pages subpaths
});
