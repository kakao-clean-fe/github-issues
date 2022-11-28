import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // exclude: [...configDefaults.exclude, 'packages/template/*'],
    include:['**/*.test.(ts|js)'],
    environment: 'happy-dom',
    setupFiles: [
      "./setupVitest.js"
    ]
  },
})