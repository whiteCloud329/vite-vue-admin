<template>
    <component
        v-if="appAsideTheme === 'top'"
        :is="asideTheme"
        v-bind="{ menuTree }"
    ></component>
    <div v-else class="ly-aside" :class="{ 'ly-aside-fold': isCollapse }">
        <component
            v-show="!isCollapse"
            :is="asideTheme"
            v-bind="{ menuTree }"
        ></component>
        <div class="ly-aside-fold-icon" @click="toggleCollapse">
            <el-icon color="#ffffff">
                <ArrowLeftBold v-if="!isCollapse" />
                <ArrowRightBold v-if="isCollapse" />
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app.ts'
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user.ts'
import LyAsideTop from '@/layout/components/ly-aside/ly-aside-top/index.vue'
import lyAsideNormal from '@/layout/components/ly-aside/ly-aside-normal/index.vue'
import lyAsideDefault from '@/layout/components/ly-aside/ly-aside-default/index.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

defineOptions({ name: 'ly-aside' })
const appStore = useAppStore()
const appAsideTheme = computed(() => appStore.appAsideTheme)
type ThemeKey = 'default' | 'top' | 'normal'

const themeMap: {
    [key in ThemeKey]:
        | string
        | typeof LyAsideTop
        | typeof lyAsideDefault
        | typeof lyAsideNormal
} = {
    default: lyAsideDefault,
    top: LyAsideTop,
    normal: lyAsideNormal,
}

const asideTheme = computed(() => {
    const theme = appAsideTheme.value
    return themeMap[theme as ThemeKey] || lyAsideDefault
})

// useUserStore().getMenus()

const menuTree = computed(() => useUserStore().menus)
console.log(menuTree)
const isCollapse = computed(() => appStore.appState.isCollapse)

const toggleCollapse = () => {
    appStore.toggleCollapse()
}
</script>
<style scoped lang="scss">
.ly-aside {
    width: var(--aside-width);
    background: var(--main-background);
    position: relative;

    .ly-aside-fold-icon {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 40px;
        background-color: #c8c7c7;
        display: flex;
        align-items: center;
        text-align: center;
        border-radius: 0 5px 5px 0;
        cursor: pointer;

        :deep(.el-icon) {
            margin-left: -2px;
        }
    }

    .ly-aside-fold-icon:hover {
        background-color: #b4b4b4;
    }
}

.ly-aside-fold {
    width: var(--aside-fold-width);
}
</style>
