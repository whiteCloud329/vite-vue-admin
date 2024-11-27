import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getMenuList } from '@/api/system.ts'
import { MenuItemType } from '@/types/app-types.ts'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = reactive({
        name: 'admin',
        avatar: '',
        role: ['admin', 'normal'],
        menus: <MenuItemType[]>[],
    })

    const menus = ref<MenuItemType[]>([])
    // menus = ref<MenuItem[]>([])
    const getMenus = async () => {
        const { data } = await getMenuList()
        const { menuTree, buttonCodes } = buildTree(data)
        // menus.value = menuTree
        menus.value = userInfo.menus = [...menuTree]
        console.log(menuTree, buttonCodes, menus)
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

    return {
        userInfo,
        menus,
        getMenus,
    }
})
