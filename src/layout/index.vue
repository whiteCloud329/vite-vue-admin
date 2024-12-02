<template>
    <div class="ly-container">
        <ly-header></ly-header>
        <div class="ly-container-main">
            <ly-aside v-if="appAsideTheme != 'top'"></ly-aside>
            <ly-main></ly-main>
        </div>
    </div>
</template>
<script setup lang="ts">
import LyHeader from './components/ly-header.vue'
import LyAside from './components/ly-aside/index.vue'
import LyMain from './components/ly-main.vue'
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app.ts'

defineOptions({ name: 'lyLayout' })
const appStore = useAppStore()
const appAsideTheme = computed(() => appStore.appAsideTheme)
</script>
<style scoped lang="scss">
.ly-container {
    width: 100%;
    height: 100vh;

    &-main {
        display: flex;
    }
}
</style>
