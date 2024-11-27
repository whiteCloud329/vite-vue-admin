<template>
    <div class="ly-aside" :class="{ 'ly-aside-fold': isCollapse }">
        <div v-if="!isCollapse" class="ly-side-menu">
            <el-scrollbar max-height="100%" class="scrollbar-hide">
                <ul
                    class="ly-side-menu-out transition-all transition-duration-100 transition-ease-in-out"
                >
                    <template v-for="item in userMenus" :key="item.id">
                        <li
                            class="ly-side-menu-out-item h-48px pl-16px lh-48px vertical-mid font-size-14px flex items-center cursor-pointer"
                            @click="onMenuClick(item)"
                        >
                            <el-icon class="inline">
                                <Folder />
                            </el-icon>
                            <div class="indent-16px">
                                {{ item.name }}
                            </div>
                        </li>
                    </template>
                </ul>
            </el-scrollbar>
            <div
                class="ly-side-menu-main slideInLeft-enter slideInRight-leave"
                v-if="showmain"
            >
                <div class="main-left">
                    <el-scrollbar>
                        <el-menu
                            :collapse="true"
                            background-color="var(--primary-color)"
                            :default-active="String(activeMenu.id)"
                        >
                            <template v-for="item in userMenus" :key="item.id">
                                <el-menu-item
                                    :index="String(item.id)"
                                    @click="onMenuClick(item)"
                                >
                                    <div class="ly-side-menu-main-item">
                                        <el-icon class="inline">
                                            <Folder />
                                        </el-icon>
                                        {{ item.name.slice(0, 2) }}
                                    </div>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </el-scrollbar>
                </div>
                <div class="main-right">
                    <div class="menu-header">{{ activeMenu.name }}</div>
                    <ly-sub-menu :menus="activeMenu.children"></ly-sub-menu>
                </div>
            </div>
        </div>
        <div class="ly-aside-fold-icon" @click="toggleCollapse">
            <el-icon color="#ffffff">
                <ArrowLeftBold v-if="!isCollapse" />
                <ArrowRightBold v-if="isCollapse" />
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
// import { useTabsStore } from '@/store/modules/tabs.ts'
import { ArrowLeftBold, ArrowRightBold, Folder } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/modules/app.ts'
import { useUserStore } from '@/store/modules/user.ts'
import { MenuItemType } from '@/types/app-types.ts'
import lySubMenu from '@/layout/components/ly-sub-menu.tsx'

defineOptions({ name: 'ly-aside' })
// const tabsStore = useTabsStore()
// const activeIsHome = computed(() => tabsStore.activeTab === 'ly-home')

const appStore = useAppStore()
const isCollapse = computed(() => appStore.appState.isCollapse)

const toggleCollapse = () => {
    appStore.toggleCollapse()
}

const userStore = useUserStore()
// const menus = computed(() => userStore.menus)
const userMenus = computed(() => userStore.menus)
const activeMenu = ref()
const showmain = ref(false)

// const isActiveMenu = computed(() => activeMenu.value === activeMenu.value)

const onMenuClick = (menu: MenuItemType) => {
    activeMenu.value = menu
    showmain.value = true
    console.log(activeMenu, menu)
    // showOutMenus.value = false
}
// 切换一级菜单
</script>
<style scoped lang="scss">
.ly-aside {
    width: var(--aside-width);
    background: var(--main-background);
    //background: #f1f1f1;
    //padding: 10px 10px 10px 10px;
    position: relative;

    :deep(.el-scrollbar__bar.is-horizontal) {
        display: none !important;
    }

    :deep(.el-scrollbar__bar.is-vertical) {
        display: none !important;
    }

    .ly-side-menu {
        height: calc(100vh - 50px);
        position: relative;

        .ly-side-menu-out {
            .ly-side-menu-out-item:hover {
                background-color: var(--dark-bg-color-active-3);
            }
        }

        .ly-side-menu-main {
            height: calc(100vh - 50px);
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            background-color: var(--main-background);

            .main-left {
                :deep(.el-menu) {
                    height: calc(100vh - 50px);
                    width: 48px;

                    .el-menu-item {
                        padding: 0;
                        color: #ffffff;
                    }

                    .el-menu-item:hover {
                        background-color: var(--primary-color-hover);
                    }

                    .el-menu-item.is-active {
                        background-color: var(--primary-color-hover);
                    }
                }

                .ly-side-menu-main-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    line-height: 22px;
                    text-align: center;
                    font-size: 12px;
                    padding-top: 5px;
                    width: 48px;

                    i {
                        font-size: 14px;
                    }
                }
            }

            .main-right {
                width: 162px;

                .menu-header {
                    text-indent: 10px;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 50px;
                    border-bottom: 1px solid #c8c7c7;
                    margin-bottom: 5px;
                }

                :deep(.el-menu, ) {
                    border: 0;

                    .el-sub-menu__title:hover,
                    .el-menu-item:hover {
                        background: transparent;
                        color: var(--primary-color-hover);
                    }

                    .el-sub-menu__title .el-menu-item {
                        height: 32px;
                    }

                    .el-sub-menu__title {
                        line-height: 40px;
                        height: 40px;
                        margin: 0;
                    }

                    .el-menu-item {
                        height: 40px;
                    }

                    .el-menu-item.is-active {
                        background-color: #f1f1f1;
                        color: #333;
                        border-radius: 8px;
                    }
                }
            }
        }
    }

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
    padding: 0 5px 0 0;
}
</style>
