<template>
    <div>
        我是首页
        <div>store: count is {{ count }}</div>
        <div>store: doubleCount is {{ doubleCount }}</div>
        <el-button type="primary" @click="increment">增加</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="toggleDark">黑暗模式</el-button>
        <button @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">
            Mode {{ colorMode }}
        </button>
    </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/store'
import { computed } from 'vue'
import { useColorMode, useDark, useToggle } from '@vueuse/core'

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

const isDark = useDark()
const colorMode = useColorMode()
const toggleDark = useToggle(isDark)
</script>
<style scoped lang="scss"></style>
