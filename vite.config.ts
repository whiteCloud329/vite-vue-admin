import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'
import * as process from 'process'

function pathResolver(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
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
        ElementPlus({}),
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
    },
})
