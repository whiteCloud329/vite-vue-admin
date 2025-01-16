<template>
    <div class="home-container">首页内容</div>
    <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
defineOptions({
    name: 'HomeView',
})
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style lang="scss" scoped>
.home-container {
    padding: 20px;
}
</style>
