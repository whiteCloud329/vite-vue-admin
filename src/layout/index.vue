<template>
    <div class="ly-container">
        <ly-header></ly-header>
        <div class="ly-container-main">
            <ly-aside></ly-aside>
            <ly-main></ly-main>
        </div>
    </div>
</template>
<script setup lang="ts">
import LyHeader from './components/ly-header.vue'
import LyAside from './components/ly-aside.vue'
import LyMain from './components/ly-main.vue'
// import { computed } from 'vue'
// import { useAppStore } from '@/store/modules/app.ts'

defineOptions({ name: 'lyLayout' })

// const appStore = useAppStore()
// const isCollapse = computed(() => appStore.appState.isCollapse)
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
