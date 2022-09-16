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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
