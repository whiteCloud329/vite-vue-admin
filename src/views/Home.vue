<template>
    <div>
        我是首页
        <div>store: count is {{ count }}</div>
        <div>store: doubleCount is {{ doubleCount }}</div>
        <el-button type="danger" @click="onErrorClick">点击错误提示</el-button>
        <el-button type="danger" @click="onRouter(1)">跳转 id = 1</el-button>
        <el-button type="danger" @click="onRouter(2)">跳转 id = 2</el-button>
        <el-button type="primary" @click="increment">增加</el-button>
        <el-button @click="reset">重置</el-button>
        <div class="h-100px"></div>
        <el-button @click="toggleFooter"
            >{{ appState.isShowFooter ? '关闭' : '打开' }} 底部空间
        </el-button>
        <el-button @click="toggleCollapse"
            >{{ appState.isCollapse ? '关闭' : '打开' }} 侧边栏
        </el-button>
    </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/store'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useTabsStore } from '@/store/modules/tabs.ts'
import { useAppStore } from '@/store/modules/app.ts'

defineOptions({ name: 'ly-home' })

const useCounter = useCounterStore()

const count = computed(() => useCounter.count)
const doubleCount = computed(() => useCounter.doubleCount)

const increment = () => {
    useCounter.increment()
}

const reset = () => {
    useCounter.$reset()
}
const onErrorClick = () => {
    ElMessage.error('Oops, this is a error message.')
}
const tabsStore = useTabsStore()
const onRouter = (id: number) => {
    tabsStore.addTab({
        name: 'ly-demo',
        query: {
            id: id,
        },
    })
}
const appStore = useAppStore()

const appState = computed(() => {
    return appStore.appState
})

// const toggleState = (key: string) => {
//     appStore.toggleState(key)
// }

const toggleCollapse = () => {
    appStore.toggleCollapse()
}
const toggleFooter = () => {
    appStore.toggleFooter()
}
</script>
<style scoped lang="scss"></style>
