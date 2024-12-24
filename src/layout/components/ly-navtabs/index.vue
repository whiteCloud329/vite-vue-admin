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
                :key="tab.name"
                :name="tab.name"
                :closable="tab.name !== 'ly-home'"
            >
                <template #label>
                    <div
                        class="w-100%"
                        @contextmenu="onContextMenu($event, tab.name as string)"
                        :ref="tab.name as string"
                    >
                        {{ tab.title }}
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <el-tab-pane name="1234">1223</el-tab-pane>
            <template #add-icon>
                <el-dropdown
                    placement="bottom-end"
                    size="small"
                    trigger="click"
                >
                    <el-icon>
                        <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                        <el-scrollbar class="right-dropdown">
                            <el-dropdown-menu>
                                <el-dropdown-item @click="closeAllTabs">
                                    <div
                                        class="dropdown-item dropdown-item-close-all"
                                    >
                                        关闭所有
                                    </div>
                                </el-dropdown-item>
                                <template v-for="tab of tabs" :key="tab.path">
                                    <el-dropdown-item
                                        @click="
                                            handleTabClick1(tab.name as string)
                                        "
                                    >
                                        <div class="dropdown-item">
                                            {{ tab.title }}
                                        </div>
                                        <el-icon
                                            v-if="tab.name !== 'ly-home'"
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
            </template>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import { TabType, useTabsStore } from '@/store/modules/tabs.ts'
import { useRouter } from 'vue-router'
import { CloseBold, MoreFilled } from '@element-plus/icons-vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { TabsPaneContext } from 'element-plus'

const tabsStore = useTabsStore()
const router = useRouter()
// const route = useRoute()

defineOptions({ name: 'lyNavTabs' })
const activeTab = computed({
    get: () => tabsStore.activeTab,
    set: (val: string) => tabsStore.setActiveTab(val),
})

const tabs = computed(() => tabsStore.tabs)

// 点击标签页时切换路由
const handleTabClick = (pane: TabsPaneContext) => {
    tabsStore.addTab({
        name: pane.paneName?.toString() || 'ly-home',
    })
}

// 点击标签页时切换路由
const handleTabClick1 = (name: string) => {
    tabsStore.addTab({
        name: name,
    })
}
// 删除标签页
const removeTab = (name: string) => {
    tabsStore.removeTab(name)
}
const refreshPage = inject('refreshPage')
// 打开右键菜单
const onContextMenu = (e: MouseEvent, name: string) => {
    //prevent the browser's default menu
    e.preventDefault()
    if (name === activeTab.value) {
        //show your menu
        ContextMenu.showContextMenu({
            x: e.x - e.layerX + 25,
            y: e.y - e.layerY + 32,
            items: [
                {
                    label: '刷新',
                    onClick: () => {
                        // location.reload()
                        if (refreshPage && typeof refreshPage === 'function') {
                            refreshPage()
                        }
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
    } else {
        ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: [
                {
                    label: '关闭',
                    onClick: () => {
                        closeSelectedTab(
                            tabs.value.find((tab) => tab.name === name)!,
                        )
                    },
                },
            ],
        })
    }
}

// 关闭选中标签页
const closeSelectedTab = (tab: TabType) => {
    removeTab(tab.name as string)
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
    height: 32px;
    position: relative;
    background-color: #f1f1f1;

    :deep(.el-tabs) {
        height: 36px;

        .el-tabs__nav-prev,
        .el-tabs__nav-next {
            border-radius: 8px;
            line-height: 36px !important;
            height: 36px !important;
            background-color: #fbfbfb;
        }
    }

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

    .dropdown-item-close-all {
        color: var(--fail-color);
    }

    .dropdown-item-close {
        display: none !important;
    }

    :deep(.el-dropdown-menu__item:hover) {
        .dropdown-item-close {
            display: block !important;
        }
    }
}

:deep(.el-tabs__nav) {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    border: 0 !important;

    .el-tabs__item {
        width: 160px;
        line-height: 32px;
        height: 32px;
        color: #999;
        background: #eeeeee;
        margin-right: 5px;
        padding: 8px;
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

    .el-tabs__item.is-active {
        width: 190px;
        color: #333333;
        background: #ffffff;
        padding-right: 20px !important;
    }

    .el-tabs__item.is-active:hover {
        color: #333333;
        background: #ffffff;
    }

    .el-tabs__item:hover {
        color: #666666;
        background: #dddddd;
    }
}

:deep(.el-tabs__header) {
    margin: 0 !important;
    border: 0 !important;
}

:deep(.el-tabs__content) {
    display: none;
}
</style>
