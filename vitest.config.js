import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    setupFiles: 'src/setupTests.js',
    environment: 'happy-dom',
    globals: true,
  },
})
