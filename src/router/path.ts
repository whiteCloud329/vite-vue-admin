import { Component } from 'vue'

type Views = {
    [key: string]: () => Promise<Component> // 允许任意字符串作为键
}
const views: Views = {
    '/menu1': () => import('@/views/menus/menu1/index.vue'),
    '/menu2': () => import('@/views/menus/menu2/index.vue'),
    '/demo1List': () => import('@/views/demos/demo1/list/index.vue'),
    '/demo2': () => import('@/views/demos/demo2/index.vue'),
}
export default views
