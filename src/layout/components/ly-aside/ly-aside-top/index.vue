<template>
    <div>aside-top{{ JSON.stringify(menuTree) }}</div>
</template>
<script setup lang="ts">
defineOptions({ name: 'ly-aside-top' })

const props = defineProps({
    menuTree: { type: Array, default: () => [] },
})
console.log('aside-top', props.menuTree)
</script>
<style scoped lang="scss"></style>
