<template>
    <div class="ly-main">
        <ly-nav-tabs />
        <div class="ly-main-content">
            <router-view v-slot="{ Component }">
                <transition name="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import LyNavTabs from '@/layout/components/ly-navtabs/index.vue'

defineOptions({ name: 'ly-main' })
</script>
<style scoped lang="scss">
.ly-main {
    width: calc(100vw - 220px);
    height: calc(100vh - 50px);
    background-color: #f5f5f5;
    padding: 10px;

    .ly-main-content {
        height: calc(100% - 40px);
        background-color: #fff;
    }
}
</style>
