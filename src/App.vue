<template>
    <!-- 动态显示 Layout -->
    <ly-layout v-if="showLayout">
        <router-view />
        <!-- 内容插入到公共组件 -->
    </ly-layout>
    <!-- 不需要 Layout 的路由直接渲染 -->
    <router-view v-else />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import LyLayout from '@/layout/index.vue'

const route = useRoute()

// 判断当前路由是否需要 Layout
const showLayout = computed(() => {
    return route.meta.layout !== false // 默认需要 Layout，只有明确标记 `layout: false` 时才不加载
})
</script>
<style scoped></style>
