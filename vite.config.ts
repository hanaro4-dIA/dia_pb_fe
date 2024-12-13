import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@storybook/blocks', '@mdx-js/react'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
