<template>
    <el-menu
        class="ly-top-menu"
        mode="horizontal"
        popper-class="top-popper"
        popper-offset="0"
    >
        <recursion-menu :menu="menuTree"></recursion-menu>
    </el-menu>
</template>
<script setup lang="ts">
import RecursionMenu from '@/layout/components/ly-aside/recursion-menu.vue'

defineOptions({ name: 'ly-aside-top' })

const props = defineProps({
    menuTree: { type: Array, default: () => [] },
})
console.log('aside-top', props.menuTree)
</script>
<style scoped lang="scss">
.ly-top-menu {
    height: 50px;
    border: 0;
}

:deep(.el-popper) {
    height: 50px;
    top: 50px;
}

.top-popper {
    :deep(.el-menu-item) {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
    }
}
</style>
