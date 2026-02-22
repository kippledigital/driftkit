import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'framer-motion'],
  outDir: 'dist',
  splitting: false,
  minify: false,
  treeshake: true,
  target: 'es2020',
})