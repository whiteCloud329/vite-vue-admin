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

defineOptions({ name: 'lyLayout' })
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
