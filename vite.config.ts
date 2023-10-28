import { defineConfig } from 'vite';
import getAllFilenames from './utils/file_names';

export default defineConfig({
  publicDir: 'assets',
  build: {
    outDir: './dist',
    lib: {
      name: 'bullshit-detector',
      entry: getAllFilenames('./src', /\.ts$/),
      formats: ['es'],
      fileName: (format: string, entryName: string) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      treeshake: 'safest',
      output: {},
    },
  },
});
