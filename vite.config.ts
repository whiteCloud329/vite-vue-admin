import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'
import * as process from 'process'

function pathResolver(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const viteEnv = loadEnv(mode, process.cwd())
    const { VITE_APP_LOCALHOST, VITE_APP_REQUEST } = viteEnv
    return {
        plugins: [
            vue(),
            vueDevTools(),
            UnoCSS(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
            }),
        ],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src'),
                },
                {
                    find: '_vi',
                    replacement: pathResolver('/src/views'),
                },
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler', // or 'modern'
                    additionalData: `@use "@/styles/element.scss" as *;`,
                },
            },
        },
        server: {
            hmr: true,
            open: true,
            port: 9529,
            host: VITE_APP_LOCALHOST,
            proxy: {
                '/api': {
                    target: VITE_APP_REQUEST,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '/api'),
                },
            },
        },
    }
})
