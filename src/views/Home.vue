<template>
    我是首页
    <div>store: count is {{ count }}</div>
    <div>store: doubleCount is {{ doubleCount }}</div>
    <el-button type="primary" @click="increment">增加</el-button>
    <el-button @click="reset">重置</el-button>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/store'
import { computed } from 'vue'

defineOptions({ name: 'HomeView' })

const useCounter = useCounterStore()

const count = computed(() => useCounter.count)
const doubleCount = computed(() => useCounter.doubleCount)

const increment = () => {
    useCounter.increment()
}

const reset = () => {
    useCounter.$reset()
}
</script>
<style scoped lang="scss"></style>
