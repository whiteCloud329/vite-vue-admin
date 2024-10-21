import { createApp } from 'vue'
/** 重置样式 这里引入自定义的重置样式也可 */
import '@unocss/reset/tailwind.css'
import './style.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import router from './router'

app.use(router)

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
