import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://forum-api.dicoding.dev/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        cookieDomainRewrite: {
          'forum-api.dicoding.dev': 'localhost',
        },
      },
    },
  },
});
