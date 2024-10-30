<template>
    <div class="ly-header">
        <div></div>
        <div class="flex items-center">
            <el-space size="large">
                <div class="cursor-pointer flex items-center">
                    <el-icon>
                        <Bell />
                    </el-icon>
                </div>
                <div class="ly-dark cursor-pointer" @click="toggleDark()">
                    <el-icon class="animate-swing">
                        <Moon v-if="isDark" />
                        <Sunny v-else />
                    </el-icon>
                    {{ isDark ? 'Dark' : 'Light' }}
                </div>
                <el-dropdown
                    class="block! h100% border-0!"
                    @command="handleCommand"
                    placement="bottom"
                >
                    <div class="el-dropdown-link">
                        <el-space size="small">
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <span class="topbar__user-name"
                                >{{ userInfo.name || '未登录' }}
                            </span>
                            <el-icon>
                                <ArrowDownBold />
                            </el-icon>
                        </el-space>
                    </div>
                    <template v-slot:dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="resetPsw">
                                修改密码
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-space>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    ArrowDownBold,
    Bell,
    Moon,
    Sunny,
    UserFilled,
} from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user.ts'

defineOptions({ name: 'ly-header' })

const isDark = useDark()
const toggleDark = useToggle(isDark)
const handleCommand = (command: string | number | object) => {
    ElMessage(`click on item ${command}`)
}
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>
<style scoped lang="scss">
.ly-header {
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    z-index: 2;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;

    :deep(.el-switch) {
        .el-switch__core {
            background-color: #666666;
            border-color: #999999;
        }

        .el-switch-off-color {
            color: #666666;
        }
    }

    .ly-dark {
        display: inline-flex;
        align-items: center;
        gap: 4px; /* 图标和文字之间的间距 */
        .el-dropdown-link {
            border: 0;
            box-shadow: none;
        }
    }
}
</style>
