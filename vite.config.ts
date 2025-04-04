// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/resources'), // This is your frontend root
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'public'), // Output only for frontend
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/resources/index.html'),
    },
  },
  server: {
    fs: {
      strict: true,
      allow: [path.resolve(__dirname, 'src/resources')],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/resources'), // optional alias for frontend code
    },
  },
});
