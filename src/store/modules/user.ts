import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getMenuList } from '@/api/system.ts'
import { MenuItem } from '@/types/app-types.ts'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = reactive({
        name: 'admin',
        avatar: '',
        role: ['admin', 'normal'],
    })

    let menus = reactive<MenuItem[]>([])
    const getMenus = async () => {
        const { data } = await getMenuList()
        const { menuTree, buttonCodes } = buildTree(data)
        menus = menuTree
        console.log(menuTree, buttonCodes)
    }

    function buildTree(data: MenuItem[]) {
        const menuTree: MenuItem[] = []
        let buttonCodes = []
        // 按钮权限 -- type = 3 为按钮
        const filterButton = data.filter((item) => item.type === 3)
        buttonCodes = filterButton.map((item) => item.code)
        // 菜单权限-- 排除菜单 以及租户
        const filterMenu = data.filter(
            (item) => item.type !== 3 && item.parentId !== 0,
        )
        const menuMap: Record<number, MenuItem> = {}

        // const filterRouter = filterMenu.filter((item) => item.url)
        // console.log('filterRouter', filterRouter)
        // 初始化 map，把每个节点的 id 作为键，节点对象本身作为值
        filterMenu.forEach((item: MenuItem) => {
            menuMap[item.id] = { ...item, children: [] }
        })

        // 构建树
        filterMenu.forEach((item: MenuItem) => {
            const node = menuMap[item.id]
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

    return {
        userInfo,
        menus,
        getMenus,
    }
})
