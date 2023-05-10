// @ts-ignore
import {defineConfig} from 'vite';



export default defineConfig({
  build: {
    sourcemap: true,
    outDir: './dist',
    lib: {
      name: 'bullshit-detektor',
      entry: './src/background.ts',
      formats: ['es'],
      fileName: (format: string) => `background.${format}.js`,
    },
    rollupOptions: {
      treeshake: 'safest',
      output: {},
    },
  },
});
