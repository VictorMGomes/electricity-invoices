import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/resources'),
  envDir: path.resolve(__dirname),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'public'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/resources/index.html'),
      external: ['pdfjs-dist/build/pdf.worker.entry'],
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
      '@': path.resolve(__dirname, 'src/resources'),
    },
  },
});
