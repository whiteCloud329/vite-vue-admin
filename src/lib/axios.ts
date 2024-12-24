import axios, {
    AxiosRequestConfig,
    Canceler,
    InternalAxiosRequestConfig,
} from 'axios'
import { getToken, setCookies } from '@/utils/auth.ts'
import { ElMessage } from 'element-plus'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    cancelPrevious?: boolean // 自定义字段，用于控制是否取消之前的请求
}

interface PendingRequest {
    [key: string]: Canceler
}

const pendingRequests: PendingRequest = {}
// 生成请求键值，基于请求方法和 URL
const generateKey = (config: AxiosRequestConfig): string => {
    return `${config.method}:${config.url}:${JSON.stringify(config.params)}:${JSON.stringify(config.data)}`
}
// 设置白名单接口路径，例如不需要 token 的 API 路径
const whitelistEndpoints = ['/public-endpoint', '/another-public-endpoint']

const instance = axios.create({
    timeout: 50000,
    baseURL: import.meta.env.VITE_APP_BASEURL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // 禁用缓存
    },
})
instance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    // 确保 headers 存在
    if (!config.headers) {
        config.headers = {} as InternalAxiosRequestConfig['headers']
    }
    const key = generateKey(config)
    if (pendingRequests[key]) {
        if (config.cancelPrevious) {
            pendingRequests[key]('取消之前的重复请求')
            delete pendingRequests[key]
        } else {
            // 如果没有 cancelPrevious，则不取消之前的请求，直接返回
            return Promise.reject(
                new axios.Cancel(`后续的重复请求被取消: ${config.url}`),
            )
        }
    }
    // 为当前请求设置取消令牌
    config.cancelToken = new axios.CancelToken((cancel) => {
        pendingRequests[key] = cancel
    })
    //
    // 判断当前请求的路径是否在白名单中
    const isWhitelisted = whitelistEndpoints.some((endpoint) =>
        config.url?.startsWith(endpoint),
    )

    // 如果不在白名单，则添加 token 到请求头
    if (!isWhitelisted) {
        const token = getToken() // 假设 token 存储在 localStorage 中
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            config.headers.Language = 'zh_cn'
        }
    }
    setCookies('lang', 'zh_cn')
    delete config.cancelPrevious
    return config
})

instance.interceptors.response.use(
    (response) => {
        const key = generateKey(response.config)
        // 请求完成后移除该请求的取消操作
        delete pendingRequests[key]
        console.log(response)
        if (response.status === 200) {
            return response.data
        }
        ElMessage.error(response.statusText)
        return Promise.reject(response.statusText)
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.log('请求已取消:', error.message)
        } else {
            if (error.response) {
                const status = error.response.status
                switch (status) {
                    case 403:
                        console.warn('无权限访问，请重新登录')
                        ElMessage.warning('无权限访问')
                        break
                    case 401:
                        console.warn('未授权，跳转到登录页面')
                        ElMessage.warning('未授权')
                        break
                    case 404:
                        console.warn('请求的资源不存在')
                        ElMessage.warning('请求的资源不存在')
                        break
                    case 500:
                        console.error('服务器内部错误')
                        ElMessage.warning('服务器内部错误')
                        break
                    default:
                        ElMessage.warning(`发生错误：状态码 ${status}`)
                        console.error(`发生错误：状态码 ${status}`)
                }
            } else {
                console.error('未收到响应或请求被拒绝:', error.message)
            }

            console.error('请求出错:', error)
        }
        return Promise.reject(error)
    },
)

export const get = (url: string, params: object = {}) => {
    return instance.get(url, { params })
}

export const post = (url: string, params: object) => {
    return instance.post(url, params)
}
