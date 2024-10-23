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
                <template #label>
                    <div @contextmenu="onContextMenu">{{ tab.title }}</div>
                </template>
            </el-tab-pane>
            <template #add-icon>
                <el-dropdown
                    placement="bottom-end"
                    size="small"
                    trigger="click"
                >
                    <el-button size="small">
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-scrollbar class="right-dropdown">
                            <el-dropdown-menu>
                                <el-dropdown-item @click="closeAllTabs">
                                    <div class="dropdown-item">关闭所有</div>
                                </el-dropdown-item>
                                <template v-for="tab of tabs" :key="tab.path">
                                    <el-dropdown-item
                                        @click="handleTabClick(tab)"
                                    >
                                        <div class="dropdown-item">
                                            {{ tab.title }}
                                        </div>
                                        <el-icon
                                            v-if="tab.path !== '/'"
                                            class="dropdown-item-close"
                                            @click.stop="closeSelectedTab(tab)"
                                        >
                                            <CloseBold />
                                        </el-icon>
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </el-scrollbar>
                    </template>
                </el-dropdown>

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
                            <li
                                class="nav-item"
                                v-for="tab of tabs"
                                :key="tab.path"
                                :class="{ active: tab.path === activeTab }"
                            >
                                <router-link
                                    :to="tab.path"
                                    class="item-text f-toe1"
                                    >{{ tab.title }}
                                </router-link>
                                <el-icon
                                    v-if="tab.path !== '/'"
                                    @click="removeTab(tab.path)"
                                >
                                    <CloseBold></CloseBold>
                                </el-icon>
                            </li>
                        </ul>
                    </el-scrollbar>
                </el-popover>
            </template>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { TabType, useTabsStore } from '@/store/modules/tabs.ts'
import { useRouter } from 'vue-router'
import { CloseBold, MoreFilled } from '@element-plus/icons-vue'
import ContextMenu from '@imengyu/vue3-context-menu'

const tabsStore = useTabsStore()
const router = useRouter()

defineOptions({ name: 'lyNavTabs' })
const activeTab = computed({
    get: () => tabsStore.activeTab,
    set: (val: string) => tabsStore.setActiveTab(val),
})
const tabs = computed(() => tabsStore.tabs)

// 点击标签页时切换路由
const handleTabClick = (tab: TabType) => {
    router.push({ path: tab.path })
}

// 删除标签页
const removeTab = (path: string) => {
    tabsStore.removeTab(path)
    router.push(activeTab.value || '/')
}
// 打开右键菜单
const onContextMenu = (e: MouseEvent) => {
    //prevent the browser's default menu
    e.preventDefault()
    //show your menu
    ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        items: [
            {
                label: '刷新',
                icon: 'refresh',
                onClick: () => {
                    location.reload()
                },
            },
            {
                label: '关闭其他',
                onClick: () => {
                    closeOtherTabs()
                },
            },
        ],
    })
}

// // 关闭当前标签页
// const closeCurrentTab = () => {
//     removeTab(activeTab.value)
// }

// 关闭选中标签页
const closeSelectedTab = (tab: TabType) => {
    console.log(tab)
    removeTab(tab.path)
}

// 关闭其他标签页
const closeOtherTabs = () => {
    tabsStore.closeOtherTabs(activeTab.value)
}

// 关闭所有标签页
const closeAllTabs = () => {
    tabsStore.closeAllTabs()
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
}

.right-dropdown {
    width: 200px;
    max-height: 260px;

    .dropdown-item {
        width: 190px;
        text-align: center;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: bold;
    }

    .dropdown-item-close {
        display: none !important;
    }

    :deep .el-dropdown-menu__item:hover {
        .dropdown-item-close {
            display: block !important;
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
</style>
