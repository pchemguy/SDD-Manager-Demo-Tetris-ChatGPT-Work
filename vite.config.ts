/** Static packaging and local HTTP development; no runtime backend. */
import { defineConfig } from 'vite';

export default defineConfig({ base: './', server: { host: '0.0.0.0' } });
