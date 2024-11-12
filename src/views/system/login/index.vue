<template>
    <div class="app-container">
        <div class="app-login-container">
            <el-form @submit.prevent :model="form" :rules="formRules">
                <el-form-item label="用户名">
                    <el-input />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'ly-login' })
const form = reactive({
    name: '',
    password: '',
})

const formRules = {}

const submit = () => {
    ElMessage('点击登录')
}
</script>
<style scoped lang="scss"></style>
