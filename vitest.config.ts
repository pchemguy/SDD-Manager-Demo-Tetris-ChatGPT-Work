/** Collect deterministic contract suites separately from browser acceptance. */
import { defineConfig } from 'vitest/config';

export default defineConfig({ test: { include: ['tests/**/*.test.ts'], environment: 'node' } });
