<template>
    <div class="ly-aside" :class="{ 'ly-aside-fold': !isCollapse }">
        <div v-if="isCollapse">侧边栏 {{ activeTab }}</div>
        <div class="ly-aside-fold-icon" @click="toggleCollapse">
            <el-icon color="#ffffff">
                <ArrowLeftBold v-if="isCollapse" />
                <ArrowRightBold v-if="!isCollapse" />
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useTabsStore } from '@/store/modules/tabs.ts'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/modules/app.ts'

defineOptions({ name: 'ly-aside' })
const tabsStore = useTabsStore()
const activeTab = computed(() => tabsStore.activeTab === 'ly-home')

const appStore = useAppStore()
const isCollapse = computed(() => appStore.appState.isCollapse)

const toggleCollapse = () => {
    appStore.toggleCollapse()
}
</script>
<style scoped lang="scss">
.ly-aside {
    width: var(--aside-width);
    background: var(--main-background);
    background: #f1f1f1;
    padding: 10px 10px 10px 10px;
    position: relative;

    .ly-aside-fold-icon {
        position: absolute;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 40px;
        background-color: #c8c7c7;
        display: flex;
        align-items: center;
        text-align: center;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }

    .ly-aside-fold-icon:hover {
        background-color: #b4b4b4;
    }
}

.ly-aside-fold {
    width: var(--aside-fold-width);
    padding: 0 10px 0 0;
}
</style>
