<template>
    <div class="ly-login">
        <div class="ly-login-form">
            <div class="ly-login-title">欢迎登录</div>
            <el-form
                @submit.prevent
                :model="form"
                :rules="formRules"
                label-width="60"
            >
                <el-form-item label="用户名" clearable prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        clearable
                        show-password
                        v-model="form.password"
                    />
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
                <el-icon>
                    <phone />
                </el-icon>
            </el-form>
            <div class="ly-other-title">其他登录方式</div>
            <div class="ly-other-list"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Phone } from '@element-plus/icons-vue'

defineOptions({ name: 'ly-login' })
const form = reactive({
    name: '',
    password: '',
    code: '',
})

const formRules = {}

const submit = () => {
    ElMessage('点击登录')
}
</script>
<style scoped lang="scss">
.ly-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/image/background/bg1.jpeg');
    background-size: cover; /* 背景图片按比例放大/缩小，覆盖整个容器 */
    background-position: center; /* 背景图片居中显示 */
    background-repeat: no-repeat; /* 防止背景图片重复 */

    .ly-login-form {
        background-color: #fff;
        width: 300px;
        //margin: 0 0 60% 70%;
        padding: 50px;
    }
}
</style>
