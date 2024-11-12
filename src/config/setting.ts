import { appStateType } from '@/types/app-types.ts'

// export default <Record<string, string | boolean | undefined>>{
//     theme: 'dark', // 默认主题
//     menuTheme: 'default', // 菜单主题
//     isCollapse: false, // 是否折叠菜单
//     isShowBreadcrumb: true, // 是否展示面包屑
//     isShowLogo: true, // 是否展示logo
//     isShowFooter: true, // 是否展示底部版权信息
//     isShowNavbar: true, // 是否展示导航栏
//     isShowWaterMark: true, // 是否展示水印
//     waterMarkText: 'vite-vue-admin', // 水印文字
//     defaultColor: '#427bff', // 默认主题色
//     frontRouter: true, // 前端路由
//     backRouter: false, // 后端路由
// }

export const setting: appStateType = {
    theme: 'dark', // 默认主题
    menuTheme: 'default', // 菜单主题
    isCollapse: false, // 是否折叠菜单
    isShowBreadcrumb: true, // 是否展示面包屑
    isShowLogo: true, // 是否展示logo
    isShowFooter: true, // 是否展示底部版权信息
    isShowNavbar: true, // 是否展示导航栏
    isShowWaterMark: true, // 是否展示水印
    waterMarkText: 'vite-vue-admin', // 水印文字
    defaultColor: '#427bff', // 默认主题色
    frontRouter: true, // 前端路由
    backRouter: false, // 后端路由
}
