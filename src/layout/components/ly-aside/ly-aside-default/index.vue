<template>
    <div class="ly-aside-default">
        <el-scrollbar max-height="100%" class="scrollbar-hide">
            <ul
                class="ly-side-menu-out transition-all transition-duration-100 transition-ease-in-out"
            >
                <template v-for="item in menus" :key="item.id">
                    <li
                        class="ly-side-menu-out-item h-48px pl-16px lh-48px vertical-mid font-size-14px flex items-center cursor-pointer"
                        @click="onMenuClick(item)"
                    >
                        <el-icon class="inline">
                            <Folder />
                        </el-icon>
                        <div class="indent-16px">
                            {{ item.title }}
                        </div>
                    </li>
                </template>
            </ul>
        </el-scrollbar>
        <div
            class="ly-aside-default-main slideInLeft-enter slideInRight-leave"
            v-if="activeMenu && showMain"
        >
            <div class="main-left">
                <el-scrollbar>
                    <el-menu
                        :collapse="true"
                        background-color="var(--primary-color)"
                        :default-active="String(activeMenu.id)"
                    >
                        <template v-for="item in menus" :key="item.id">
                            <el-menu-item
                                :index="String(item.id)"
                                @click="onMenuClick(item)"
                            >
                                <div class="ly-side-menu-main-item">
                                    <el-icon class="inline">
                                        <Folder />
                                    </el-icon>
                                    {{ item.title?.slice(0, 2) }}
                                </div>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class="main-right">
                <div class="menu-header">{{ activeMenu.title }}</div>
                <el-menu
                    class="ly-normal-menu"
                    :default-active="String(activeMenu.id)"
                >
                    <recursion-menu
                        :menu="activeMenu.children"
                    ></recursion-menu>
                </el-menu>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Folder } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user.ts'
import { MenuItemType } from '@/types/app-types.ts'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import recursionMenu from '@/layout/components/ly-aside/recursion-menu.vue'

defineOptions({ name: 'ly-aside-default' })
const userStore = useUserStore()
const menus = computed(() => userStore.menus)
const activeMenu = ref()
const showMain = ref(false)
const onMenuClick = (menu: MenuItemType) => {
    console.log(menu)
    activeMenu.value = menu
    showMain.value = true
    // showOutMenus.value = false
}

const route = useRoute()
const menuRoutes = computed(() => useUserStore().menuRoutes)
watch(route, (val) => {
    if ((val && !val.path) || val.path === '/') return (showMain.value = false)
    const path = route.path // 当前路由路径
    const firstSegment = path.split('/')[1]
    if (!firstSegment) return
    // console.log(firstSegment, menuRoutes, menus.value) // 动态获取第一个段路径
    // menuRoutes.value.forEach((item) => {
    //     if (item.path && path.includes(item.path as string)) {
    //         console.log(item, 'path.includes(item.path as string)')
    //         const activeMenuItem = ref<MenuItemType>()
    //         if (item.parentId) {
    //             activeMenuItem.value = menus.value.find(
    //                 (menu: MenuItemType) => menu.id === Number(item.parentId),
    //             )
    //             if (activeMenuItem.value?.parentId) {
    //                 activeMenuItem.value = menus.value.find(
    //                     (menu: MenuItemType) =>
    //                         menu.id === Number(activeMenuItem.value?.parentId),
    //                 )
    //             }
    //         } else {
    //             activeMenuItem.value = item
    //         }
    //         activeMenu.value = activeMenuItem.value
    //         useTabsStore().addTab({
    //             name: route.name as string,
    //             query: route.query,
    //         })
    //         console.log(activeMenuItem.value)
    //         showMain.value = true
    //     }
    // })
    const lastMenu = menuRoutes.value.find((menu) => {
        return menu.path === '/' + firstSegment
    })
    const activeIndex = recursionMenu1(lastMenu?.parentId as number)
    console.log(activeIndex, 'lastMenu')
    onMenuClick(activeIndex as MenuItemType)
})

const recursionMenu1 = (id: number) => {
    const menu = menuRoutes.value.find((menu) => {
        return id === menu.id
    })
    // console.log('没有找到', menu)
    if (menu?.parentId) {
        return recursionMenu1(menu?.parentId)
    }
    return menus.value.find((menuItem) => menuItem.id === id)
}
</script>
<style scoped lang="scss">
.ly-aside-default {
    position: relative;
    height: calc(100vh - 50px);

    .ly-aside-default-main {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
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

                .el-menu-item {
                    margin-bottom: 5px;
                }

                .el-menu-item:hover {
                    //background-color: transparent;
                    //
                    //div {
                    //    width: 100%;
                    //    height: 40px;
                    //    line-height: 40px;
                    //    background-color: #f1f1f1;
                    //    color: var(--primary-color-hover);
                    //}
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

                .el-menu-item.menu-item__active {
                    background-color: #f1f1f1 !important;
                    color: #333 !important;
                }
            }
        }
    }
}
</style>
