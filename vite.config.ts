import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Vite 8 uses Rolldown. Keep React in one cacheable vendor file.
          groups: [
            {
              name: 'vendor',
              test: /[/\\]node_modules[/\\]react(?:-dom)?[/\\]/,
            },
          ],
        },
      },
    },
  },
});
