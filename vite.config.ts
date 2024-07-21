import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }): UserConfig => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      proxy: isProduction
        ? undefined
        : {
            '/api': {
              target: 'http://localhost:3100',
              changeOrigin: true,
              secure: false,
            },
          },
    },
  };
});
