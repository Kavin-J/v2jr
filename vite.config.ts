import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { "process.env": {} },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    alias: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    server: {
      deps: {
        inline: [/@mui\/x-data-grid/],
      },
    },
  },
} as any);