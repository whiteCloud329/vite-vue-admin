<template>
    <div class="ly-main">
        <ly-nav-tabs />
        <router-view />
    </div>
</template>
<script setup lang="ts">
import LyNavTabs from '@/layout/components/ly-navtabs/index.vue'

defineOptions({ name: 'ly-main' })
</script>
<style scoped lang="scss">
.ly-main {
    height: calc(100vh - 60px);
    background-color: yellow;
}
</style>
