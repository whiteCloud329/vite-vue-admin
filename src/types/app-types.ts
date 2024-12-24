export interface appStateType {
    theme?: string | undefined
    menuTheme?: string | undefined
    isCollapse?: boolean | undefined
    isShowBreadcrumb?: boolean | undefined
    isShowLogo?: boolean | undefined
    isShowFooter?: boolean | undefined
    isShowNavbar?: boolean | undefined
    isShowWaterMark?: boolean | undefined
    waterMarkText?: string | undefined
    defaultColor?: string | undefined
    frontRouter?: boolean | undefined
    backRouter?: boolean | undefined
}

// export interface MenuItemType {
//     id: number
//     path: string | null
//     name: string
//     code: string | number | null
//     url: string | null
//     parentId: number
//     icon: string | null
//     type: number | string
//     level: number
//     seq: number
//     children?: MenuItemType[]
//     extendedField?: boolean
//     hasChild: boolean
//     resourceCode: string
// }
//
// export interface MenuItemType {
//     id: number
//     parentId: number | null
//     name: string
//     children: MenuItemType[] | null
//     code: string
//     ext1: string | null
//     ext2: string | null
//     ext3: string | null
//     ext4: string | null
//     ext5: string | null
//     ext6: string | null
//     ext7: string | null
//     ext8: string | null
//     ext9: string | null
//     ext10: string | null
//     extendedField: string | null
//     hasChild: boolean
//     icon: string
//     level: number
//     parentIds: string | null
//     resourceCode: string
//     seq: number
//     type: number
//     url: string
// }

export interface MenuItemType {
    id: number | string
    parentId: number
    tenantId?: string | null
    name: string
    path: string
    title: string | null
    code?: string | null
    component: string | null
    icon: string | null
    show: boolean
    level: number | null
    // order: number | null
    type: number
    children?: MenuItemType[]
}
