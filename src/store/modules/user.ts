import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getMenuList } from '@/api/system.ts'
import routerPath from '@/router/path.ts'
import { MenuItemType } from '@/types/app-types.ts'
import { RouteRecordRaw } from 'vue-router'
import router from '@/router'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = reactive({
        name: 'admin',
        avatar: '',
        role: ['admin', 'normal'],
        menus: <MenuItemType[]>[],
    })

    const menus = ref<MenuItemType[]>([])
    const menuRoutes = ref<MenuItemType[]>([])
    // menus = ref<MenuItem[]>([])
    const getMenus = async () => {
        return new Promise((resolve, reject) => {
            getMenuList()
                .then(({ data }) => {
                    const { menuTree, buttonCodes } = buildTree(data)
                    menuRoutes.value = data
                    getRouterByMenus(data)
                    // menus.value = menuTree
                    menus.value = userInfo.menus = [...menuTree]
                    console.log(menuTree, buttonCodes, menus)
                    resolve(true)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    function buildTree(data: MenuItemType[]) {
        const menuTree: MenuItemType[] = []
        let buttonCodes = []
        // 按钮权限 -- type = 3 为按钮
        const filterButton = data.filter((item) => item.type === 3)
        buttonCodes = filterButton.map((item) => item.code)
        // 菜单权限-- 排除菜单 以及租户
        const filterMenu = data.filter(
            (item) => item.type !== 3 && item.parentId !== 0,
        )
        const menuMap: Record<number, MenuItemType> = {}

        // const filterRouter = filterMenu.filter((item) => item.url)
        // console.log('filterRouter', filterRouter)
        // 初始化 map，把每个节点的 id 作为键，节点对象本身作为值
        filterMenu.forEach((item: MenuItemType) => {
            menuMap[item.id as number] = { ...item, children: [] }
        })

        // 构建树
        filterMenu.forEach((item: MenuItemType) => {
            const node = menuMap[item.id as number]
            if (item.parentId) {
                // 不是根节点，则加入父节点的 children 中
                const parent = menuMap[item.parentId]
                if (parent) {
                    if (!parent.children) parent.children = []
                    parent?.children?.push(node)
                } else {
                    menuTree.push(node)
                }
            } else {
                menuTree.push(node)
            }
        })
        return { menuTree, buttonCodes }
    }

    function getRouterByMenus(menus: MenuItemType[]) {
        const routerMap: Record<string, MenuItemType> = {}
        const routerList: RouteRecordRaw[] = []
        menus
            .filter((item: MenuItemType) => item.type === 2 && item.path)
            .forEach((item: MenuItemType) => {
                const routeItem: RouteRecordRaw = {
                    path: item.path,
                    name: item.name,
                    component: routerPath[item.path],
                    meta: {
                        title: item.title,
                        icon: item.icon,
                        code: item.code,
                        level: item.level,
                    },
                }

                routerList.push(routeItem)
                router.addRoute(routeItem)
                routerMap[item.path] = item
                // console.log(routeItem, router.getRoutes())
            })

        console.log(routerMap, routerList)
        return { routerMap, routerList }
    }

    // function getRouterByButton(buttonCodes: string[]) {
    //     const menuList: MenuItemType[] = []
    //     buttonCodes.forEach((code) => {
    //         const menu = menus.value.find((item) => item.code === code)
    //         if (menu) menuList.push(menu)
    //     })
    //     return menuList
    // }

    return {
        userInfo,
        menus,
        menuRoutes,
        getMenus,
    }
})
