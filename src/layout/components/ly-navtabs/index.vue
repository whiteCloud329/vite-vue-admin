<template>
    <div class="ly-nav-tabs">
        <el-tabs
            type="card"
            addable
            v-model="activeTab"
            @tab-click="handleTabClick"
            @tab-remove="removeTab"
        >
            <!-- 禁止关闭首页 -->
            <el-tab-pane
                class="ly-nav-item"
                v-for="tab in tabs"
                :key="tab.path"
                :label="tab.title"
                :name="tab.path"
                :closable="tab.path !== '/'"
            >
                <!--                @click.right.prevent="openContextMenu($event, tab)"-->
                <!--                @contextmenu.prevent="openContextMenu($event, tab)"-->
                <template #label>
                    {{ tab.title }}
                    <el-icon>
                        <Refresh />
                    </el-icon>
                </template>
            </el-tab-pane>
            <template #add-icon>
                <el-popover
                    ref="tabsPopover"
                    placement="bottom-end"
                    :width="200"
                    popper-class="popover__nav-list"
                >
                    <template v-slot:reference>
                        <div class="p-l-10 p-r-10">
                            <el-icon>
                                <MoreFilled />
                            </el-icon>
                        </div>
                    </template>
                    <el-scrollbar
                        class="scrollbar__nav-list"
                        wrap-class="scrollbar-wrap__nav-list"
                        view-class="scrollbar-view__nav-list"
                    >
                        <ul class="nav-list">
                            <li
                                class="nav-item close-all"
                                @click="closeAllTabs"
                            >
                                关闭所有
                            </li>
                            <!--                            <li-->
                            <!--                                class="nav-item"-->
                            <!--                                v-for="tab of tabs"-->
                            <!--                                :key="tab.path"-->
                            <!--                                :class="{ active: tab.path === activeTab }"-->
                            <!--                            >-->
                            <!--                                <a-->
                            <!--                                    class="item-text f-toe1"-->
                            <!--                                    @click="handleTabClick(tab.name)"-->
                            <!--                                    >{{ tab.title }}</a-->
                            <!--                                >-->
                            <!--                                <i-->
                            <!--                                    class="item-icon el-icon-close"-->
                            <!--                                    v-if="!tab.closable"-->
                            <!--                                    @click="removeTab(tab.path)"-->
                            <!--                                ></i>-->
                            <!--                            </li>-->
                        </ul>
                    </el-scrollbar>
                </el-popover>
            </template>
        </el-tabs>

        <!-- 右键菜单（Element Plus 的 ElDropdown） -->
        <el-dropdown
            v-if="contextMenu.visible"
            :style="{
                top: `${contextMenu.y}px`,
                left: `${contextMenu.x}px`,
                position: 'fixed',
            }"
            @clickoutside="contextMenu.visible = false"
        >
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        @click="closeCurrentTab"
                        :disabled="contextMenu.targetTab === '/'"
                    >
                        关闭当前
                    </el-dropdown-item>
                    <el-dropdown-item @click="closeOtherTabs"
                        >关闭其他
                    </el-dropdown-item>
                    <el-dropdown-item @click="closeAllTabs"
                        >关闭所有
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTabsStore } from '@/store/modules/tabs.ts'
import { useRouter } from 'vue-router'
import { MoreFilled, Refresh } from '@element-plus/icons-vue'

const tabsStore = useTabsStore()
const router = useRouter()
const contextMenu = ref({ visible: false, x: 0, y: 0, targetTab: null })

defineOptions({ name: 'lyNavTabs' })
const activeTab = computed({
    get: () => tabsStore.activeTab,
    set: (val: string) => tabsStore.setActiveTab(val),
})
const tabs = computed(() => tabsStore.tabs)

// 点击标签页时切换路由
const handleTabClick = (tab: { name: string }) => {
    router.push({ path: tab.name })
}

// 删除标签页
const removeTab = (path: string) => {
    tabsStore.removeTab(path)
    router.push(tabsStore.activeTab || '/')
}
// 打开右键菜单
// const openContextMenu = (event: MouseEvent, tab: { path: never }) => {
//     console.log('openContextMenu', '111')
//     contextMenu.value = {
//         visible: true,
//         x: event.clientX,
//         y: event.clientY,
//         targetTab: tab['path'],
//     }
// }

// 关闭当前标签页
const closeCurrentTab = () => {
    if (contextMenu.value.targetTab) {
        removeTab(contextMenu.value.targetTab)
        contextMenu.value.visible = false
    }
}

// 关闭其他标签页
const closeOtherTabs = () => {
    if (contextMenu.value.targetTab) {
        tabsStore.closeOtherTabs(contextMenu.value.targetTab)
        contextMenu.value.visible = false
        router.push(contextMenu.value.targetTab)
    }
}

// 关闭所有标签页
const closeAllTabs = () => {
    tabsStore.closeAllTabs()
    contextMenu.value.visible = false
    router.push('/')
}
</script>
<style scoped lang="scss">
.ly-nav-tabs {
    width: 100%;
    height: 36px;
    position: relative;
    background-color: #f1f1f1;

    .ly-nav-list {
        display: flex;

        .ly-nav-item {
            margin-right: 5px;
        }
    }

    .nav-tabs--extra {
        position: absolute;
        bottom: 0;
        right: 0;
        line-height: 36px;

        & > span:nth-child(1) {
            display: block;
            height: 32px;
        }

        .list-btn {
            display: inline-block;
            height: 24px;
            width: 20px;
            margin-top: 4px;
            background-image: url('~@/assets/tabs-more.png');
            background-size: cover;
        }
    }
}

:deep .el-tabs__nav {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    border: 0 !important;
}

:deep .el-tabs__header {
    border: 0;
}

:deep .el-tabs__content {
    display: none;
}

:deep .el-tabs__nav .el-tabs__item {
    width: 160px;
    line-height: 32px;
    height: 32px;
    color: #999;
    background: #eeeeee;
    margin-right: 5px;
    border: 0 !important;
    border-radius: 4px 4px 0 0;
    position: relative;

    .el-icon {
        position: absolute;
        right: 26px;
        font-size: 16px;
    }

    .el-icon:hover {
        color: #fff;
        background-color: #666;
        border-radius: 50%;
    }

    .el-icon.is-icon-close {
        position: absolute;
        right: 8px;
    }
}

:deep .el-tabs__nav .el-tabs__item.is-active {
    width: 190px;
    color: #333333;
    background: #ffffff;
    padding-right: 54px !important;
    padding-left: 0 !important;
}

:deep .el-tabs__nav .el-tabs__item.is-active:hover {
    color: #333333;
    background: #ffffff;
}

:deep .el-tabs__nav .el-tabs__item:hover {
    color: #666666;
    background: #dddddd;
}

:deep .context-menu {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    padding: 10px;
}
</style>
