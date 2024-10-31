import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  //构建时移除console和debugger，配置来源：https://github.com/vitejs/vite/discussions/7920
  esbuild: {
    drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
  },
  server: {
    proxy: {
      '/mock': {
        target: '127.0.0.0',
        changeOrigin: true,
        secure: false,
        rewrite(path) {
          return path.replace('^/mock', '')
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('iconify-icon'),
        },
      },
    }),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    Components({
      dts: false,
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@Admin': fileURLToPath(
        new URL('./src/views/Module/Admin', import.meta.url)
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
