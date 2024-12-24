import { get } from '@/lib/axios.ts'

const BASE_LOGIN = '/login'
// 获取图形验证码
export const getImgCode = () => {
    return get(`${BASE_LOGIN}/getCaptcha`)
}
