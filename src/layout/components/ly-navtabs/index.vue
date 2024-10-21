<template>
    <div class="ly-nav-tabs">
        <el-tabs type="card" v-model="tabsValue">
            <el-tab-pane
                v-for="navItem in navList"
                :key="navItem.path"
                :label="navItem.title"
                :name="navItem.path"
            >
                <template #label>
                    <div class="ly-nav-item">
                        <!--                    <router-link :to="navItem.path">-->
                        {{ navItem.title }}
                        <!--                    </router-link>-->
                        <el-icon :size="14">
                            <RefreshLeft />
                        </el-icon>
                        <el-icon :size="14">
                            <close />
                        </el-icon>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Close, RefreshLeft } from '@element-plus/icons-vue'

defineOptions({ name: 'lyNavTabs' })
const tabsValue = ref('/')
const navList = ref([
    {
        title: '首页',
        path: '/',
    },
    {
        title: '关于',
        path: '/about',
    },
])
</script>
<style scoped lang="scss">
.ly-nav-tabs {
    height: 50px;
    width: 1000px;

    .ly-nav-list {
        display: flex;

        .ly-nav-item {
            width: 1000px;
        }
    }
}
</style>
