export interface ThemeConfig {
    menuBg: string
    menuText: string
    menuActiveText: string
}

export interface AppState {
    sidebar: {
        collapsed: boolean
    }
    device: string
    theme: {
        current: string
        list: Record<string, ThemeConfig>
    }
}

export interface TagView {
    name: string
    title: string
    path: string
    query?: Record<string, string>
}

export interface TagsViewState {
    visitedViews: TagView[]
    cachedViews: string[]
}
