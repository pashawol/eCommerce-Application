import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // viewBox is required to resize SVGs with CSS.
                // @see https://github.com/svg/svgo/issues/1128
                removeViewBox: false
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/components/layouts', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/components/common', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@img': fileURLToPath(new URL('./src/img', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      'node-fetch': 'isomorphic-fetch'
    }
  },
  define: {
    global: 'window'
  }
})
