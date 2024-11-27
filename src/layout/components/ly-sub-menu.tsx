import { defineComponent, PropType } from 'vue'
import { MenuItemType } from '@/types/app-types.ts'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

export default defineComponent({
    name: 'ly-sub-menu',
    props: {
        menus: {
            type: Array as PropType<MenuItemType[]>,
            required: true,
        },
    },
    setup(props) {
        const handleClickByIndex = (index: string) => {
            const menu = props.menus.find((item) => String(item.id) === index)
            if (menu) {
                console.log('Menu clicked:', menu)
            }
            console.log(typeof index, index)
        }

        const getMenuItem = (menus: MenuItemType[]) =>
            menus.map((menu) => {
                if (menu.children && menu.children.length) {
                    return (
                        <ElSubMenu
                            index={String(menu.code)}
                            v-slots={{
                                title: () => <span>{menu.name}</span>, // 自定义插槽内容
                            }}
                        >
                            {getMenuItem(menu.children)}
                        </ElSubMenu>
                    )
                } else {
                    return (
                        <ElMenuItem index={String(menu.code)}>
                            {menu.name}
                        </ElMenuItem>
                    )
                }
            })

        return () => (
            <ElMenu
                default-active="1"
                onSelect={(index: string) => handleClickByIndex(index)}
            >
                {getMenuItem(props.menus)}
            </ElMenu>
        )
    },
})
