/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const environmentVariables = loadEnv(mode, process.cwd());

  return {
    base: environmentVariables.VITE_ROUTER_BASENAME,
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './testSetup.ts',
    },
  };
});
