<template>
    <div
        class="ly-main"
        :class="{
            'aside-collapse': appState.isCollapse || appAsideTheme === 'top',
        }"
    >
        <ly-nav-tabs />
        <div
            class="ly-main-content"
            :class="{ 'use-footer': appState.isShowFooter }"
        >
            <router-view v-slot="{ Component }">
                <transition name="main-content-transition" mode="out-in">
                    <component :is="Component" :key="currentKey" />
                </transition>
            </router-view>
        </div>
        <div class="ly-footer" v-if="appState.isShowFooter">底部空间</div>
    </div>
</template>
<script setup lang="ts">
import LyNavTabs from '@/layout/components/ly-navtabs/index.vue'
import { useAppStore } from '@/store/modules/app.ts'
import { computed, nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'ly-main' })

const appStore = useAppStore()

const appState = computed(() => appStore.appState)
const appAsideTheme = computed(() => appStore.appAsideTheme)
const route = useRoute()
const currentKey = ref(route.fullPath)
// 监听路由变化更新 key
watch(
    () => route.fullPath,
    (newPath) => {
        currentKey.value = newPath
    },
)

// 提供刷新方法
// function refreshPage() {
//     currentKey.value = '' // 先清空 key
//     console.log('刷新页面')
//     nextTick(() => {
//         currentKey.value = route.fullPath // 重新赋值 key
//     })
// }

provide('refreshPage', () => {
    currentKey.value = '' // 先清空 key
    console.log('刷新页面')
    nextTick(() => {
        currentKey.value = route.fullPath // 重新赋值 key
    })
})
</script>
<style scoped lang="scss">
.ly-main {
    width: calc(100vw - var(--aside-width));
    height: calc(100vh - 50px);
    background-color: #f5f5f5;
    padding: 10px;

    .ly-main-content {
        height: calc(100% - 32px);
        //margin-top: -4px;
        background-color: #fff;
        border-radius: 4px;
        padding: 5px;
        z-index: 2;
    }

    .use-footer {
        height: calc(100% - 32px - var(--footer-height));
    }
}

.aside-collapse {
    width: calc(100vw - var(--aside-fold-width));
}
</style>
