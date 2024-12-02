<template>
    <el-scrollbar max-height="100%" class="scrollbar-hide ly-default-scroll">
        <el-menu class="ly-normal-menu">
            <recursion-menu :menu="menuTree"></recursion-menu>
        </el-menu>
    </el-scrollbar>
</template>
<script setup lang="ts">
import RecursionMenu from '@/layout/components/ly-aside/recursion-menu.vue'

defineOptions({ name: 'ly-aside-normal' })
defineProps({
    menuTree: { type: Array, default: () => [] },
})
</script>
<style scoped lang="scss">
:deep(.el-menu) {
    border: 0;
    //background-color: #304156;
    height: 100%;

    //.el-menu-item {
    //color: #bfcbd9;
    //
    //&:hover {
    //    background-color: #1f2d3d;
    //}
    //
    //&.is-active {
    //    background-color: #1f2d3d;
    //}
    //}
}
</style>
