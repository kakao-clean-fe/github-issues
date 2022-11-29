import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // exclude: [...configDefaults.exclude, 'packages/template/*'],
    globals: true,
    include: ['**/*.test.(ts|js)'],
    environment: 'happy-dom',
    setupFiles: ['./setupVitest.js'],
  },
});
