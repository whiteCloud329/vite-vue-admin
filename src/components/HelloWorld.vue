<template>
    <div class="hello-world">
        <h1>{{ msg }}</h1>
        <p>{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
    name: 'HelloWorld',
})

defineProps<{
    msg: string
}>()

const description = ref('这是一个使用 Vue 3 + TypeScript + Vite 的项目')
</script>

<style lang="scss" scoped>
.hello-world {
    text-align: center;
    padding: 20px;

    h1 {
        color: var(--el-text-color-primary);
        margin-bottom: 20px;
    }

    p {
        color: var(--el-text-color-regular);
    }
}
</style>
