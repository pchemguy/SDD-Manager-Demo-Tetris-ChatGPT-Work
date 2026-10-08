/** Run real Chromium against the HTTP-served production distribution. */
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: { browserName: 'chromium', baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure', launchOptions: process.env.TETRIS_CHROMIUM_PATH ? { executablePath: process.env.TETRIS_CHROMIUM_PATH, args: JSON.parse(process.env.TETRIS_CHROMIUM_ARGS ?? '[]') } : undefined },
  webServer: [{ command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173', url: 'http://127.0.0.1:4173', reuseExistingServer: false, timeout: 120000 }, { command: 'npm run dev -- --host 127.0.0.1 --port 4175', url: 'http://127.0.0.1:4175', reuseExistingServer: false }],
});
