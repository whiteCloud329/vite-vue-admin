import { createApp } from 'vue'
/** 重置样式 这里引入自定义的重置样式也可 */
import '@unocss/reset/tailwind.css'
import './style.css'

import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import { Vue3Menus } from 'vue3-menus'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// app.component('vue3-menus', Vue3Menus)
app.use(ContextMenu)
app.use(router)

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 数据持久化
pinia.use(piniaPluginPersistedstate)

// 因为状态管理使用的是setup的方式构建所以我们重写一个$reset并挂载到pinia中
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state))
    store.$reset = () => {
        store.$patch(initialState)
    }
})
app.use(pinia)

app.mount('#app')
