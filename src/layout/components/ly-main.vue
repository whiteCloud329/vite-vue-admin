<template>
    <div class="ly-main" :class="{ 'aside-collapse': !appState.isCollapse }">
        <ly-nav-tabs />
        <div
            class="ly-main-content"
            :class="{ 'use-footer': appState.isShowFooter }"
        >
            <router-view v-slot="{ Component }">
                <transition name="main-content-transition" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="ly-footer" v-if="appState.isShowFooter">底部空间</div>
    </div>
</template>
<script setup lang="ts">
import LyNavTabs from '@/layout/components/ly-navtabs/index.vue'
import { useAppStore } from '@/store/modules/app.ts'
import { computed } from 'vue'

defineOptions({ name: 'ly-main' })

const appStore = useAppStore()

const appState = computed(() => appStore.appState)
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
