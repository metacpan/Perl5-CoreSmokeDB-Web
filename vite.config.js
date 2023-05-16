import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'APP_VERSION': JSON.stringify(process.env.npm_package_version),
    'APP_NAME':    JSON.stringify(process.env.npm_package_name),
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    headers: {
//      'Content-Type': 'text/html; charset=utf8',
      'Cache-Control': "no-store, no-cache, must-revalidate",
    }
  }
})
