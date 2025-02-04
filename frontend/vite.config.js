import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  publicDir: "public",  // Ensures public files are copied
  // Explicitly copy _redirects to dist
  esbuild: {
    minify: true, // Keep it optimized
  },
});
