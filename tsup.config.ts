import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['cjs', 'esm'],
  // tsconfig has `incremental: true` for Next; the declaration build can't use it.
  dts: { compilerOptions: { incremental: false } },
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'framer-motion'],
  outDir: 'dist',
  splitting: false,
  minify: false,
  treeshake: true,
  target: 'es2020',
})